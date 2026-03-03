import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Loader2 } from "lucide-react";

interface Store {
  id: string;
  name: string;
  logo_url: string | null;
  is_active: boolean;
  sort_order: number;
  category: string | null;
}

const useStores = () =>
  useQuery({
    queryKey: ["admin-stores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("id, name, logo_url, is_active, sort_order, category")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Store[];
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

const ManageStoresSection = () => {
  const { data: stores, isLoading, isError, error, refetch } = useStores();
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
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
      toast({ title: "Loja criada!", description: "Selecione-a no dropdown acima para editar os dados." });
      refetch();
    }
  };

  const handleDelete = async (store: Store) => {
    if (!confirm(`Tem certeza que deseja excluir "${store.name}"?`)) return;
    setDeletingId(store.id);
    const { error } = await supabase.from("stores").delete().eq("id", store.id);
    setDeletingId(null);
    if (error) {
      toast({ title: "Erro", description: "Não foi possível excluir.", variant: "destructive" });
    } else {
      toast({ title: "Excluído!", description: `"${store.name}" removido.` });
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm p-4" style={{ color: "#5A6872" }}>
        <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#2B6CB0" }} />
        Carregando lojas...
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
          {(error as Error)?.message || "Erro inesperado."}
        </p>
        <button onClick={() => refetch()} className="px-3 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}>
          Recarregar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with add button */}
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
          Criar Nova Loja
        </button>
      </div>

      {/* Info box */}
      <div className="rounded-xl p-4 border" style={{ borderColor: "#BEE3F8", backgroundColor: "#EBF8FF" }}>
        <p className="text-sm" style={{ color: "#2B6CB0" }}>
          💡 Para editar os dados de uma loja, selecione-a no <strong>dropdown do cabeçalho</strong> (⚙️ Painel Geral → 🏪 Nome da Loja).
        </p>
      </div>

      {/* Store list */}
      {stores && stores.length > 0 ? (
        <div className="space-y-2">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-xl px-4 py-3 border flex items-center justify-between" style={{ borderColor: "#E8ECF0" }}>
              <div className="flex items-center gap-3">
                {store.logo_url ? (
                  <img src={store.logo_url} alt={store.name} className="w-10 h-10 rounded-lg object-contain border" style={{ borderColor: "#E8ECF0" }} />
                ) : (
                  <div className="w-10 h-10 rounded-lg border-2 border-dashed flex items-center justify-center text-xs" style={{ borderColor: "#CBD5E0", color: "#8A9BAE" }}>
                    🏪
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#1A2B3D" }}>{store.name}</p>
                  <div className="flex items-center gap-2">
                    {store.category && <span className="text-xs" style={{ color: "#8A9BAE" }}>{store.category}</span>}
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: store.is_active ? "#E8F5E9" : "#F5F5F5",
                        color: store.is_active ? "#2E7D32" : "#8A9BAE",
                      }}
                    >
                      {store.is_active ? "Ativa" : "Inativa"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(store)}
                disabled={deletingId === store.id}
                className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
              >
                {deletingId === store.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 border text-center" style={{ borderColor: "#E8ECF0" }}>
          <p className="text-sm" style={{ color: "#8A9BAE" }}>Nenhuma loja cadastrada ainda.</p>
          <p className="text-xs mt-1" style={{ color: "#8A9BAE" }}>Clique em "Criar Nova Loja" para começar.</p>
        </div>
      )}
    </div>
  );
};

export default ManageStoresSection;
