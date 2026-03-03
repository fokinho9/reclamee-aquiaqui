import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Copy, Check } from "lucide-react";
import StoreDataSection from "./StoreDataSection";
import StoreReviewsSection from "./StoreReviewsSection";
import StoreStatsSection from "./StoreStatsSection";
import StoreCouponsSection from "./StoreCouponsSection";
import StoreImportSection from "./StoreImportSection";
import StoreAISection from "./StoreAISection";
import StoreContentSection from "./StoreContentSection";
import StoreGoogleAdsSection from "./StoreGoogleAdsSection";
import ImportReviewsSection from "@/components/admin/ImportReviewsSection";
import ManageReviewsSection from "@/components/admin/ManageReviewsSection";

const STORE_TABS = [
  { id: "stats", label: "📊 Estatísticas" },
  { id: "data", label: "🏪 Dados da Loja" },
  { id: "content", label: "📄 Conteúdo" },
  { id: "reviews", label: "📝 Reclamações" },
  { id: "import", label: "📥 Importar" },
  { id: "ai", label: "🤖 IA" },
  { id: "google-ads", label: "📢 Google Ads" },
  { id: "coupons", label: "🎟️ Cupons" },
];

export default function StoreAdminPanel({ storeId }: { storeId: string }) {
  const [activeTab, setActiveTab] = useState("stats");
  const [copied, setCopied] = useState(false);

  const { data: store } = useQuery({
    queryKey: ["store-name", storeId],
    queryFn: async () => {
      const { data } = await supabase.from("stores").select("name, logo_url").eq("id", storeId).single();
      return data;
    },
  });

  const storeUrl = `${window.location.origin}/loja/${storeId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Header */}
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

      {/* Store Page Link */}
      <div className="mb-6 rounded-xl p-4 border flex items-center justify-between flex-wrap gap-3" style={{ borderColor: "#BEE3F8", backgroundColor: "#EBF8FF" }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#2B6CB0" }}>🔗 Página pública da loja</p>
          <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-mono break-all flex items-center gap-1 mt-1" style={{ color: "#2B6CB0" }}>
            {storeUrl} <ExternalLink className="w-3.5 h-3.5 flex-none" />
          </a>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 flex-none"
          style={{ backgroundColor: copied ? "#E8F5E9" : "#E5EEFB", color: copied ? "#2E7D32" : "#2B6CB0" }}
        >
          {copied ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar Link</>}
        </button>
      </div>

      {/* Tabs */}
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

      {/* Content */}
      {activeTab === "stats" && <StoreStatsSection storeId={storeId} />}
      {activeTab === "data" && <StoreDataSection storeId={storeId} />}
      {activeTab === "content" && <StoreContentSection />}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          <StoreReviewsSection storeId={storeId} />
          <ManageReviewsSection />
        </div>
      )}
      {activeTab === "import" && (
        <div className="space-y-6">
          <StoreImportSection storeId={storeId} />
          <ImportReviewsSection />
        </div>
      )}
      {activeTab === "ai" && <StoreAISection storeId={storeId} />}
      {activeTab === "google-ads" && <StoreGoogleAdsSection />}
      {activeTab === "coupons" && <StoreCouponsSection storeId={storeId} />}
    </div>
  );
}
