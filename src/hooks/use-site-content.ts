import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  id: string;
  content_key: string;
  content_value: string;
  content_type: string;
  label: string;
  section: string;
  sort_order: number;
}

export function useSiteContent() {
  return useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section")
        .order("sort_order");
      if (error) throw error;
      return data as SiteContent[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useContentValue(items: SiteContent[] | undefined, key: string, fallback = "") {
  if (!items) return fallback;
  const item = items.find((i) => i.content_key === key);
  return item?.content_value ?? fallback;
}

export function useUpdateContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, content_value }: { id: string; content_value: string }) => {
      const { error } = await supabase
        .from("site_content")
        .update({ content_value })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site-content"] }),
  });
}

export function useUploadAsset() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = file.name.split(".").pop();
      const path = `uploads/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("site-assets").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
      return data.publicUrl;
    },
  });
}
