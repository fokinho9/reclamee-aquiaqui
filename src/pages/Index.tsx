import { Tag } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
import {
  Header, CompanyHero, TabNav, Footer,
  TrustCard, ReputationCard, PerformanceCard, EvolutionCard,
  VisitedAlso, ComplaintsSection, FAQSection, ProblemsSection,
  SidebarSection, PostCard
} from "@/components/CompanyLayout";

const Index = () => {
  const { data: content } = useSiteContent();
  const cv = (key: string, fallback: string) => {
    if (!content) return fallback;
    const item = content.find((i) => i.content_key === key);
    return item?.content_value ?? fallback;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F4F6' }}>
      <Header />
      <CompanyHero cv={cv} />
      <TabNav />

      <main className="max-w-[1286px] mx-auto px-4 md:px-6 py-6">
        {/* Mobile */}
        <div className="lg:hidden">
          <h2 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>{cv('company_name', 'Amazon')} é confiável?</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex-none w-[75%]"><ReputationCard cv={cv} /></div>
            <div className="flex-none w-[75%]"><TrustCard cv={cv} /></div>
          </div>
          <div className="mt-6"><PerformanceCard content={content} cv={cv} /></div>
          <EvolutionCard companyName={cv('company_name', 'Amazon')} />
          <div className="mt-6">
            <h3 className="text-[17px] font-bold mb-3" style={{ color: '#1A2B3D' }}>Veja mais informações sobre {cv('company_name', 'Amazon')}</h3>
            <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #E8ECF0' }}>
              <iframe width="100%" height="200" src={cv('youtube_url', 'https://www.youtube.com/embed/MVaaQ8Qu7Iw')} title="Vídeo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-[15px] font-bold mb-3" style={{ color: '#1A2B3D' }}>O que {cv('company_name', 'Amazon')} está postando</h3>
            <PostCard title="Proteja-se contra fraudes e golpes por mensagens" image="/images/post-3.jpg" />
            <a href="#" className="text-sm font-bold mt-3 inline-block" style={{ color: '#2B6CB0' }}>Ver todos os posts</a>
          </div>
          <ComplaintsSection companyName={cv('company_name', 'Amazon')} />
          <FAQSection />
          <ProblemsSection companyName={cv('company_name', 'Amazon')} />
          <div className="mt-8">
            <div className="bg-background rounded-xl p-6 text-center" style={{ border: '1px solid #E8ECF0' }}>
              <Tag className="w-10 h-10 mx-auto mb-3" style={{ color: '#2B6CB0' }} />
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1A2B3D' }}>Descontos de {cv('company_name', 'Amazon')}</h3>
              <p className="text-sm mb-4" style={{ color: '#5A6872' }}>Confira cupons e ofertas exclusivas disponíveis para você.</p>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white" style={{ backgroundColor: '#2B6CB0' }}>Ver descontos</a>
            </div>
          </div>
          <VisitedAlso />
          <div className="mt-6"><SidebarSection cv={cv} /></div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-[280px_1fr_280px] gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1A2B3D' }}>{cv('company_name', 'Amazon')} é confiável?</h2>
            <div className="space-y-4">
              <TrustCard cv={cv} />
              <ReputationCard cv={cv} />
            </div>
            <div className="mt-6"><PerformanceCard content={content} cv={cv} /></div>
            <EvolutionCard companyName={cv('company_name', 'Amazon')} />
            <VisitedAlso />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold mb-3" style={{ color: '#1A2B3D' }}>Veja mais informações sobre {cv('company_name', 'Amazon')}</h3>
            <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #E8ECF0' }}>
              <iframe width="100%" height="280" src={cv('youtube_url', 'https://www.youtube.com/embed/MVaaQ8Qu7Iw')} title="Vídeo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
            </div>
            <div className="mb-4">
              <h3 className="text-base font-bold mb-3" style={{ color: '#1A2B3D' }}>O que {cv('company_name', 'Amazon')} está postando</h3>
              <PostCard title="Proteja-se contra fraudes e golpes por mensagens" image="/images/post-3.jpg" />
              <a href="#" className="text-sm font-bold mt-3 inline-block" style={{ color: '#2B6CB0' }}>Ver todos os posts</a>
            </div>
            <ComplaintsSection companyName={cv('company_name', 'Amazon')} />
            <FAQSection />
            <ProblemsSection companyName={cv('company_name', 'Amazon')} />
            <div className="mt-8">
              <div className="bg-background rounded-xl p-6 text-center" style={{ border: '1px solid #E8ECF0' }}>
                <Tag className="w-10 h-10 mx-auto mb-3" style={{ color: '#2B6CB0' }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1A2B3D' }}>Descontos de {cv('company_name', 'Amazon')}</h3>
                <p className="text-sm mb-4" style={{ color: '#5A6872' }}>Confira cupons e ofertas exclusivas disponíveis para você.</p>
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white" style={{ backgroundColor: '#2B6CB0' }}>Ver descontos</a>
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

export default Index;
