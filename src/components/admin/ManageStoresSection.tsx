import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Save, Trash2, Plus, Upload, Loader2, ExternalLink } from "lucide-react";

interface Store {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  description: string;
  category: string;
  is_active: boolean;
  sort_order: number;
}

const useStores = () =>
  useQuery({
    queryKey: ["admin-stores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Store[];
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

const StoreCard = ({ store, onRefresh }: { store: Store; onRefresh: () => void }) => {
  const [name, setName] = useState(store.name);
  const [logoUrl, setLogoUrl] = useState(store.logo_url ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(store.website_url ?? "");
  const [description, setDescription] = useState(store.description ?? "");
  const [category, setCategory] = useState(store.category ?? "");
  const [isActive, setIsActive] = useState(store.is_active);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const hasChanges =
    name !== store.name ||
    logoUrl !== store.logo_url ||
    websiteUrl !== store.website_url ||
    description !== store.description ||
    category !== store.category ||
    isActive !== store.is_active;

  const handleSave = async () => {
    if (!name.trim()) {
      toast({ title: "Erro", description: "O nome da loja é obrigatório.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("stores")
      .update({ name, logo_url: logoUrl, website_url: websiteUrl, description, category, is_active: isActive })
      .eq("id", store.id);
    setSaving(false);
    if (error) {
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    } else {
      toast({ title: "Salvo!", description: `"${name}" atualizado com sucesso.` });
      onRefresh();
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja excluir "${store.name}"?`)) return;
    setDeleting(true);
    const { error } = await supabase.from("stores").delete().eq("id", store.id);
    setDeleting(false);
    if (error) {
      toast({ title: "Erro", description: "Não foi possível excluir.", variant: "destructive" });
    } else {
      toast({ title: "Excluído!", description: `"${store.name}" removido.` });
      onRefresh();
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop();
    const path = `stores/${store.id}.${ext}`;
    const { error } = await supabase.storage.from("site-assets").upload(path, file, { upsert: true });
    if (error) {
      toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
      return;
    }
    const { data: urlData } = supabase.storage.from("site-assets").getPublicUrl(path);
    setLogoUrl(urlData.publicUrl);
    toast({ title: "Logo enviado!" });
  };

  return (
    <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
      <div className="flex items-start gap-4">
        {/* Logo preview */}
        <div className="flex-none">
          {logoUrl ? (
            <img src={logoUrl} alt={name} className="w-16 h-16 rounded-lg object-contain border" style={{ borderColor: "#E8ECF0" }} />
          ) : (
            <div className="w-16 h-16 rounded-lg border-2 border-dashed flex items-center justify-center text-xs" style={{ borderColor: "#CBD5E0", color: "#8A9BAE" }}>
              Logo
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold" style={{ color: "#5A6872" }}>Nome da Loja *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
                style={{ borderColor: "#E8ECF0" }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold" style={{ color: "#5A6872" }}>Categoria</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Marketplace, E-commerce"
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
                style={{ borderColor: "#E8ECF0" }}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold" style={{ color: "#5A6872" }}>Descrição</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descrição da loja"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
              style={{ borderColor: "#E8ECF0" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold" style={{ color: "#5A6872" }}>URL do Site</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://www.loja.com.br"
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
                  style={{ borderColor: "#E8ECF0" }}
                />
                {websiteUrl && (
                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-2 rounded-lg border" style={{ borderColor: "#E8ECF0" }}>
                    <ExternalLink className="w-4 h-4" style={{ color: "#2B6CB0" }} />
                  </a>
                )}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold" style={{ color: "#5A6872" }}>Logo (URL ou Upload)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="URL do logo"
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
                  style={{ borderColor: "#E8ECF0" }}
                />
                <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
                  style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active toggle + actions */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium" style={{ color: isActive ? "#2E7D32" : "#8A9BAE" }}>
                {isActive ? "Ativa" : "Inativa"}
              </span>
            </label>

            <div className="flex items-center gap-2">
              {hasChanges && (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: "#1B8B4F" }}
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Salvar
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageStoresSection = () => {
  const { data: stores, isLoading, isError, error, fetchStatus, refetch } = useStores();
  const [adding, setAdding] = useState(false);
  const { toast } = useToast();

  const handleAdd = async () => {
    setAdding(true);
    const { error } = await supabase.from("stores").insert({
      name: "Nova Loja",
      sort_order: (stores?.length || 0) + 1,
    });
    setAdding(false);
    if (error) {
      toast({ title: "Erro", description: "Não foi possível criar a loja.", variant: "destructive" });
    } else {
      toast({ title: "Loja criada!", description: "Edite os dados abaixo." });
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3 rounded-xl border p-4" style={{ borderColor: "#E8ECF0" }}>
        <div className="flex items-center gap-2 text-sm" style={{ color: "#5A6872" }}>
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#2B6CB0" }} />
          Carregando lojas...
        </div>
        {fetchStatus !== "fetching" && (
          <button
            onClick={() => refetch()}
            className="px-3 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}
          >
            Tentar novamente
          </button>
        )}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3 rounded-xl border p-4" style={{ borderColor: "#FECACA", backgroundColor: "#FEF2F2" }}>
        <p className="text-sm font-medium" style={{ color: "#991B1B" }}>
          Não foi possível carregar as lojas.
        </p>
        <p className="text-xs" style={{ color: "#B91C1C" }}>
          {(error as Error)?.message || "Erro inesperado ao consultar a tabela stores."}
        </p>
        <button
          onClick={() => refetch()}
          className="px-3 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}
        >
          Recarregar lista
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "#5A6872" }}>
          {stores?.length || 0} loja(s) cadastrada(s)
        </p>
        <button
          onClick={handleAdd}
          disabled={adding}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
          style={{ backgroundColor: "#2B6CB0" }}
        >
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Adicionar Loja
        </button>
      </div>

      {stores && stores.length > 0 ? (
        stores.map((store) => (
          <StoreCard key={store.id} store={store} onRefresh={refetch} />
        ))
      ) : (
        <div className="bg-white rounded-xl p-8 border text-center" style={{ borderColor: "#E8ECF0" }}>
          <p className="text-sm" style={{ color: "#8A9BAE" }}>Nenhuma loja cadastrada ainda.</p>
          <p className="text-xs mt-1" style={{ color: "#8A9BAE" }}>Clique em "Adicionar Loja" para começar.</p>
        </div>
      )}
    </div>
  );
};

export default ManageStoresSection;
