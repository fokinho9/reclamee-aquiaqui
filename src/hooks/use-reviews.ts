import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Review {
  id: string;
  title: string;
  description: string;
  full_text: string;
  author_name: string;
  author_city: string;
  status: "respondida" | "nao_respondida" | "avaliada";
  category: string;
  product: string;
  rating: number | null;
  reactions_up: number;
  reactions_down: number;
  response_text: string | null;
  response_time: string | null;
  is_ai_generated: boolean;
  created_at: string;
  store_id: string | null;
}

export function useReviews(statusFilter?: string, storeId?: string) {
  return useQuery({
    queryKey: ["reviews", statusFilter, storeId],
    queryFn: async () => {
      let query = supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (storeId) {
        query = query.eq("store_id", storeId);
      }

      if (statusFilter && statusFilter !== "ultimas") {
        const statusMap: Record<string, string> = {
          nao_respondidas: "nao_respondida",
          respondidas: "respondida",
          avaliadas: "avaliada",
        };
        if (statusMap[statusFilter]) {
          query = query.eq("status", statusMap[statusFilter]);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as unknown as Review[];
    },
  });
}

export function useReview(id: string | undefined) {
  return useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as unknown as Review;
    },
    enabled: !!id,
  });
}
