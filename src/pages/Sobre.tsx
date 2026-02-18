import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, MapPin, Copy } from "lucide-react";
import { CompanyPage } from "@/components/CompanyLayout";

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
      {/* Header azul escuro */}
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
          {/* Mini criteria icons */}
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

      {/* Expanded criteria */}
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
          <div className="pt-3 border-t" style={{ borderColor: '#E1E3E5' }}>
            <a href="#" className="text-sm font-semibold" style={{ color: '#317DD9' }}>Saber mais sobre a verificação</a>
          </div>
        </div>
      )}
    </div>
  );
};

const Sobre = () => (
  <CompanyPage>
    {({ content, cv }) => (
      <>
        {/* Breadcrumb */}
        <div className="mb-4 text-sm" style={{ color: '#4B5963' }}>
          Você está em: <a href="/" className="font-semibold hover:underline" style={{ color: '#4B5963' }}>{cv('company_name', 'Agro Brasil')}</a> {'>'} <span>Sobre</span>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Coluna principal */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-[32px] font-semibold" style={{ color: '#303633' }}>Sobre {cv('company_name', 'Agro Brasil')}</h1>

            {/* Card Conheça a empresa */}
            <div className="bg-background rounded-lg p-4 space-y-4" style={{ border: '1px solid #E1E3E5', boxShadow: '0px 1px 2px rgba(0,0,0,0.16)' }}>
              <div className="flex items-center gap-3">
                <span className="text-lg">🏢</span>
                <h2 className="text-base font-semibold" style={{ color: '#303633' }}>Conheça {cv('company_name', 'Agro Brasil')}</h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#4B5963' }}>
                {cv('about_text', 'A Agro Brasil oferece milhares de ofertas e produtos em diversas categorias, que incluem itens vendidos e entregues pela Agro Brasil ou por vendedores parceiros.')}
              </p>
              <div className="flex items-center gap-2 text-sm" style={{ color: '#4B5963' }}>
                <img src="/images/icons/calendar-star.svg" alt="" className="w-5 h-5" />
                <span>{cv('company_registration_time', 'Cadastrada há 20 anos')}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/seal-ra-verified.png" alt="Verificada" className="w-5 h-5" />
                <a href="#" className="text-sm font-semibold" style={{ color: '#1F69C1' }}>Verificada</a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold" style={{ color: '#303633' }}>CNPJ:</span>
                <span style={{ color: '#4B5963' }}>{cv('cnpj', '15.436.940/0001-03')}</span>
                <button className="p-1 hover:bg-muted rounded" title="Copiar"><Copy className="w-3.5 h-3.5" style={{ color: '#A9B0B5' }} /></button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold" style={{ color: '#303633' }}>Razão social:</span>
                <span style={{ color: '#4B5963' }}>Agro Brasil</span>
              </div>
              <p className="text-xs" style={{ color: '#A9B0B5' }}>Informações cadastradas pela empresa.</p>
            </div>

            {/* Verificação */}
            <VerificationSection />

            {/* Vídeo YouTube */}
            {cv('youtube_url', '') && (
              <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #E1E3E5' }}>
                <iframe
                  width="100%" height="360"
                  src={cv('youtube_url', '')}
                  title="Vídeo" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen className="w-full"
                />
              </div>
            )}

            {/* CTA Seus pedidos */}
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-end gap-2 px-4 py-3 rounded-lg text-white font-semibold text-base no-underline hover:opacity-90"
              style={{ backgroundColor: '#1F69C1' }}>
              Seus pedidos <ExternalLink className="w-4 h-4" />
            </a>

            {/* Endereço */}
            <div className="bg-background rounded-lg p-4 space-y-3" style={{ border: '1px solid #E1E3E5', boxShadow: '0px 1px 2px rgba(0,0,0,0.16)' }}>
              <h3 className="text-base font-semibold" style={{ color: '#303633' }}>Endereço</h3>
              <p className="text-sm" style={{ color: '#4B5963' }}>
                AVENIDA PRESIDENTE JUSCELINO KUBITSCHEK, 2041 - ANDAR 18 20 21 22 E 23 LADO A TORRE E - VILA NOVA CONCEICAO - SAO PAULO - SP - 04543011
              </p>
              <a href="https://maps.google.com/?q=AVENIDA+PRESIDENTE+JUSCELINO+KUBITSCHEK+2041+SAO+PAULO+SP"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#1F69C1' }}>
                <MapPin className="w-4 h-4" /> Como chegar
              </a>
            </div>

            {/* Estatísticas resumidas */}
            <div className="bg-background rounded-lg p-4 space-y-4" style={{ border: '1px solid #E1E3E5', boxShadow: '0px 1px 2px rgba(0,0,0,0.16)' }}>
              <p className="text-sm font-semibold" style={{ color: '#4B5963' }}>Nos últimos 6 meses, {cv('company_name', 'Agro Brasil')}:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "👤", text: <>Resolveu <strong>{cv('stat_resolvidas_pct', '88%')}</strong> dos problemas</> },
                  { icon: "💬", text: <>Respondeu <strong>{cv('stat_respondidas_pct', '88.4%')}</strong> das reclamações</> },
                  { icon: "⏱️", text: <>Tempo médio das respostas é de <strong>{cv('stat_tempo_resposta', '19 dias e 13 horas')}</strong></> },
                  { icon: "📢", text: <>Recebeu <a href="/reclamacoes" className="font-semibold" style={{ color: '#1F69C1' }}>{cv('stat_reclamacoes', '106194')} Reclamações</a></> },
                  { icon: "📄", text: <>A maioria das reclamações são sobre <strong>Produto não recebido</strong> e <strong>Atraso na entrega</strong>.</> },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: '#F9F9F9' }}>
                    <span className="text-lg flex-none">{s.icon}</span>
                    <p className="text-sm" style={{ color: '#4B5963' }}>{s.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs" style={{ color: '#A9B0B5' }}>Período de: 01/08/2025 - 31/01/2026</p>
            </div>
          </div>

          {/* Sidebar - Contatos */}
          <div className="mt-6 lg:mt-0 space-y-4">
            <h3 className="text-base font-semibold" style={{ color: '#303633' }}>Todos os contatos de {cv('company_name', 'Agro Brasil')}</h3>
            <div className="bg-background rounded-lg p-4 space-y-4" style={{ border: '1px solid #E1E3E5', boxShadow: '0px 1px 2px rgba(0,0,0,0.16)' }}>
              <h4 className="font-semibold text-sm" style={{ color: '#303633' }}>Contatos da empresa</h4>
              <p className="text-xs" style={{ color: '#A9B0B5' }}>Site</p>
              <a href={cv('website_url', '#')} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: '#F9F9F9', color: '#4B5963' }}>
                🌐 {cv('website_url', '#').replace('https://', '').replace('www.', '')}
              </a>
              <a href="#" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: '#F9F9F9', color: '#4B5963' }}>
                🌐 Ir para o atendimento
              </a>
              <div className="flex gap-4 mt-3 justify-center">
                <a href="#"><img src="/images/social-facebook.png" alt="Facebook" className="w-7 h-7" /></a>
                <a href="#"><img src="/images/social-instagram.png" alt="Instagram" className="w-7 h-7" /></a>
                <a href="#"><img src="/images/social-x.png" alt="X" className="w-7 h-7" /></a>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </CompanyPage>
);

export default Sobre;
