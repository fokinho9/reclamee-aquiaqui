import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

export default function StoreAISection({ storeId }: { storeId: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(5);
  const [reviews, setReviews] = useState<any[]>([]);

  const { data: store } = useQuery({
    queryKey: ["store-ai-info", storeId],
    queryFn: async () => {
      const { data } = await supabase.from("stores").select("name, category").eq("id", storeId).single();
      return data;
    },
  });

  const handleGenerate = async () => {
    if (!store?.name) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-reviews", {
        body: {
          companyName: store.name,
          companyCategory: store.category || "e-commerce",
          quantity,
          storeId,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setReviews(data?.reviews || []);
      toast({ title: "Gerado!", description: `${data?.reviews?.length || 0} avaliações geradas para ${store.name}.` });
      queryClient.invalidateQueries({ queryKey: ["store-reviews", storeId] });
      queryClient.invalidateQueries({ queryKey: ["store-stats", storeId] });
    } catch (err: any) {
      toast({ title: "Erro", description: err.message || "Tente novamente.", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-sm font-bold mb-3" style={{ color: "#1A2B3D" }}>Gerar Avaliações com IA</h3>
        <p className="text-sm mb-4" style={{ color: "#5A6872" }}>
          Gere avaliações realistas automaticamente para <strong>{store?.name || "esta loja"}</strong>.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium" style={{ color: "#1A2B3D" }}>Quantidade:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg text-sm"
              style={{ borderColor: "#E8ECF0" }}
            >
              {[3, 5, 7, 10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: "#F3E5F5", color: "#7B1FA2" }}>
            Loja: <strong>{store?.name || "..."}</strong> · Categoria: <strong>{store?.category || "N/A"}</strong>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: "#7B1FA2" }}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Gerando..." : "Gerar Avaliações"}
          </button>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold" style={{ color: "#1A2B3D" }}>
            {reviews.length} avaliações geradas:
          </h4>
          {reviews.map((r: any, i: number) => (
            <div key={i} className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
              <span className="text-sm font-bold" style={{ color: "#1A2B3D" }}>{r.title}</span>
              <p className="text-sm mt-1" style={{ color: "#5A6872" }}>{r.text}</p>
              <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: "#8A9BAE" }}>
                <span>👤 {r.author}</span>
                <span>{"⭐".repeat(r.rating || 0)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
