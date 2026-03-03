import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Store } from "lucide-react";

interface StoreSelectorProps {
  selectedStoreId: string | null;
  onSelectStore: (storeId: string | null) => void;
}

export default function StoreSelector({ selectedStoreId, onSelectStore }: StoreSelectorProps) {
  const { data: stores } = useQuery({
    queryKey: ["admin-stores-selector"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("id, name, logo_url")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="flex items-center gap-2">
      <Store className="w-4 h-4" style={{ color: "#5A6872" }} />
      <select
        value={selectedStoreId || ""}
        onChange={(e) => onSelectStore(e.target.value || null)}
        className="px-3 py-1.5 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
        style={{ borderColor: "#E8ECF0", color: "#1A2B3D" }}
      >
        <option value="">⚙️ Painel Geral</option>
        {(stores || []).map((s) => (
          <option key={s.id} value={s.id}>
            🏪 {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
