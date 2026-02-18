import { CompanyPage, TrustCard, ReputationCard, PerformanceCard, EvolutionCard, SidebarSection, PostCard } from "@/components/CompanyLayout";

const Sobre = () => (
  <CompanyPage>
    {({ content, cv }) => (
      <>
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
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: '#1A2B3D' }}>Veja mais informações sobre {cv('company_name', 'Amazon')}</h3>
            <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #E8ECF0' }}>
              <iframe width="100%" height="280" src={cv('youtube_url', 'https://www.youtube.com/embed/MVaaQ8Qu7Iw')} title="Vídeo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
            </div>
          </div>
          <div><SidebarSection cv={cv} /></div>
        </div>
      </>
    )}
  </CompanyPage>
);

export default Sobre;
