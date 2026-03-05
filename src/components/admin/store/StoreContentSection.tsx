import { useState, useRef, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUploadAsset } from "@/hooks/use-site-content";
import { useStoreContent, useUpsertStoreContent } from "@/hooks/use-store-content";

interface Props {
  storeId: string;
}

const FIELD_GROUPS = [
  {
    title: "🏪 Dados da Loja",
    fields: [
      { key: "name", label: "Nome da Loja", type: "text", source: "store" },
      { key: "category", label: "Categoria", type: "text", source: "store" },
      { key: "website_url", label: "Website URL", type: "text", source: "store" },
      { key: "description", label: "Descrição / Sobre a empresa", type: "textarea", source: "store" },
    ],
  },
  {
    title: "🎨 Banner e Visual",
    fields: [
      { key: "company_logo", label: "Logo (URL)", type: "text", source: "content" },
      { key: "company_banner", label: "Banner Desktop (URL)", type: "text", source: "content" },
      { key: "company_banner_mobile", label: "Banner Mobile (URL)", type: "text", source: "content" },
      { key: "banner_bg_color", label: "Cor de fundo do banner (hex)", type: "text", source: "content" },
      { key: "company_views", label: "Visualizações (texto)", type: "text", source: "content" },
    ],
  },
  {
    title: "⭐ Reputação",
    fields: [
      { key: "reputation_label", label: "Label da reputação (ex: Ótimo, Bom, Regular)", type: "text", source: "content" },
      { key: "reputation_score", label: "Nota da reputação (ex: 8.2)", type: "text", source: "content" },
      { key: "reputation_description", label: "Descrição da reputação (HTML permitido)", type: "textarea", source: "content" },
      { key: "trust_description", label: "Descrição de confiança", type: "textarea", source: "content" },
    ],
  },
  {
    title: "📊 Estatísticas / Desempenho",
    fields: [
      { key: "stat_reclamacoes", label: "Total de Reclamações", type: "text", source: "content" },
      { key: "stat_respondidas_pct", label: "% Respondidas", type: "text", source: "content" },
      { key: "stat_aguardando", label: "Reclamações Aguardando", type: "text", source: "content" },
      { key: "stat_avaliadas", label: "Reclamações Avaliadas", type: "text", source: "content" },
      { key: "stat_nota_media", label: "Nota Média", type: "text", source: "content" },
      { key: "stat_voltariam_pct", label: "% Voltariam a fazer negócio", type: "text", source: "content" },
      { key: "stat_resolvidas_pct", label: "% Resolvidas", type: "text", source: "content" },
      { key: "stat_tempo_resposta", label: "Tempo Médio de Resposta", type: "text", source: "content" },
    ],
  },
  {
    title: "ℹ️ Sidebar / Sobre",
    fields: [
      { key: "about_text", label: "Texto 'Sobre' na sidebar", type: "textarea", source: "content" },
      { key: "cnpj", label: "CNPJ", type: "text", source: "content" },
      { key: "company_registration_time", label: "Tempo de cadastro (ex: Cadastrada há 20 anos)", type: "text", source: "content" },
      { key: "company_brands", label: "Marcas da empresa", type: "text", source: "content" },
      { key: "company_name", label: "Nome de exibição no site", type: "text", source: "content" },
    ],
  },
  {
    title: "🏆 Posição / Ranking",
    fields: [
      { key: "company_position", label: "Posição no ranking", type: "text", source: "content" },
      { key: "company_position_label", label: "Label da posição", type: "text", source: "content" },
      { key: "company_position_category", label: "Categoria da posição", type: "text", source: "content" },
    ],
  },
  {
    title: "🎥 Mídia",
    fields: [
      { key: "youtube_url", label: "URL do vídeo YouTube (embed)", type: "text", source: "content" },
    ],
  },
  {
    title: "📱 Contato e Redes Sociais",
    fields: [
      { key: "contact_phone", label: "Telefone", type: "text", source: "content" },
      { key: "contact_email", label: "E-mail", type: "text", source: "content" },
      { key: "social_facebook", label: "Facebook URL", type: "text", source: "content" },
      { key: "social_instagram", label: "Instagram URL", type: "text", source: "content" },
      { key: "social_twitter", label: "Twitter/X URL", type: "text", source: "content" },
    ],
  },
];

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function StoreContentSection({ storeId }: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const uploadAsset = useUploadAsset();
  const [saving, setSaving] = useState(false);
  const [storeForm, setStoreForm] = useState<Record<string, string>>({});
  const [contentForm, setContentForm] = useState<Record<string, string>>({});
  const logoRef = useRef<HTMLInputElement>(null);
  const normalizedStoreId = storeId.trim();
  const isValidStoreId = UUID_REGEX.test(normalizedStoreId);

  const {
    data: store,
    isLoading: loadingStore,
    isError: isStoreError,
    error: storeError,
  } = useQuery({
    queryKey: ["store-content-detail", normalizedStoreId],
    enabled: isValidStoreId,
    retry: false,
    queryFn: async () => {
      const { data, error } = await supabase.from("stores").select("*").eq("id", normalizedStoreId).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const {
    data: storeContent,
    isLoading: loadingContent,
    isError: isContentError,
    error: contentError,
  } = useStoreContent(normalizedStoreId);
  const upsertContent = useUpsertStoreContent();

  const storeVal = (key: string) => storeForm[key] ?? (store as any)?.[key] ?? "";
  const contentVal = (key: string) => {
    if (contentForm[key] !== undefined) return contentForm[key];
    const item = storeContent?.find((i) => i.content_key === key);
    return item?.content_value ?? "";
  };

  const getVal = (key: string, source: string) => source === "store" ? storeVal(key) : contentVal(key);
  const setVal = (key: string, value: string, source: string) => {
    if (source === "store") {
      setStoreForm((prev) => ({ ...prev, [key]: value }));
    } else {
      setContentForm((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSave = async () => {
    if (!isValidStoreId) {
      toast({ title: "ID inválido", description: "Selecione uma loja válida.", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      // Save store fields
      if (Object.keys(storeForm).length > 0) {
        const { error } = await supabase
          .from("stores")
          .update({
            name: storeVal("name"),
            description: storeVal("description"),
            website_url: storeVal("website_url"),
            logo_url: storeVal("logo_url"),
            category: storeVal("category"),
          })
          .eq("id", normalizedStoreId);
        if (error) throw error;
      }

      // Save content fields
      const contentEntries = Object.entries(contentForm).map(([content_key, content_value]) => ({
        content_key,
        content_value,
      }));
      if (contentEntries.length > 0) {
        await upsertContent.mutateAsync({ storeId: normalizedStoreId, entries: contentEntries });
      }

      queryClient.invalidateQueries({ queryKey: ["store-content-detail", normalizedStoreId] });
      queryClient.invalidateQueries({ queryKey: ["store-detail", normalizedStoreId] });
      queryClient.invalidateQueries({ queryKey: ["store-name", normalizedStoreId] });
      queryClient.invalidateQueries({ queryKey: ["admin-stores-selector"] });
      setStoreForm({});
      setContentForm({});
      toast({ title: "Salvo!", description: "Todos os dados da loja foram atualizados." });
    } catch (err: any) {
      toast({ title: "Erro", description: err.message || "Não foi possível salvar.", variant: "destructive" });
    }
    setSaving(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadAsset.mutateAsync(file);
      setStoreForm((prev) => ({ ...prev, logo_url: url }));
      toast({ title: "Logo enviado!" });
    } catch {
      toast({ title: "Erro no upload", variant: "destructive" });
    }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadAsset.mutateAsync(file);
      setContentForm((prev) => ({ ...prev, [key]: url }));
      toast({ title: "Banner enviado!" });
    } catch {
      toast({ title: "Erro no upload", variant: "destructive" });
    }
  };

  if (!isValidStoreId) return <p style={{ color: "#DC2626" }}>ID de loja inválido.</p>;
  if (loadingStore || loadingContent) return <p style={{ color: "#5A6872" }}>Carregando conteúdo...</p>;
  if (isStoreError || isContentError) {
    const message = (storeError as Error)?.message || (contentError as Error)?.message || "Erro ao carregar conteúdo da loja.";
    return <p style={{ color: "#DC2626" }}>{message}</p>;
  }
  if (!store) return <p style={{ color: "#DC2626" }}>Loja não encontrada.</p>;

  const hasChanges = Object.keys(storeForm).length > 0 || Object.keys(contentForm).length > 0;

  return (
    <div className="space-y-6">
      {/* Logo Section */}
      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-base font-bold mb-3" style={{ color: "#1A2B3D" }}>🖼️ Logo da Loja</h3>
        <div className="flex items-center gap-4">
          {storeVal("logo_url") ? (
            <img src={storeVal("logo_url")} alt="Logo" className="w-20 h-20 rounded-xl object-cover border" style={{ borderColor: "#E8ECF0" }} />
          ) : (
            <div className="w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center text-2xl" style={{ borderColor: "#CBD5E0" }}>🏪</div>
          )}
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={storeVal("logo_url")}
              onChange={(e) => setStoreForm((prev) => ({ ...prev, logo_url: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              style={{ borderColor: "#E8ECF0" }}
              placeholder="URL do logo"
            />
            <div className="flex gap-2">
              <input ref={logoRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              <button
                onClick={() => logoRef.current?.click()}
                className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
                style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}
              >
                <Upload className="w-4 h-4" /> Upload Logo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Field Groups */}
      {FIELD_GROUPS.map((group) => (
        <div key={group.title} className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
          <h3 className="text-base font-bold mb-4" style={{ color: "#1A2B3D" }}>{group.title}</h3>
          <div className="space-y-4">
            {group.fields.map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-semibold mb-1" style={{ color: "#1A2B3D" }}>{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    value={getVal(f.key, f.source)}
                    onChange={(e) => setVal(f.key, e.target.value, f.source)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
                    style={{ borderColor: "#E8ECF0" }}
                  />
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={getVal(f.key, f.source)}
                      onChange={(e) => setVal(f.key, e.target.value, f.source)}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
                      style={{ borderColor: "#E8ECF0" }}
                    />
                    {(f.key === "company_banner" || f.key === "company_banner_mobile") && (
                      <>
                        <input type="file" accept="image/*" onChange={(e) => handleBannerUpload(e, f.key)} className="hidden" id={`upload-${f.key}`} />
                        <button
                          onClick={() => document.getElementById(`upload-${f.key}`)?.click()}
                          className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 flex-none"
                          style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                )}
                {f.key === "banner_bg_color" && getVal(f.key, f.source) && (
                  <div className="mt-1 flex items-center gap-2">
                    <div className="w-6 h-6 rounded border" style={{ backgroundColor: getVal(f.key, f.source), borderColor: "#E8ECF0" }} />
                    <span className="text-xs" style={{ color: "#8A9BAE" }}>Preview</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Save */}
      {hasChanges && (
        <div className="sticky bottom-4 z-10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white flex items-center gap-2 disabled:opacity-50 shadow-lg"
            style={{ backgroundColor: "#1B8B4F" }}
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</> : <><Save className="w-4 h-4" /> Salvar Todas as Alterações</>}
          </button>
        </div>
      )}
    </div>
  );
}
