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

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function StoreAdminPanel({ storeId }: { storeId: string }) {
  const [activeTab, setActiveTab] = useState("stats");
  const [copied, setCopied] = useState(false);
  const normalizedStoreId = storeId.trim();
  const isValidStoreId = UUID_REGEX.test(normalizedStoreId);

  const { data: store, isLoading: loadingStore, isError: isStoreError, error: storeError } = useQuery({
    queryKey: ["store-name", normalizedStoreId],
    enabled: isValidStoreId,
    retry: false,
    queryFn: async () => {
      const { data, error } = await supabase.from("stores").select("name, logo_url").eq("id", normalizedStoreId).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const storeUrl = `${window.location.origin}/loja/${normalizedStoreId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isValidStoreId) return <p style={{ color: "#DC2626" }}>ID de loja inválido.</p>;
  if (loadingStore) return <p style={{ color: "#5A6872" }}>Carregando dados da loja...</p>;
  if (isStoreError) return <p style={{ color: "#DC2626" }}>{(storeError as Error)?.message || "Erro ao carregar a loja."}</p>;
  if (!store) return <p style={{ color: "#DC2626" }}>Loja não encontrada.</p>;

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
      {activeTab === "stats" && <StoreStatsSection storeId={normalizedStoreId} />}
      {activeTab === "data" && <StoreDataSection storeId={normalizedStoreId} />}
      {activeTab === "content" && <StoreContentSection storeId={normalizedStoreId} />}
      {activeTab === "reviews" && <StoreReviewsSection storeId={normalizedStoreId} />}
      {activeTab === "import" && <StoreImportSection storeId={normalizedStoreId} />}
      {activeTab === "ai" && <StoreAISection storeId={normalizedStoreId} />}
      {activeTab === "google-ads" && <StoreGoogleAdsSection />}
      {activeTab === "coupons" && <StoreCouponsSection storeId={normalizedStoreId} />}
    </div>
  );
}
