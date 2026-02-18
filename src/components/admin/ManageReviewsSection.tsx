import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useReviews, type Review } from "@/hooks/use-reviews";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, ChevronRight, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";

const CATEGORIES = [
  "Produto não recebido",
  "Atraso na entrega",
  "Produto com defeito",
  "Cobrança indevida",
  "Reembolso",
  "Atendimento",
  "Problemas com o site",
  "Troca e devolução",
  "Cancelamento",
  "Propaganda enganosa",
  "Outros",
];

const STATUS_OPTIONS = [
  { value: "nao_respondida", label: "Não respondida" },
  { value: "respondida", label: "Respondida" },
  { value: "avaliada", label: "Avaliada" },
];

const ITEMS_PER_PAGE = 10;

const ManageReviewsSection = () => {
  const [open, setOpen] = useState(true);
  const { data: reviews, isLoading } = useReviews();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Review>>({});
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const allReviews = reviews || [];
  const totalPages = Math.max(1, Math.ceil(allReviews.length / ITEMS_PER_PAGE));
  const paginated = allReviews.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const startEdit = (r: Review) => {
    setEditingId(r.id);
    setEditData({ title: r.title, description: r.description, category: r.category, status: r.status, product: r.product });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    const { error } = await supabase
      .from("reviews" as any)
      .update(editData as any)
      .eq("id", editingId);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Salvo!", description: "Reclamação atualizada." });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      cancelEdit();
    }
    setSaving(false);
  };

  const deleteReview = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase.from("reviews" as any).delete().eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Excluída", description: "Reclamação removida." });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    }
    setDeletingId(null);
  };

  const statusColors: Record<string, { bg: string; color: string }> = {
    respondida: { bg: "#E8F5E9", color: "#2E7D32" },
    nao_respondida: { bg: "#FFF3E0", color: "#E65100" },
    avaliada: { bg: "#E5EEFB", color: "#2B6CB0" },
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-lg font-bold mb-3 w-full text-left"
        style={{ color: "#1A2B3D" }}
      >
        {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        📝 Gerenciar Reclamações
        <span className="text-xs font-normal ml-2" style={{ color: "#8A9BAE" }}>
          {allReviews.length} total
        </span>
      </button>

      {open && (
        <div className="ml-7 space-y-3">
          {isLoading ? (
            <p className="text-sm" style={{ color: "#8A9BAE" }}>Carregando...</p>
          ) : allReviews.length === 0 ? (
            <p className="text-sm" style={{ color: "#8A9BAE" }}>Nenhuma reclamação cadastrada.</p>
          ) : (
            <>
              {paginated.map((r) => {
                const isEditing = editingId === r.id;
                const sc = statusColors[r.status] || statusColors.nao_respondida;

                return (
                  <div key={r.id} className="bg-white rounded-xl p-4 border transition-all" style={{ borderColor: isEditing ? "#2B6CB0" : "#E8ECF0" }}>
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold mb-1 block" style={{ color: "#5A6872" }}>Título</label>
                          <input
                            type="text"
                            value={editData.title || ""}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            style={{ borderColor: "#E8ECF0" }}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold mb-1 block" style={{ color: "#5A6872" }}>Descrição</label>
                          <textarea
                            value={editData.description || ""}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            style={{ borderColor: "#E8ECF0" }}
                          />
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          <div className="flex-1 min-w-[150px]">
                            <label className="text-xs font-semibold mb-1 block" style={{ color: "#5A6872" }}>Categoria</label>
                            <select
                              value={editData.category || ""}
                              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              style={{ borderColor: "#E8ECF0" }}
                            >
                              <option value="">Sem categoria</option>
                              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div className="flex-1 min-w-[150px]">
                            <label className="text-xs font-semibold mb-1 block" style={{ color: "#5A6872" }}>Status</label>
                            <select
                              value={editData.status || ""}
                              onChange={(e) => setEditData({ ...editData, status: e.target.value as Review["status"] })}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              style={{ borderColor: "#E8ECF0" }}
                            >
                              {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                          </div>
                          <div className="flex-1 min-w-[150px]">
                            <label className="text-xs font-semibold mb-1 block" style={{ color: "#5A6872" }}>Produto</label>
                            <input
                              type="text"
                              value={editData.product || ""}
                              onChange={(e) => setEditData({ ...editData, product: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg text-sm"
                              style={{ borderColor: "#E8ECF0" }}
                              placeholder="Ex: Notebook Dell"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            disabled={saving}
                            className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
                            style={{ backgroundColor: "#1B8B4F" }}
                          >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Salvar
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                            style={{ backgroundColor: "#F0F4F8", color: "#5A6872" }}
                          >
                            <X className="w-4 h-4" /> Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-bold truncate" style={{ color: "#1A2B3D" }}>{r.title}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: sc.bg, color: sc.color }}>
                              {r.status === "nao_respondida" ? "Não respondida" : r.status === "respondida" ? "Respondida" : "Avaliada"}
                            </span>
                            {r.category && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#F0F4F8", color: "#5A6872" }}>
                                {r.category}
                              </span>
                            )}
                          </div>
                          <p className="text-xs line-clamp-1" style={{ color: "#5A6872" }}>{r.description}</p>
                          <p className="text-[10px] mt-1" style={{ color: "#8A9BAE" }}>👤 {r.author_name} · {r.author_city}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => startEdit(r)}
                            className="p-1.5 rounded-lg hover:bg-blue-50"
                            title="Editar"
                          >
                            <Pencil className="w-3.5 h-3.5" style={{ color: "#2B6CB0" }} />
                          </button>
                          <button
                            onClick={() => deleteReview(r.id)}
                            disabled={deletingId === r.id}
                            className="p-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50"
                            title="Excluir"
                          >
                            {deletingId === r.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-red-400" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5 text-red-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 pt-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="px-3 py-1.5 text-xs rounded-lg disabled:opacity-30"
                    style={{ color: "#2B6CB0" }}
                  >
                    ← Anterior
                  </button>
                  <span className="text-xs px-3" style={{ color: "#8A9BAE" }}>
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="px-3 py-1.5 text-xs rounded-lg disabled:opacity-30"
                    style={{ color: "#2B6CB0" }}
                  >
                    Próxima →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageReviewsSection;
