import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PAGE_SIZE = 10;
const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  nao_respondida: { label: "Não respondida", bg: "#FFF3E0", color: "#E65100" },
  respondida: { label: "Respondida", bg: "#E8F5E9", color: "#2E7D32" },
  avaliada: { label: "Avaliada", bg: "#E5EEFB", color: "#2B6CB0" },
  finalizada: { label: "Finalizada", bg: "#F3E5F5", color: "#7B1FA2" },
};

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function StoreReviewsSection({ storeId }: { storeId: string }) {
  const [page, setPage] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const normalizedStoreId = storeId.trim();
  const isValidStoreId = UUID_REGEX.test(normalizedStoreId);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["store-reviews", normalizedStoreId, page],
    enabled: isValidStoreId,
    retry: false,
    queryFn: async () => {
      const from = page * PAGE_SIZE;
      const { data, error, count } = await supabase
        .from("reviews")
        .select("*", { count: "exact" })
        .eq("store_id", normalizedStoreId)
        .order("created_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1);
      if (error) throw error;
      return { reviews: data, total: count || 0 };
    },
  });

  const reviews = data?.reviews || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSaveReview = async (id: string) => {
    const { error } = await supabase
      .from("reviews")
      .update({
        title: editValues.title,
        description: editValues.description,
        status: editValues.status,
        category: editValues.category,
        response_text: editValues.response_text || null,
      })
      .eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Salvo!" });
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["store-reviews", normalizedStoreId] });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta reclamação?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Excluída!" });
      queryClient.invalidateQueries({ queryKey: ["store-reviews", normalizedStoreId] });
    }
  };

  if (!isValidStoreId) return <p style={{ color: "#DC2626" }}>ID de loja inválido.</p>;
  if (isLoading) return <p style={{ color: "#5A6872" }}>Carregando reclamações...</p>;
  if (isError) return <p style={{ color: "#DC2626" }}>{(error as Error)?.message || "Erro ao carregar reclamações."}</p>;

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border text-center" style={{ borderColor: "#E8ECF0" }}>
        <p style={{ color: "#5A6872" }}>Nenhuma reclamação vinculada a esta loja.</p>
        <p className="text-xs mt-2" style={{ color: "#8A9BAE" }}>
          Para vincular reclamações, edite-as no painel geral e atribua o store_id.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium" style={{ color: "#5A6872" }}>{total} reclamação(ões) encontrada(s)</p>
      {reviews.map((r) => {
        const isEditing = editingId === r.id;
        const st = STATUS_LABELS[r.status] || STATUS_LABELS.nao_respondida;
        return (
          <div key={r.id} className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
            {isEditing ? (
              <div className="space-y-3">
                <input
                  value={editValues.title || ""}
                  onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  style={{ borderColor: "#E8ECF0" }}
                  placeholder="Título"
                />
                <textarea
                  value={editValues.description || ""}
                  onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  style={{ borderColor: "#E8ECF0" }}
                  placeholder="Descrição"
                />
                <div className="flex gap-3">
                  <select
                    value={editValues.status || ""}
                    onChange={(e) => setEditValues({ ...editValues, status: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm"
                    style={{ borderColor: "#E8ECF0" }}
                  >
                    {Object.entries(STATUS_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                  <input
                    value={editValues.category || ""}
                    onChange={(e) => setEditValues({ ...editValues, category: e.target.value })}
                    className="px-3 py-2 border rounded-lg text-sm flex-1"
                    style={{ borderColor: "#E8ECF0" }}
                    placeholder="Categoria"
                  />
                </div>
                <textarea
                  value={editValues.response_text || ""}
                  onChange={(e) => setEditValues({ ...editValues, response_text: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  style={{ borderColor: "#E8ECF0" }}
                  placeholder="Resposta da empresa (opcional)"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveReview(r.id)}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: "#1B8B4F" }}
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: "#F2F4F6", color: "#5A6872" }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold" style={{ color: "#1A2B3D" }}>{r.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
                    <button
                      onClick={() => {
                        setEditingId(r.id);
                        setEditValues({
                          title: r.title,
                          description: r.description,
                          status: r.status,
                          category: r.category,
                          response_text: r.response_text || "",
                        });
                      }}
                      className="text-xs px-2 py-1 rounded-lg font-medium"
                      style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}
                    >
                      Editar
                    </button>
                    <button onClick={() => handleDelete(r.id)} className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#5A6872" }}>{r.description?.slice(0, 120)}...</p>
                <div className="flex gap-3 mt-2 text-xs" style={{ color: "#8A9BAE" }}>
                  <span>👤 {r.author_name}</span>
                  <span>📦 {r.product}</span>
                  <span>🏷️ {r.category}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button disabled={page === 0} onClick={() => setPage(page - 1)} className="p-2 rounded-lg disabled:opacity-30" style={{ backgroundColor: "#E5EEFB" }}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm" style={{ color: "#5A6872" }}>
            {page + 1} / {totalPages}
          </span>
          <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} className="p-2 rounded-lg disabled:opacity-30" style={{ backgroundColor: "#E5EEFB" }}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
