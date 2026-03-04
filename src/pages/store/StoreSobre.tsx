import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, MapPin, Copy } from "lucide-react";
import { StoreCompanyPage } from "@/components/CompanyLayout";
import Seo from "@/components/seo/Seo";

const VerificationSection = () => {
  const [expanded, setExpanded] = useState(false);
  const criteria = [
    { icon: "🪪", label: "Identidade", desc: "Confirmamos a identidade de um dos membros do quadro societário administrativo da empresa." },
    { icon: "🌐", label: "Site cadastrado", desc: "A empresa tem um site cadastrado." },
    { icon: "📊", label: "Atividade no Reclame AQUI", desc: "Exigimos que a empresa tenha bons índices de taxa de resposta das reclamações e tenha um bom histórico de reputação conosco." },
    { icon: "🛡️", label: "Checagens de segurança", desc: "A empresa apresenta evidências de confiabilidade." },
  ];

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #E1E3E5', boxShadow: '0px 1px 2px rgba(0,0,0,0.16)' }}>
      <div className="px-4 py-4 cursor-pointer flex items-center justify-between" style={{ backgroundColor: '#15457F' }} onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-4">
          <img src="/images/seal-ra-verified.png" alt="Verificada" className="w-8 h-8" />
          <div>
            <p className="text-white font-semibold text-sm">Empresa verificada</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-white/70 text-xs">Critérios de verificação</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">
            {criteria.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] text-white/90" style={{ backgroundColor: '#113969' }}>
                {c.icon} <span className="hidden lg:inline">{c.label}</span> ✅
              </span>
            ))}
          </div>
          {expanded ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
        </div>
      </div>
      {expanded && (
        <div className="bg-background p-4 space-y-4">
          {criteria.map((c, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-lg flex-none">{c.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold" style={{ color: '#191B1A' }}>{c.label}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#F1F9E6', color: '#3C5B15' }}>✅ aprovado</span>
                </div>
                <p className="text-[13px] mt-1" style={{ color: '#798680' }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StoreSobre = () => (
  <StoreCompanyPage>
    {({ cv }) => {
      const companyName = cv('company_name', 'Empresa');
      return (
        <>
          <Seo title={`Sobre ${companyName} - Reclame Aqui`} description={`Saiba mais sobre ${companyName}.`} canonicalPath="#" />
          <div className="mb-4 text-sm" style={{ color: '#4B5963' }}>
            Você está em: <span className="font-semibold">{companyName}</span> {'>'} <span>Sobre</span>
          </div>
          <div className="lg:grid lg:grid-cols-[1fr_380px] gap-6">
            <div className="space-y-6">
              <h1 className="text-2xl md:text-[32px] font-semibold" style={{ color: '#303633' }}>Sobre {companyName}</h1>
              <div className="bg-background rounded-lg p-4 space-y-4" style={{ border: '1px solid #E1E3E5', boxShadow: '0px 1px 2px rgba(0,0,0,0.16)' }}>
                <div className="flex items-center gap-3"><span className="text-lg">🏢</span><h2 className="text-base font-semibold" style={{ color: '#303633' }}>Conheça {companyName}</h2></div>
                <p className="text-sm leading-relaxed" style={{ color: '#4B5963' }}>{cv('about_text', '')}</p>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#4B5963' }}>
                  <img src="/images/icons/calendar-star.svg" alt="" className="w-5 h-5" />
                  <span>{cv('company_registration_time', '')}</span>
                </div>
                {cv('cnpj', '') && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold" style={{ color: '#303633' }}>CNPJ:</span>
                    <span style={{ color: '#4B5963' }}>{cv('cnpj', '')}</span>
                    <button className="p-1 hover:bg-muted rounded" title="Copiar" onClick={() => navigator.clipboard.writeText(cv('cnpj', ''))}><Copy className="w-3.5 h-3.5" style={{ color: '#A9B0B5' }} /></button>
                  </div>
                )}
              </div>
              <VerificationSection />
              {cv('youtube_url', '') && (
                <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #E1E3E5' }}>
                  <iframe width="100%" height="360" src={cv('youtube_url', '')} title="Vídeo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
                </div>
              )}
              <div className="bg-background rounded-lg p-4 space-y-4" style={{ border: '1px solid #E1E3E5', boxShadow: '0px 1px 2px rgba(0,0,0,0.16)' }}>
                <p className="text-sm font-semibold" style={{ color: '#4B5963' }}>Nos últimos 6 meses, {companyName}:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: "👤", text: <>Resolveu <strong>{cv('stat_resolvidas_pct', '--')}</strong> dos problemas</> },
                    { icon: "💬", text: <>Respondeu <strong>{cv('stat_respondidas_pct', '--')}</strong> das reclamações</> },
                    { icon: "⏱️", text: <>Tempo médio das respostas é de <strong>{cv('stat_tempo_resposta', '--')}</strong></> },
                    { icon: "📢", text: <>Recebeu <strong>{cv('stat_reclamacoes', '--')} Reclamações</strong></> },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: '#F9F9F9' }}>
                      <span className="text-lg flex-none">{s.icon}</span>
                      <p className="text-sm" style={{ color: '#4B5963' }}>{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 space-y-4">
              <h3 className="text-base font-semibold" style={{ color: '#303633' }}>Todos os contatos de {companyName}</h3>
              <div className="bg-background rounded-lg p-4 space-y-4" style={{ border: '1px solid #E1E3E5', boxShadow: '0px 1px 2px rgba(0,0,0,0.16)' }}>
                <h4 className="font-semibold text-sm" style={{ color: '#303633' }}>Contatos da empresa</h4>
                {cv('website_url', '') && (
                  <a href={cv('website_url', '#')} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: '#F9F9F9', color: '#4B5963' }}>
                    🌐 {cv('website_url', '').replace('https://', '').replace('www.', '')}
                  </a>
                )}
                <div className="flex gap-4 mt-3 justify-center">
                  {cv('social_facebook', '') && <a href={cv('social_facebook', '#')}><img src="/images/social-facebook.png" alt="Facebook" className="w-7 h-7" /></a>}
                  {cv('social_instagram', '') && <a href={cv('social_instagram', '#')}><img src="/images/social-instagram.png" alt="Instagram" className="w-7 h-7" /></a>}
                  {cv('social_twitter', '') && <a href={cv('social_twitter', '#')}><img src="/images/social-x.png" alt="X" className="w-7 h-7" /></a>}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }}
  </StoreCompanyPage>
);

export default StoreSobre;
