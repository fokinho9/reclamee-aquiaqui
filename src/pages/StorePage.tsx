import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tag, MessageSquare } from "lucide-react";
import {
  Header, Footer, TabNav,
  TrustCard, ReputationCard, PerformanceCard, EvolutionCard,
  VisitedAlso, ComplaintsSection, FAQSection, ProblemsSection,
  SidebarSection, PostCard
} from "@/components/CompanyLayout";
import Seo from "@/components/seo/Seo";
import { useStoreContent } from "@/hooks/use-store-content";

const StorePage = () => {
  const { storeId } = useParams();

  const { data: store, isLoading } = useQuery({
    queryKey: ["store-page", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("id", storeId!)
        .eq("is_active", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!storeId,
  });

  const { data: storeContent } = useStoreContent(storeId || "");

  // Helper to get content value from store_content table
  const getContent = (key: string): string | undefined => {
    const item = storeContent?.find((i) => i.content_key === key);
    return item?.content_value || undefined;
  };

  // Build a cv function: store_content > store fields > fallback
  const cv = (key: string, fallback: string): string => {
    // First check store_content table
    const contentVal = getContent(key);
    if (contentVal) return contentVal;

    // Then check store fields
    if (!store) return fallback;
    const map: Record<string, string | null | undefined> = {
      company_name: store.name,
      company_logo: store.logo_url,
      company_category: store.category,
      company_banner: store.logo_url,
      company_banner_mobile: store.logo_url,
      banner_bg_color: "#2B6CB0",
      company_views: "",
      reputation_label: "Em análise",
      reputation_description: `A reputação de ${store.name} está sendo avaliada com base nas reclamações recebidas.`,
      trust_description: `${store.name} é uma empresa cadastrada e verificada.`,
      about_text: store.description || `${store.name} é uma empresa parceira cadastrada em nossa plataforma.`,
      cnpj: "",
      website_url: store.website_url || "",
      company_registration_time: `Cadastrada em ${new Date(store.created_at).toLocaleDateString("pt-BR")}`,
      company_brands: store.name,
      company_position: "--",
      company_position_label: "",
      company_position_category: "",
      youtube_url: "",
      stat_reclamacoes: "0",
      stat_respondidas_pct: "0%",
      stat_aguardando: "0",
      stat_avaliadas: "0",
      stat_nota_media: "0",
      stat_voltariam_pct: "0%",
      stat_resolvidas_pct: "0%",
      stat_tempo_resposta: "--",
    };
    return map[key] !== undefined ? (map[key] || fallback) : fallback;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F2F4F6" }}>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p style={{ color: "#5A6872" }}>Carregando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F2F4F6" }}>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#1A2B3D" }}>Loja não encontrada</h1>
          <p style={{ color: "#5A6872" }}>Esta loja não existe ou está inativa.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const companyName = cv("company_name", store.name);
  const bannerBg = cv("banner_bg_color", "#2B6CB0");
  const bannerDesktop = getContent("company_banner");
  const bannerMobile = getContent("company_banner_mobile");
  const repLabel = cv("reputation_label", "Em análise");

  /* ── Hero customizado para a loja ── */
  const StoreHero = () => (
    <div className="relative">
      <div className="w-full h-[105px] md:h-[280px]" style={{ backgroundColor: bannerBg }}>
        {bannerDesktop ? (
          <>
            <img src={bannerDesktop} alt={companyName} className="w-full h-full object-cover max-w-[1920px] mx-auto hidden md:block" />
            <img src={bannerMobile || bannerDesktop} alt={companyName} className="w-full h-full object-cover md:hidden" />
          </>
        ) : store.logo_url ? (
          <div className="w-full h-full flex items-center justify-center">
            <img src={store.logo_url} alt={companyName} className="max-h-[80%] max-w-[300px] object-contain" />
          </div>
        ) : null}
      </div>
      <div className="max-w-[1286px] mx-auto px-4 md:px-10 relative">
        <div className="hidden md:flex items-end gap-6 -mt-16">
          <a href="#" className="flex-none w-[188px] h-[188px] rounded-full bg-[#FAFAFA] shadow-md flex items-center justify-center -mt-8 border-4 border-background overflow-hidden">
            {cv("company_logo", "") ? (
              <img src={cv("company_logo", "")} alt="Logo" className="w-[170px] h-[170px] rounded-full object-cover" />
            ) : (
              <span className="text-6xl">🏪</span>
            )}
          </a>
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">{companyName}</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              {cv("company_category", "") && (
                <span className="flex items-center gap-1">
                  <img src="/images/icons/store.svg" alt="" className="w-4 h-4" /> {cv("company_category", "")}
                </span>
              )}
              {cv("company_views", "") && (
                <span className="flex items-center gap-1">
                  <img src="/images/icons/eye.svg" alt="" className="w-4 h-4" /> {cv("company_views", "")}
                </span>
              )}
            </div>
            {cv("about_text", "") && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{cv("about_text", "")}</p>
            )}
          </div>
          <button className="mb-3 px-6 py-2.5 rounded-md font-semibold text-sm flex items-center gap-2 text-white hover:opacity-90" style={{ backgroundColor: "#D11F26" }}>
            <MessageSquare className="w-4 h-4" /> Reclamar
          </button>
        </div>
        <div className="md:hidden flex flex-col items-center -mt-10">
          <a href="#" className="w-[80px] h-[80px] rounded-full bg-[#FAFAFA] shadow-md flex items-center justify-center border-4 border-background overflow-hidden">
            {cv("company_logo", "") ? (
              <img src={cv("company_logo", "")} alt="Logo" className="w-[72px] h-[72px] rounded-full object-cover" />
            ) : (
              <span className="text-3xl">🏪</span>
            )}
          </a>
          <h1 className="text-lg font-bold text-foreground mt-2">{companyName}</h1>
          {cv("company_category", "") && (
            <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <img src="/images/icons/store.svg" alt="" className="w-3.5 h-3.5" /> {cv("company_category", "")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-3 mb-2 md:justify-start justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: "#E5EEFB", color: "#0A213D" }}>
            <img src="/images/icons/rep-em-analise.png" alt={repLabel} className="w-[18px] h-[18px]" /> {repLabel}
          </span>
        </div>
        <button className="md:hidden w-full py-3 rounded-md font-semibold text-sm flex items-center justify-center gap-2 text-white mt-2 mb-2" style={{ backgroundColor: "#D11F26" }}>
          <MessageSquare className="w-4 h-4" /> Reclamar
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F2F4F6" }}>
      <Seo
        title={`${companyName} - Reclame Aqui`}
        description={`Veja a reputação da ${companyName}. Confira reclamações, avaliações e cupons de desconto.`}
        canonicalPath={`/loja/${store.id}`}
      />
      <Header />
      <StoreHero />

      <main className="max-w-[1286px] mx-auto px-4 md:px-6 py-6">
        {/* Mobile */}
        <div className="lg:hidden">
          <h2 className="text-[17px] font-bold mb-4" style={{ color: "#1A2B3D" }}>{companyName} é confiável?</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex-none w-[75%]"><ReputationCard cv={cv} /></div>
            <div className="flex-none w-[75%]"><TrustCard cv={cv} /></div>
          </div>
          <div className="mt-6"><PerformanceCard content={[]} cv={cv} /></div>
          <EvolutionCard companyName={companyName} />
          {cv("youtube_url", "") && (
            <div className="mt-6">
              <h3 className="text-[17px] font-bold mb-3" style={{ color: "#1A2B3D" }}>Veja mais sobre {companyName}</h3>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #E8ECF0" }}>
                <iframe width="100%" height="200" src={cv("youtube_url", "")} title="Vídeo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
              </div>
            </div>
          )}
          <ComplaintsSection companyName={companyName} storeId={storeId} />
          <FAQSection />
          <ProblemsSection companyName={companyName} />
          <div className="mt-8">
            <div className="bg-background rounded-xl p-6 text-center" style={{ border: "1px solid #E8ECF0" }}>
              <Tag className="w-10 h-10 mx-auto mb-3" style={{ color: "#2B6CB0" }} />
              <h3 className="text-lg font-bold mb-2" style={{ color: "#1A2B3D" }}>Descontos de {companyName}</h3>
              <p className="text-sm mb-4" style={{ color: "#5A6872" }}>Confira cupons e ofertas exclusivas disponíveis para você.</p>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white" style={{ backgroundColor: "#2B6CB0" }}>Ver descontos</a>
            </div>
          </div>
          <VisitedAlso />
          <div className="mt-6"><SidebarSection cv={cv} /></div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-[280px_1fr_280px] gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#1A2B3D" }}>{companyName} é confiável?</h2>
            <div className="space-y-4">
              <TrustCard cv={cv} />
              <ReputationCard cv={cv} />
            </div>
            <div className="mt-6"><PerformanceCard content={[]} cv={cv} /></div>
            <EvolutionCard companyName={companyName} />
            <VisitedAlso />
          </div>
          <div className="min-w-0">
            {cv("youtube_url", "") && (
              <>
                <h3 className="text-lg font-bold mb-3" style={{ color: "#1A2B3D" }}>Veja mais sobre {companyName}</h3>
                <div className="rounded-xl overflow-hidden mb-4" style={{ border: "1px solid #E8ECF0" }}>
                  <iframe width="100%" height="280" src={cv("youtube_url", "")} title="Vídeo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
                </div>
              </>
            )}
            <ComplaintsSection companyName={companyName} storeId={storeId} />
            <FAQSection />
            <ProblemsSection companyName={companyName} />
            <div className="mt-8">
              <div className="bg-background rounded-xl p-6 text-center" style={{ border: "1px solid #E8ECF0" }}>
                <Tag className="w-10 h-10 mx-auto mb-3" style={{ color: "#2B6CB0" }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: "#1A2B3D" }}>Descontos de {companyName}</h3>
                <p className="text-sm mb-4" style={{ color: "#5A6872" }}>Confira cupons e ofertas exclusivas disponíveis para você.</p>
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white" style={{ backgroundColor: "#2B6CB0" }}>Ver descontos</a>
              </div>
            </div>
          </div>
          <div><SidebarSection cv={cv} /></div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StorePage;
