import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function StoreStatsSection({ storeId }: { storeId: string }) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["store-stats", storeId],
    queryFn: async () => {
      const { data: reviews, error } = await supabase
        .from("reviews")
        .select("status, rating, created_at")
        .eq("store_id", storeId);
      if (error) throw error;

      const total = reviews.length;
      const responded = reviews.filter((r) => r.status === "respondida" || r.status === "finalizada").length;
      const evaluated = reviews.filter((r) => r.status === "avaliada").length;
      const unanswered = reviews.filter((r) => r.status === "nao_respondida").length;
      const avgRating = total > 0
        ? (reviews.filter((r) => r.rating).reduce((s, r) => s + (r.rating || 0), 0) / reviews.filter((r) => r.rating).length || 0).toFixed(1)
        : "0.0";
      const responseRate = total > 0 ? ((responded / total) * 100).toFixed(0) : "0";

      return { total, responded, evaluated, unanswered, avgRating, responseRate };
    },
  });

  if (isLoading) return <p style={{ color: "#5A6872" }}>Carregando estatísticas...</p>;

  const cards = [
    { label: "Total de Reclamações", value: stats?.total || 0, icon: "📋", bg: "#E5EEFB", color: "#2B6CB0" },
    { label: "Respondidas", value: stats?.responded || 0, icon: "✅", bg: "#E8F5E9", color: "#2E7D32" },
    { label: "Não Respondidas", value: stats?.unanswered || 0, icon: "⚠️", bg: "#FFF3E0", color: "#E65100" },
    { label: "Avaliadas", value: stats?.evaluated || 0, icon: "⭐", bg: "#F3E5F5", color: "#7B1FA2" },
    { label: "Nota Média", value: stats?.avgRating || "0.0", icon: "📊", bg: "#FFF8E1", color: "#F57F17" },
    { label: "Taxa de Resposta", value: `${stats?.responseRate || 0}%`, icon: "📈", bg: "#E0F2F1", color: "#00695C" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-white rounded-xl p-5 border text-center" style={{ borderColor: "#E8ECF0" }}>
          <span className="text-2xl">{c.icon}</span>
          <p className="text-2xl font-bold mt-2" style={{ color: c.color }}>{c.value}</p>
          <p className="text-xs mt-1 font-medium" style={{ color: "#5A6872" }}>{c.label}</p>
        </div>
      ))}
    </div>
  );
}
