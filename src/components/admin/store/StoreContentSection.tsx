import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Upload, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUploadAsset } from "@/hooks/use-site-content";

interface Props {
  storeId: string;
}

export default function StoreContentSection({ storeId }: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const uploadAsset = useUploadAsset();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const logoRef = useRef<HTMLInputElement>(null);

  const { data: store, isLoading } = useQuery({
    queryKey: ["store-content", storeId],
    queryFn: async () => {
      const { data, error } = await supabase.from("stores").select("*").eq("id", storeId).single();
      if (error) throw error;
      return data;
    },
  });

  const val = (key: string) => form[key] ?? (store as any)?.[key] ?? "";

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("stores")
        .update({
          name: val("name"),
          description: val("description"),
          website_url: val("website_url"),
          logo_url: val("logo_url"),
          category: val("category"),
        })
        .eq("id", storeId);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["store-content", storeId] });
      queryClient.invalidateQueries({ queryKey: ["store-detail", storeId] });
      queryClient.invalidateQueries({ queryKey: ["admin-stores-selector"] });
      setForm({});
      toast({ title: "Salvo!", description: "Conteúdo da loja atualizado." });
    } catch {
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    }
    setSaving(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadAsset.mutateAsync(file);
      setForm({ ...form, logo_url: url });
      toast({ title: "Logo enviado!" });
    } catch {
      toast({ title: "Erro no upload", variant: "destructive" });
    }
  };

  if (isLoading) return <p style={{ color: "#5A6872" }}>Carregando conteúdo...</p>;

  const hasChanges = Object.keys(form).length > 0;

  const fields = [
    { key: "name", label: "Nome da Loja", type: "text" },
    { key: "category", label: "Categoria", type: "text" },
    { key: "website_url", label: "Website URL", type: "text" },
    { key: "description", label: "Descrição / Sobre a empresa", type: "textarea" },
  ];

  return (
    <div className="space-y-6">
      {/* Logo Section */}
      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-base font-bold mb-3" style={{ color: "#1A2B3D" }}>🖼️ Logo da Loja</h3>
        <div className="flex items-center gap-4">
          {val("logo_url") ? (
            <img src={val("logo_url")} alt="Logo" className="w-20 h-20 rounded-xl object-cover border" style={{ borderColor: "#E8ECF0" }} />
          ) : (
            <div className="w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center text-2xl" style={{ borderColor: "#CBD5E0" }}>
              🏪
            </div>
          )}
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={val("logo_url")}
              onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
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

      {/* Fields */}
      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-base font-bold mb-4" style={{ color: "#1A2B3D" }}>📄 Dados e Conteúdo</h3>
        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-semibold mb-1" style={{ color: "#1A2B3D" }}>{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  value={val(f.key)}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
                  style={{ borderColor: "#E8ECF0" }}
                />
              ) : (
                <input
                  type="text"
                  value={val(f.key)}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
                  style={{ borderColor: "#E8ECF0" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      {hasChanges && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
          style={{ backgroundColor: "#1B8B4F" }}
        >
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</> : <><Save className="w-4 h-4" /> Salvar Conteúdo</>}
        </button>
      )}
    </div>
  );
}
