import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import StoreDataSection from "./StoreDataSection";
import StoreReviewsSection from "./StoreReviewsSection";
import StoreStatsSection from "./StoreStatsSection";
import StoreCouponsSection from "./StoreCouponsSection";

const STORE_TABS = [
  { id: "stats", label: "📊 Estatísticas" },
  { id: "data", label: "🏪 Dados da Loja" },
  { id: "reviews", label: "📝 Reclamações" },
  { id: "coupons", label: "🎟️ Cupons" },
];

export default function StoreAdminPanel({ storeId }: { storeId: string }) {
  const [activeTab, setActiveTab] = useState("stats");

  const { data: store } = useQuery({
    queryKey: ["store-name", storeId],
    queryFn: async () => {
      const { data } = await supabase.from("stores").select("name, logo_url").eq("id", storeId).single();
      return data;
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        {store?.logo_url && (
          <img src={store.logo_url} alt="" className="w-12 h-12 rounded-xl object-cover border" style={{ borderColor: "#E8ECF0" }} />
        )}
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#1A2B3D" }}>
            Painel: {store?.name || "Loja"}
          </h2>
          <p className="text-sm" style={{ color: "#5A6872" }}>Gerencie todos os aspectos desta loja.</p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 overflow-x-auto">
        {STORE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-colors"
            style={{
              backgroundColor: activeTab === tab.id ? "#2B6CB0" : "#F2F4F6",
              color: activeTab === tab.id ? "#fff" : "#5A6872",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "stats" && <StoreStatsSection storeId={storeId} />}
      {activeTab === "data" && <StoreDataSection storeId={storeId} />}
      {activeTab === "reviews" && <StoreReviewsSection storeId={storeId} />}
      {activeTab === "coupons" && <StoreCouponsSection storeId={storeId} />}
    </div>
  );
}
