import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface StoreContentItem {
  id: string;
  store_id: string;
  content_key: string;
  content_value: string;
}

export function useStoreContent(storeId: string) {
  const normalizedStoreId = storeId.trim();

  return useQuery({
    queryKey: ["store-content-kv", normalizedStoreId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_content")
        .select("*")
        .eq("store_id", normalizedStoreId)
        .order("content_key");
      if (error) throw error;
      return (data || []) as unknown as StoreContentItem[];
    },
    enabled: !!normalizedStoreId,
    retry: false,
  });
}

export function useStoreContentValue(
  items: StoreContentItem[] | undefined,
  key: string,
  fallback = ""
) {
  if (!items) return fallback;
  const item = items.find((i) => i.content_key === key);
  return item?.content_value || fallback;
}

export function useUpsertStoreContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      storeId,
      entries,
    }: {
      storeId: string;
      entries: { content_key: string; content_value: string }[];
    }) => {
      for (const entry of entries) {
        const { error } = await (supabase.from("store_content") as any).upsert(
          {
            store_id: storeId,
            content_key: entry.content_key,
            content_value: entry.content_value,
          },
          { onConflict: "store_id,content_key" }
        );
        if (error) throw error;
      }
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["store-content-kv", variables.storeId] });
      qc.invalidateQueries({ queryKey: ["store-page", variables.storeId] });
    },
  });
}
