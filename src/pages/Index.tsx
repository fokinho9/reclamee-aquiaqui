import { Home, Building2, MessageSquare, Tag, HelpCircle, FileText, AlertTriangle, Eye, ExternalLink, ThumbsUp, MoreVertical, Globe, Info, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSiteContent, useContentValue } from "@/hooks/use-site-content";

/* ───────────── HEADER ───────────── */
const Header = () => (
  <header className="bg-background border-b border-border">
    <div className="max-w-[1286px] mx-auto flex items-center justify-between px-4 md:px-6 py-2">
      <div className="flex items-center gap-2">
        <img src="/images/logo-25-anos.svg" alt="ReclameAQUI 25 anos" className="h-7 md:h-9 w-auto" />
      </div>
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <img src="/images/icons/search.svg" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
          <input type="text" placeholder="O que você procura?" className="w-full pl-10 pr-4 py-2 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>
      <button className="md:hidden p-2 border border-border rounded-lg"><img src="/images/icons/search.svg" alt="" className="w-5 h-5" /></button>
      <div className="flex items-center gap-2 md:gap-3">
        <button className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold border border-primary rounded-full text-primary hover:bg-primary/5">Entrar</button>
        <button className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90">Criar conta</button>
      </div>
    </div>
    <nav className="max-w-[1286px] mx-auto px-6 hidden md:flex items-center gap-8 py-2 text-sm font-semibold text-foreground">
      <span className="flex items-center gap-1 cursor-pointer hover:text-primary">Para você <img src="/images/icons/chevron-down-official.svg" alt="" className="w-3 h-3" /></span>
      <span className="flex items-center gap-1 cursor-pointer hover:text-primary">Melhores empresas <img src="/images/icons/chevron-down-official.svg" alt="" className="w-3 h-3" /></span>
      <span className="cursor-pointer hover:text-primary">Detector de Site Confiável</span>
      <span className="cursor-pointer hover:text-primary">Compare</span>
      <span className="cursor-pointer hover:text-primary">Descontos</span>
      <span className="flex items-center gap-1 cursor-pointer hover:text-primary">Para empresas <img src="/images/icons/chevron-down-official.svg" alt="" className="w-3 h-3" /></span>
    </nav>
  </header>
);

/* ───────────── HERO ───────────── */
const CompanyHero = () => (
  <div className="relative">
    <div className="w-full h-[105px] md:h-[280px]" style={{ backgroundColor: '#EF6509' }}>
      <img src="/images/amazon-banner.jpg" alt="Banner Amazon" className="w-full h-full object-cover max-w-[1920px] mx-auto hidden md:block" />
      <img src="/images/amazon-banner-mobile.jpg" alt="Banner Amazon" className="w-full h-full object-cover md:hidden" />
    </div>
    <div className="max-w-[1286px] mx-auto px-4 md:px-10 relative">
      <div className="hidden md:flex items-end gap-6 -mt-16">
        <a href="#" className="flex-none w-[188px] h-[188px] rounded-full bg-[#FAFAFA] shadow-md flex items-center justify-center -mt-8 border-4 border-background overflow-hidden">
          <img src="/images/amazon-logo.jpg" alt="Amazon Logo" className="w-[170px] h-[170px] rounded-full object-cover" />
        </a>
        <div className="flex-1 pb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">Amazon</h1>
            <img src="/images/seal-ra-verified.png" alt="RA Verificada" className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1"><img src="/images/icons/store.svg" alt="" className="w-4 h-4" style={{ color: '#5A6872' }} /> Varejo - Marketplaces</span>
            <span className="flex items-center gap-1"><img src="/images/icons/eye.svg" alt="" className="w-4 h-4" style={{ color: '#5A6872' }} /> + 2.4 milhões de visualizações</span>
          </div>
        </div>
        <button className="mb-3 px-6 py-2.5 rounded-md font-semibold text-sm flex items-center gap-2 text-white hover:opacity-90" style={{ backgroundColor: '#D11F26' }}>
          <MessageSquare className="w-4 h-4" /> Reclamar
        </button>
      </div>
      <div className="md:hidden flex flex-col items-center -mt-10">
        <a href="#" className="w-[80px] h-[80px] rounded-full bg-[#FAFAFA] shadow-md flex items-center justify-center border-4 border-background overflow-hidden">
          <img src="/images/amazon-logo.jpg" alt="Amazon Logo" className="w-[72px] h-[72px] rounded-full object-cover" />
        </a>
        <div className="flex items-center gap-1.5 mt-2">
          <h1 className="text-lg font-bold text-foreground">Amazon</h1>
          <img src="/images/seal-ra-verified.png" alt="RA Verificada" className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1"><img src="/images/icons/store.svg" alt="" className="w-3.5 h-3.5" /> Varejo - Marketplaces</span>
          <span className="flex items-center gap-1"><img src="/images/icons/eye.svg" alt="" className="w-3.5 h-3.5" /> + 2.4 milhões de visualizações</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 mb-2 md:justify-start justify-center">
        <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: '#F1F9E6', color: '#0A213D' }}>
          <img src="/images/reputation-otimo.webp" alt="Ótimo" className="w-[18px] h-[18px]" /> Ótimo
        </a>
        <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: '#E5EEFB', color: '#0A213D' }}>
          <img src="/images/seal-ra-verified.png" alt="Verificada" className="w-[18px] h-[18px]" /> Verificada
        </a>
      </div>
      <button className="md:hidden w-full py-3 rounded-md font-semibold text-sm flex items-center justify-center gap-2 text-white mt-2 mb-2" style={{ backgroundColor: '#D11F26' }}>
        <MessageSquare className="w-4 h-4" /> Reclamar
      </button>
    </div>
  </div>
);

/* ───────────── TAB NAV ───────────── */
const TabNav = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
  const allTabs = [
    { icon: Home, label: "Home" },
    { icon: Building2, label: "Sobre" },
    { icon: MessageSquare, label: "Reclamações" },
    { icon: Tag, label: "Descontos" },
    { icon: HelpCircle, label: "FAQ" },
    { icon: FileText, label: "Posts" },
    { icon: AlertTriangle, label: "Principais problemas" },
  ];
  return (
    <div className="border-b border-border bg-background sticky top-0 z-10">
      <div className="max-w-[1286px] mx-auto px-4 md:px-6 flex gap-1 overflow-x-auto scrollbar-hide">
        {allTabs.map(({ icon: Icon, label }, idx) => (
          <button key={label} onClick={() => onTabChange(label)}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-3 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === label ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"} ${idx > 2 ? "hidden md:flex" : ""}`}>
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
        <button className="md:hidden flex items-center px-2 py-3 text-muted-foreground"><MoreVertical className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

/* ───────────── TRUST & REPUTATION ───────────── */
const TrustCard = () => (
  <div className="rounded-xl p-4 shadow-sm min-w-[220px] md:min-w-0" style={{ background: '#EDF7E1' }}>
    <p className="text-xs font-medium mb-3" style={{ color: '#5A6872' }}>Amazon existe?</p>
    <div className="flex items-center gap-3 mb-2">
      <img src="/images/seal-ra-verified.png" alt="Verificada" className="w-9 h-9" />
      <p className="font-bold text-[15px]" style={{ color: '#1A2B3D' }}>Empresa verificada</p>
    </div>
    <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }}>Essa empresa é verificada e possui o selo de confiança do Reclame AQUI.</p>
  </div>
);

const ReputationCard = () => (
  <div className="rounded-xl p-4 shadow-sm min-w-[220px] md:min-w-0" style={{ background: '#EDF7E1' }}>
    <p className="text-xs font-medium mb-3" style={{ color: '#5A6872' }}>Qual a reputação de Amazon?</p>
    <div className="flex items-center gap-3 mb-2">
      <img src="/images/reputation-otimo.webp" alt="Ótimo" className="w-11 h-11" />
      <div>
        <p className="text-xs" style={{ color: '#5A6872' }}>Reputação</p>
        <p className="font-extrabold text-base uppercase" style={{ color: '#1A2B3D' }}>ÓTIMO</p>
      </div>
    </div>
    <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }}>O consumidor avaliou o atendimento dessa empresa como ÓTIMO. A nota média nos últimos 6 meses é <strong>8.2/10.</strong></p>
  </div>
);

/* ───────────── PERFORMANCE ───────────── */
const PerformanceCard = ({ content, cv }: { content?: any[]; cv: (key: string, fallback: string) => string }) => {
  const [period, setPeriod] = useState("6 meses");
  const periods = ["6 meses", "12 meses", "2025", "2024", "Geral"];

  const statsByPeriod: Record<string, { icon: string; text: React.ReactNode }[]> = {
    "6 meses": [
      { icon: "/images/icons/bullhorn.svg", text: <>Esta empresa recebeu <strong style={{ color: '#1F69C1' }}>{cv('stat_reclamacoes', '106194')} reclamações.</strong></> },
      { icon: "/images/icons/comment-check.svg", text: <>Respondeu <strong style={{ color: '#1F69C1' }}>{cv('stat_respondidas_pct', '88.4%')} das reclamações</strong> recebidas.</> },
      { icon: "/images/icons/comment-question.svg", text: <>Há <strong style={{ color: '#1F69C1' }}>{cv('stat_aguardando', '10690')} reclamações</strong> aguardando resposta.</> },
      { icon: "/images/icons/star-box.svg", text: <>Há <strong style={{ color: '#1F69C1' }}>{cv('stat_avaliadas', '46196')} reclamações</strong> avaliadas, e a nota média dos consumidores é <strong style={{ color: '#1F69C1' }}>{cv('stat_nota_media', '7.36')}.</strong></> },
      { icon: "/images/icons/handshake.svg", text: <>Dos que avaliaram, <strong style={{ color: '#1F69C1' }}>{cv('stat_voltariam_pct', '80%')} voltariam a fazer negócio.</strong></> },
      { icon: "/images/icons/check-circle.svg", text: <>A empresa resolveu <strong style={{ color: '#1F69C1' }}>{cv('stat_resolvidas_pct', '88%')} das reclamações recebidas.</strong></> },
      { icon: "/images/icons/timer.svg", text: <>O tempo médio de resposta é <strong style={{ color: '#1F69C1' }}>{cv('stat_tempo_resposta', '19 dias e 13 horas')}.</strong></> },
    ],
    "12 meses": [
      { icon: "/images/icons/bullhorn.svg", text: <>Esta empresa recebeu <strong style={{ color: '#1F69C1' }}>184117 reclamações.</strong></> },
      { icon: "/images/icons/comment-check.svg", text: <>Respondeu <strong style={{ color: '#1F69C1' }}>91.7% das reclamações</strong> recebidas.</> },
      { icon: "/images/icons/comment-question.svg", text: <>Há <strong style={{ color: '#1F69C1' }}>12658 reclamações</strong> aguardando resposta.</> },
      { icon: "/images/icons/star-box.svg", text: <>Há <strong style={{ color: '#1F69C1' }}>89336 reclamações</strong> avaliadas, e a nota média dos consumidores é <strong style={{ color: '#1F69C1' }}>7.52.</strong></> },
      { icon: "/images/icons/handshake.svg", text: <>Dos que avaliaram, <strong style={{ color: '#1F69C1' }}>81.4% voltariam a fazer negócio.</strong></> },
      { icon: "/images/icons/check-circle.svg", text: <>A empresa resolveu <strong style={{ color: '#1F69C1' }}>88.7% das reclamações recebidas.</strong></> },
      { icon: "/images/icons/timer.svg", text: <>O tempo médio de resposta é <strong style={{ color: '#1F69C1' }}>17 dias.</strong></> },
    ],
    "2025": [
      { icon: "/images/icons/bullhorn.svg", text: <>Esta empresa recebeu <strong style={{ color: '#1F69C1' }}>17893 reclamações.</strong></> },
      { icon: "/images/icons/comment-check.svg", text: <>Respondeu <strong style={{ color: '#1F69C1' }}>85.3% das reclamações</strong> recebidas.</> },
      { icon: "/images/icons/comment-question.svg", text: <>Há <strong style={{ color: '#1F69C1' }}>2518 reclamações</strong> aguardando resposta.</> },
      { icon: "/images/icons/star-box.svg", text: <>Há <strong style={{ color: '#1F69C1' }}>5214 reclamações</strong> avaliadas, e a nota média dos consumidores é <strong style={{ color: '#1F69C1' }}>7.18.</strong></> },
      { icon: "/images/icons/handshake.svg", text: <>Dos que avaliaram, <strong style={{ color: '#1F69C1' }}>78.5% voltariam a fazer negócio.</strong></> },
      { icon: "/images/icons/check-circle.svg", text: <>A empresa resolveu <strong style={{ color: '#1F69C1' }}>86.2% das reclamações recebidas.</strong></> },
      { icon: "/images/icons/timer.svg", text: <>O tempo médio de resposta é <strong style={{ color: '#1F69C1' }}>15 dias.</strong></> },
    ],
    "2024": [
      { icon: "/images/icons/bullhorn.svg", text: <>Esta empresa recebeu <strong style={{ color: '#1F69C1' }}>203542 reclamações.</strong></> },
      { icon: "/images/icons/comment-check.svg", text: <>Respondeu <strong style={{ color: '#1F69C1' }}>92.1% das reclamações</strong> recebidas.</> },
      { icon: "/images/icons/comment-question.svg", text: <>Há <strong style={{ color: '#1F69C1' }}>8247 reclamações</strong> aguardando resposta.</> },
      { icon: "/images/icons/star-box.svg", text: <>Há <strong style={{ color: '#1F69C1' }}>102847 reclamações</strong> avaliadas, e a nota média dos consumidores é <strong style={{ color: '#1F69C1' }}>7.64.</strong></> },
      { icon: "/images/icons/handshake.svg", text: <>Dos que avaliaram, <strong style={{ color: '#1F69C1' }}>82.3% voltariam a fazer negócio.</strong></> },
      { icon: "/images/icons/check-circle.svg", text: <>A empresa resolveu <strong style={{ color: '#1F69C1' }}>89.5% das reclamações recebidas.</strong></> },
      { icon: "/images/icons/timer.svg", text: <>O tempo médio de resposta é <strong style={{ color: '#1F69C1' }}>18 dias.</strong></> },
    ],
    "Geral": [
      { icon: "/images/icons/bullhorn.svg", text: <>Esta empresa recebeu <strong style={{ color: '#1F69C1' }}>1247832 reclamações.</strong></> },
      { icon: "/images/icons/comment-check.svg", text: <>Respondeu <strong style={{ color: '#1F69C1' }}>89.4% das reclamações</strong> recebidas.</> },
      { icon: "/images/icons/comment-question.svg", text: <>Há <strong style={{ color: '#1F69C1' }}>45219 reclamações</strong> aguardando resposta.</> },
      { icon: "/images/icons/star-box.svg", text: <>Há <strong style={{ color: '#1F69C1' }}>587423 reclamações</strong> avaliadas, e a nota média dos consumidores é <strong style={{ color: '#1F69C1' }}>7.38.</strong></> },
      { icon: "/images/icons/handshake.svg", text: <>Dos que avaliaram, <strong style={{ color: '#1F69C1' }}>79.8% voltariam a fazer negócio.</strong></> },
      { icon: "/images/icons/check-circle.svg", text: <>A empresa resolveu <strong style={{ color: '#1F69C1' }}>87.1% das reclamações recebidas.</strong></> },
      { icon: "/images/icons/timer.svg", text: <>O tempo médio de resposta é <strong style={{ color: '#1F69C1' }}>20 dias.</strong></> },
    ],
  };

  const stats = statsByPeriod[period] || statsByPeriod["6 meses"];
  const periodDates: Record<string, string> = {
    "6 meses": "01/08/2025 a 31/01/2026",
    "12 meses": "01/02/2025 a 31/01/2026",
    "2025": "01/01/2025 a 31/12/2025",
    "2024": "01/01/2024 a 31/12/2024",
    "Geral": "Todo o período",
  };

  return (
    <div className="bg-background rounded-xl border border-border p-5">
      <h3 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>Desempenho de {cv('company_name', 'Amazon')}</h3>
      <div className="flex gap-4 border-b border-border mb-5">
        {periods.map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`pb-2 text-[13px] font-semibold border-b-2 transition-colors ${period === p ? "border-[#2B6CB0] text-[#2B6CB0]" : "border-transparent text-[#8A9BAE] hover:text-[#5A6872]"}`}>
            {p}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        {stats.map((s, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-none" style={{ backgroundColor: '#D4EDDA' }}>
              <img src={s.icon} alt="" className="w-5 h-5" />
            </div>
            <p className="text-[13px] leading-relaxed pt-0.5" style={{ color: '#3D4F5F' }}>{s.text}</p>
          </div>
        ))}
      </div>
      <p className="text-xs mt-5 pt-4 border-t border-border" style={{ color: '#8A9BAE' }}>Os dados correspondem ao período de {periodDates[period]}</p>
      <a href="#" className="text-xs font-bold mt-2 inline-block" style={{ color: '#2B6CB0' }}>Entenda como calculamos a reputação</a>
    </div>
  );
};

/* ───────────── EVOLUÇÃO ───────────── */
const EvolutionCard = ({ companyName }: { companyName?: string }) => (
  <div className="bg-background rounded-xl border border-border p-4 mt-4">
    <div className="flex items-center justify-between">
      <h3 className="text-[15px] font-bold" style={{ color: '#1A2B3D' }}>Evolução</h3>
      <img src="/images/icons/chevron-down-official.svg" alt="" className="w-5 h-5" style={{ opacity: 0.5 }} />
    </div>
    <div className="flex items-center gap-3 mt-3">
      <img src="/images/icons/chart-trending.svg" alt="" className="w-5 h-5 flex-none" />
      <p className="text-[13px]" style={{ color: '#5A6872' }}>Confira a evolução de {companyName || 'Amazon'} nos últimos 12 meses</p>
    </div>
  </div>
);

/* ───────────── VISITED ALSO (carrossel slick-style) ───────────── */
const VisitedAlso = () => {
  const companies = [
    { name: "Mercado Livre", logo: "/images/mercado-livre-logo.png", score: "7.6", repImg: "/images/icons/rep-otimo.webp" },
    { name: "Total Express", logo: "/images/total-express-logo.jpg", score: "6.7", repImg: "/images/icons/rep-regular.png" },
    { name: "Shopee", logo: "/images/shopee-logo.png", score: "7.0", repImg: "/images/icons/rep-otimo.webp" },
    { name: "Samsung Oficial", logo: "/images/samsung-logo.png", score: "--", repImg: "/images/icons/rep-nao-recomendada.png" },
    { name: "Magazine Luiza", logo: "/images/magalu-logo.png", score: "8.3", repImg: "/images/icons/rep-otimo.webp" },
  ];

  const itemsPerPage = { mobile: 2, desktop: 2 };
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate visible items based on screen (we'll use mobile=2, desktop=3)
  const getPerPage = () => (typeof window !== 'undefined' && window.innerWidth >= 768 ? itemsPerPage.desktop : itemsPerPage.mobile);
  const [perPage, setPerPage] = useState(getPerPage());

  // Update perPage on resize
  useEffect(() => {
    const handler = () => setPerPage(getPerPage());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const totalDots = Math.ceil(companies.length / perPage);
  const currentDot = Math.floor(currentIndex / perPage);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex + perPage >= companies.length;

  const prev = () => setCurrentIndex(i => Math.max(0, i - perPage));
  const next = () => setCurrentIndex(i => Math.min(companies.length - perPage, i + perPage));
  const goToDot = (dot: number) => setCurrentIndex(Math.min(dot * perPage, companies.length - perPage));

  const visibleCompanies = companies.slice(currentIndex, currentIndex + perPage);

  const CompanyCard = ({ c }: { c: typeof companies[0] }) => (
    <a href="#" className="block flex-1 min-w-0" style={{ maxWidth: `${100 / perPage}%` }}>
      <div className="bg-background rounded-2xl px-3 py-5 text-center mx-1.5 h-full" style={{ border: '1px solid #E8ECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="w-[72px] h-[72px] mx-auto mb-3 rounded-full overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
          <img src={c.logo} alt={c.name} className="w-full h-full object-cover" />
        </div>
        <p className="text-[13px] font-semibold truncate px-1" style={{ color: '#1A2B3D' }}>{c.name}</p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <img src={c.repImg} alt="Reputação" className="w-[27px] h-[27px] object-contain" />
          <span className="text-[22px] font-bold leading-none" style={{ color: '#1A2B3D' }}>{c.score}</span>
          <span className="text-xs" style={{ color: '#8A9BAE' }}>/10</span>
        </div>
      </div>
    </a>
  );

  return (
    <div className="mt-8">
      <h2 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>Quem visitou também visitou</h2>
      <div className="relative">
        {/* Seta Prev */}
        <button
          onClick={prev}
          disabled={isFirst}
          className="absolute left-[-16px] top-[calc(50%-24px)] z-10 w-9 h-9 rounded-full bg-background flex items-center justify-center transition-opacity"
          style={{
            border: '1px solid #E0E4E8',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            opacity: isFirst ? 0.35 : 1,
            cursor: isFirst ? 'default' : 'pointer',
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#5A6872"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
        </button>

        {/* Cards */}
        <div className="flex mx-2">
          {visibleCompanies.map(c => <CompanyCard key={c.name} c={c} />)}
        </div>

        {/* Seta Next */}
        <button
          onClick={next}
          disabled={isLast}
          className="absolute right-[-16px] top-[calc(50%-24px)] z-10 w-9 h-9 rounded-full bg-background flex items-center justify-center transition-opacity"
          style={{
            border: '1px solid #E0E4E8',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            opacity: isLast ? 0.35 : 1,
            cursor: isLast ? 'default' : 'pointer',
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#5A6872"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
        </button>
      </div>

      {/* Dots de paginação */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalDots }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToDot(i)}
            className="w-2.5 h-2.5 rounded-full transition-colors"
            style={{ backgroundColor: i === currentDot ? '#1B8B4F' : '#D1D5DB' }}
          />
        ))}
      </div>
    </div>
  );
};

/* ───────────── COMPLAINTS (com reações coloridas e badge) ───────────── */
const ComplaintsSection = ({ companyName }: { companyName?: string }) => {
  const [tab, setTab] = useState("Respondidas");
  const tabs = ["Últimas", "Não respondidas", "Respondidas", "Avaliadas"];
  const complaints = [
    { title: "Atraso na entrega de notebook comprado via pix na Amazon", desc: "Fiz a compra via pix de um notebook, na empresa amazon, no dia 23/12/2025, com prazo de entrega para o dia 05/01/2026. Além de não ter sido entregue o produto, não consta em nenhum campo uma garantia de entrega...", time: "Há 1 hora" },
    { title: "Site em loop impede a geração do código de pré-envio para devolução.", desc: "O site está em loop, toda vez que abro a parte de devolução ele não encaminha para geração de código do pré-envio.", time: "Há 2 horas" },
  ];
  return (
    <div className="mt-8">
      <h2 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>O que estão falando sobre {companyName || 'Amazon'}</h2>
      <div className="bg-background rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
        <div className="px-4 pt-4">
          <p className="text-sm font-bold mb-0" style={{ color: '#1A2B3D' }}>Reclamações</p>
        </div>
        {/* Tabs underline style */}
        <div className="flex px-4 border-b" style={{ borderColor: '#E8ECF0' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${tab === t ? "border-[#2B6CB0] text-[#2B6CB0] font-semibold" : "border-transparent text-[#8A9BAE]"}`}>
              {t}
            </button>
          ))}
        </div>
        {/* Complaint items */}
        <div className="divide-y" style={{ borderColor: '#E8ECF0' }}>
          {complaints.map((c, i) => (
            <div key={i} className="px-4 py-5">
              <h4 className="text-sm font-bold leading-snug mb-2" style={{ color: '#2B6CB0' }}>{c.title}</h4>
              <p className="text-[13px] leading-relaxed mb-4" style={{ color: '#5A6872' }}>{c.desc}</p>
              {/* Reações - ícones coloridos como no print */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg cursor-pointer">👍</span>
                <span className="text-lg cursor-pointer">👎</span>
                <span className="text-lg cursor-pointer">😐</span>
                <span className="text-xs ml-1" style={{ color: '#8A9BAE' }}>deixe sua reação</span>
              </div>
              {/* Badge Respondida */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: '#38A169' }}>
                  😊 Respondida
                </span>
                <span className="text-xs" style={{ color: '#8A9BAE' }}>{c.time}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Footer links */}
        <div className="py-4 text-center space-y-2" style={{ borderTop: '1px solid #E8ECF0' }}>
          <Link to="/reclamacoes" className="text-sm font-semibold block" style={{ color: '#2B6CB0' }}>Ler mais</Link>
          <Link to="/reclamacoes" className="text-sm font-bold block" style={{ color: '#2B6CB0' }}>Ver todas as reclamações</Link>
        </div>
      </div>
    </div>
  );
};

/* ───────────── FAQ (header azul escuro) ───────────── */
const FAQSection = () => {
  const faqs = [
    { title: "Entrega Atrasada", desc: "A maioria dos pacotes chega a tempo. Às vezes, os pedidos são entregues após a data estimada de entrega. Possíveis razões para o atraso na entrega inc..." },
    { title: "Quando vou receber meu reembolso?", desc: "Quando você devolve um produto enviado pela Amazon, o reembolso é emitido de acordo com a forma de pagamento usada no momento da compra. O..." },
    { title: "Cobranças desconhecidas", desc: "Confira a seguir alguns motivos comuns para cobranças desconhecidas: Um pedido foi feito por um membro da família, amigo ou colega de trabalho com..." },
    { title: "Cancelar sua assinatura Prime", desc: "Você pode cancelar sua assinatura em Gerenciar sua assinatura Prime. Importante lembrar que: \\- Você pode estar qualificado para um reembolso se seus..." },
    { title: "Como faço para devolver meu pedido?", desc: "Para pedidos vendidos e enviados pela Amazon.com.br, acesse os Seus Pedidos. 1. Acesse o pedido que deseja devolver. 2. Clique em \"Devolver..." },
  ];
  return (
    <div className="mt-8">
      <div className="bg-background rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
        {/* Header azul escuro igual ao print */}
        <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: '#2B6CB0' }}>
          <div>
            <h2 className="text-[15px] font-bold text-white flex items-center gap-1.5">
              Precisa de ajuda? <Info className="w-4 h-4 opacity-60" />
            </h2>
            <p className="text-xs text-white/70 mt-0.5">Veja se temos a resposta para seu problema</p>
          </div>
          <img src="/images/icons/chevron-up.svg" alt="" className="w-5 h-5 opacity-60 invert" />
        </div>
        <div className="divide-y" style={{ borderColor: '#E8ECF0' }}>
          {faqs.map((f, i) => (
            <div key={i} className="px-5 py-4 cursor-pointer hover:bg-[#F7F9FB] transition-colors">
              <h4 className="text-sm font-bold" style={{ color: '#1A2B3D' }}>{f.title}</h4>
              <p className="text-[13px] mt-1.5 line-clamp-2 leading-relaxed" style={{ color: '#5A6872' }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="py-3 text-center" style={{ borderTop: '1px solid #E8ECF0' }}>
          <a href="#" className="text-sm font-semibold" style={{ color: '#2B6CB0' }}>Ver mais conteúdos</a>
        </div>
      </div>
    </div>
  );
};

/* ───────────── PROBLEMAS (com categorias e dropdowns) ───────────── */
const ProblemsSection = ({ companyName }: { companyName?: string }) => {
  const problems = [
    { category: "Tipos de problemas", pct: "23.4%", label: "Produto não recebido" },
    { category: "Produtos e Serviços", pct: "15.1%", label: "Produtos" },
    { category: "Categorias", pct: "11.79%", label: "Não encontrei meu problema" },
  ];
  return (
    <div className="mt-8">
      <h2 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>Saiba quais são os principais problemas de {companyName || 'Amazon'}</h2>
      <div className="bg-background rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
        <div className="px-5 pt-4 pb-2">
          <h3 className="text-sm font-bold" style={{ color: '#1A2B3D' }}>Principais problemas</h3>
        </div>
        <div className="divide-y" style={{ borderColor: '#E8ECF0' }}>
          {problems.map((p, i) => (
            <div key={i} className="px-5 py-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs" style={{ color: '#8A9BAE' }}>{p.category}</span>
                <img src="/images/icons/chevron-down-official.svg" alt="" className="w-4 h-4" style={{ opacity: 0.5 }} />
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold" style={{ color: '#2B6CB0' }}>{p.pct}</span>
                <span className="text-sm font-semibold" style={{ color: '#2B6CB0' }}>{p.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="py-3 text-center" style={{ borderTop: '1px solid #E8ECF0' }}>
          <a href="#" className="text-sm font-semibold" style={{ color: '#5A6872' }}>Ver tudo</a>
        </div>
      </div>
      <p className="text-xs text-center mt-3" style={{ color: '#8A9BAE' }}>As reclamações apresentadas são de até 3 anos registradas na aba geral.</p>
    </div>
  );
};

/* ───────────── SIDEBAR (botões azul claro, layout fiel) ───────────── */
const SidebarSection = ({ cv }: { cv: (key: string, fallback: string) => string }) => (
  <aside className="space-y-5">
    <div>
      <h3 className="text-[17px] font-bold mb-3 lg:hidden" style={{ color: '#1A2B3D' }}>Veja mais informações sobre {cv('company_name', 'Amazon')}</h3>
      <div className="rounded-xl p-4 bg-background" style={{ border: '1px solid #E8ECF0' }}>
        <h4 className="font-bold text-sm mb-2" style={{ color: '#1A2B3D' }}>Sobre</h4>
        <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }}>{cv('about_text', 'A Amazon.com.br oferece milhares de ofertas e produtos em diversas categorias.')}</p>
        <p className="text-[13px]" style={{ color: '#1A2B3D' }}><strong>CNPJ:</strong> <span style={{ color: '#2B6CB0' }}>{cv('cnpj', '15.436.940/0001-03')}</span></p>
        <p className="text-xs mt-1" style={{ color: '#8A9BAE' }}>Informações cadastradas pela empresa</p>
        <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#8A9BAE' }}>
          <img src="/images/icons/calendar-star.svg" alt="" className="w-4 h-4" /> Cadastrada há 20 anos
        </div>
      </div>
    </div>

    <div className="rounded-xl p-4 bg-background" style={{ border: '1px solid #E8ECF0' }}>
      <h4 className="font-bold text-sm mb-3" style={{ color: '#1A2B3D' }}>Contatos da empresa</h4>
      <p className="text-xs mb-2" style={{ color: '#8A9BAE' }}>Site</p>
      {/* Botões azul claro igual ao print */}
      <a href={cv('website_url', 'https://www.amazon.com.br')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium mb-2" style={{ backgroundColor: '#E5EEFB', color: '#2B6CB0' }}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#2B6CB0"><path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg> {cv('website_url', 'amazon.com.br').replace('https://', '').replace('www.', '')}
      </a>
      <a href="#" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: '#E5EEFB', color: '#2B6CB0' }}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#2B6CB0"><path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg> Ir para o atendimento
      </a>
      <div className="flex gap-5 mt-4 justify-center md:justify-start">
        <a href="#"><img src="/images/social-facebook.png" alt="Facebook" className="w-7 h-7" /></a>
        <a href="#"><img src="/images/social-instagram.png" alt="Instagram" className="w-7 h-7" /></a>
        <a href="#"><img src="/images/social-x.png" alt="X" className="w-7 h-7" /></a>
      </div>
    </div>

    {/* Posição card */}
    <div className="rounded-xl p-4 bg-background" style={{ border: '1px solid #E8ECF0' }}>
      <p className="text-xs mb-2" style={{ color: '#8A9BAE' }}>Qual a posição de {cv('company_name', 'Amazon')} ?</p>
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold" style={{ color: '#1A2B3D' }}>{cv('company_position', '12º')}</span>
        <span className="text-sm font-bold" style={{ color: '#1A2B3D' }}>{cv('company_position_label', 'Melhor empresa')}</span>
      </div>
      <p className="text-xs mt-1" style={{ color: '#8A9BAE' }}>{cv('company_position_category', 'na lista de melhores em Marketplaces')}</p>
      <a href="#" className="text-xs font-bold mt-2 inline-flex items-center gap-1" style={{ color: '#2B6CB0' }}>
        Confira a classificação <img src="/images/icons/chevron-right-circle.svg" alt="" className="w-4 h-4" />
      </a>
    </div>

    {/* Marcas */}
    <div>
      <h4 className="text-sm font-bold mb-2" style={{ color: '#1A2B3D' }}>Marcas {cv('company_name', 'Amazon')}</h4>
      <div className="flex gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full" style={{ border: '1px solid #E8ECF0', color: '#1A2B3D', backgroundColor: '#F7F9FB' }}>
          <span className="w-5 h-5 rounded-full bg-[#1A2B3D] text-white text-[10px] font-bold flex items-center justify-center">A</span> Alexa
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full" style={{ border: '1px solid #E8ECF0', color: '#1A2B3D', backgroundColor: '#F7F9FB' }}>
          <span className="w-5 h-5 rounded-full bg-[#1A2B3D] text-white text-[10px] font-bold flex items-center justify-center">K</span> Kindle
        </span>
      </div>
    </div>

    <PostCard title="O que fazer se a entrega está atrasada?" image="/images/post-1.jpg" />
    <PostCard title="Reembolsos" image="/images/post-2.jpg" />
  </aside>
);

/* ───────────── POST CARD (botão sobreposto na imagem) ───────────── */
const PostCard = ({ title, image }: { title: string; image: string }) => (
  <div className="rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow bg-background" style={{ border: '1px solid #E8ECF0' }}>
    <div className="relative">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="absolute bottom-3 left-3">
        <a href="#" className="inline-flex items-center gap-1 px-4 py-2 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#2B6CB0' }}>
          Saiba mais <img src="/images/icons/chevron-right.svg" alt="" className="w-3 h-3 invert" />
        </a>
      </div>
    </div>
    <div className="p-4">
      <h4 className="text-sm font-bold mb-3" style={{ color: '#1A2B3D' }}>{title}</h4>
      <div className="flex items-center gap-5 border-t pt-3" style={{ borderColor: '#E8ECF0' }}>
        <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#5A6872' }}><ThumbsUp className="w-4 h-4" /> Curtir</button>
        <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#5A6872' }}><img src="/images/icons/share.svg" alt="" className="w-4 h-4" /> Compartilhar</button>
      </div>
    </div>
  </div>
);

/* ───────────── FOOTER ───────────── */
const Footer = () => {
  const consumerLinks = [
    { label: "Faça uma reclamação", href: "#" },
    { label: "Minhas Reclamações", href: "#" },
    { label: "Compare empresas", href: "#" },
    { label: "Melhores empresas", href: "#" },
    { label: "Buscar descontos", href: "#" },
    { label: "Rankings", href: "#" },
    { label: "Cadastre uma empresa", href: "#" },
  ];
  const companyLinks = [
    { label: "Por que estar AQUI?", href: "#" },
    { label: "Cadastrar empresa", href: "#" },
    { label: "Responder reclamações", href: "#" },
    { label: "Meus Produtos Reclame AQUI", href: "#" },
  ];
  const aboutLinks = [
    { label: "Institucional", href: "#" },
    { label: "Fale conosco", href: "#" },
    { label: "RA Educa", href: "#" },
    { label: "Conheça a extensão", href: "#" },
    { label: "Prêmio", href: "#" },
    { label: "Blog RA", href: "#" },
  ];
  const helpLinks = [
    { label: "Quero trocar minha senha", href: "#" },
    { label: "Não encontrei uma empresa", href: "#" },
    { label: "Reclamei e ainda não responderam", href: "#" },
    { label: "Quero cadastrar uma empresa", href: "#" },
    { label: "Fale com o Reclame AQUI", href: "#" },
  ];

  const FooterColumn = ({ title, links, cta }: { title: string; links: { label: string; href: string }[]; cta?: { label: string; href: string; red?: boolean } }) => (
    <div className="flex flex-col w-full">
      <h2 className="text-sm font-bold mb-3" style={{ color: '#1A2B3D' }}>{title}</h2>
      {cta && (
        <a href={cta.href} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold mb-3 w-fit" style={{ backgroundColor: cta.red ? '#D11F26' : '#1B8B4F', color: '#fff' }}>
          {cta.label}
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
        </a>
      )}
      {links.map((link, i) => (
        <a key={i} href={link.href} className="text-sm mt-2 hover:underline" style={{ color: '#5A6872' }}>{link.label}</a>
      ))}
    </div>
  );

  return (
    <footer className="mt-12" style={{ backgroundColor: '#fff', borderTop: '1px solid #E8ECF0' }}>
      {/* Desktop footer links */}
      <section className="py-10 hidden md:block">
        <div className="max-w-[1184px] mx-auto w-full flex flex-row justify-center gap-12 px-4">
          <div className="w-1/4">
            <FooterColumn title="Para consumidor" links={consumerLinks} cta={{ label: "Área do consumidor", href: "#" }} />
            <div className="mt-6 flex flex-col gap-3">
              <a href="#" target="_blank" rel="noreferrer">
                <img width="135" height="40" src="https://play.google.com/intl/en_us/badges/static/images/badges/pt-br_badge_web_generic.png" alt="Disponível no Google Play" className="h-[40px] w-auto object-contain" />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <img width="135" height="40" src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Baixar na App Store" className="h-[40px] w-auto object-contain" />
              </a>
            </div>
          </div>
          <div className="w-1/4">
            <FooterColumn title="Para empresas" links={companyLinks} cta={{ label: "Área da empresa", href: "#" }} />
            <p className="mt-6 text-sm" style={{ color: '#5A6872' }}>
              Entre em sua área restrita para administrar suas respostas aos consumidores,{" "}
              <a href="#" className="underline font-semibold" style={{ color: '#2B6CB0' }}>acesse aqui</a>
            </p>
          </div>
          <div className="w-1/4">
            <FooterColumn title="Sobre o RA" links={aboutLinks} />
          </div>
          <div className="w-1/4">
            <FooterColumn title="Central de ajuda" links={helpLinks} cta={{ label: "Reclamar de uma empresa", href: "#", red: true }} />
          </div>
        </div>
      </section>

      {/* Mobile footer links */}
      <section className="flex md:hidden flex-col pl-4 py-6 text-sm" style={{ color: '#5A6872' }}>
        {[...consumerLinks.slice(0, 3), { label: "Melhores empresas", href: "#" }, { label: "Buscar descontos", href: "#" }, { label: "Ranking", href: "#" }, { label: "Cadastre uma empresa", href: "#" }, { label: "Por que estar AQUI?", href: "#" }, { label: "Tire suas dúvidas sobre o Reclame AQUI", href: "#" }].map((link, i) => (
          <a key={i} href={link.href} className="my-2">{link.label}</a>
        ))}
      </section>

      {/* Bottom bar */}
      <section className="py-8 mt-0 md:mt-0" style={{ borderTop: '1px solid #E8ECF0' }}>
        <div className="max-w-[1184px] mx-auto w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 px-4">
          <span className="md:hidden text-sm" style={{ color: '#8A9BAE' }}>Siga a gente nas redes sociais</span>

          {/* Social links */}
          <div className="w-full flex justify-center">
            <ul className="mx-auto flex flex-row list-none gap-4">
              {/* Facebook */}
              <li>
                <a href="https://www.facebook.com/ReclameAqui" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-5 h-5" fill="#5A6872"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                </a>
              </li>
              {/* X/Twitter */}
              <li>
                <a href="https://twitter.com/reclameaqui" target="_blank" rel="noopener noreferrer" title="X (Twitter)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5" fill="#5A6872"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                </a>
              </li>
              {/* YouTube */}
              <li>
                <a href="https://www.youtube.com/channel/UCHSTgEYmopZluZ7N4BSGPpw" target="_blank" rel="noopener noreferrer" title="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5" fill="#5A6872"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>
                </a>
              </li>
              {/* Instagram */}
              <li>
                <a href="https://www.instagram.com/reclameaqui/" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5" fill="#5A6872"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                </a>
              </li>
              {/* LinkedIn */}
              <li>
                <a href="https://www.linkedin.com/company/reclame-aqui/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5" fill="#5A6872"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Logo RA */}
          <div className="w-full flex justify-center">
            <a href="#" className="mx-auto flex items-center" title="Reclame Aqui - Início">
              <svg viewBox="0 0 257 41" xmlns="http://www.w3.org/2000/svg" className="h-8 opacity-40">
                <g fill="none">
                  <path d="M14.463 9.812l-1.45 7.791c1.313-.028 2.326-.353 3.04-.974.714-.62 1.195-1.594 1.443-2.921.241-1.3.138-2.274-.308-2.922-.445-.652-1.228-.974-2.347-.974h-.378zM0 35.717l6.083-32.69h11.084c3.75 0 6.534.903 8.357 2.709 1.822 1.806 2.444 4.262 1.866 7.367-.355 1.91-1.142 3.54-2.363 4.893-1.22 1.349-2.874 2.428-4.961 3.233l4.133 14.488h-10.21l-1.992-12.652L9.64 35.717H0zm35.448-14.353h5.175c.241-1.298.206-2.272-.106-2.92-.313-.652-.902-.976-1.768-.976-.678 0-1.285.318-1.82.952-.535.634-1.03 1.615-1.48 2.944M46.77 27.7c-.847 2.687-2.34 4.803-4.479 6.348-2.138 1.545-4.656 2.317-7.555 2.317-3.403 0-5.832-1.04-7.29-3.123-1.454-2.085-1.824-5.049-1.107-8.902.72-3.864 2.208-6.863 4.464-8.998 2.256-2.135 5.054-3.202 8.394-3.202 3.64 0 6.18.948 7.624 2.843 1.442 1.895 1.808 4.754 1.097 8.576-.083.445-.15.788-.201 1.018-.051.233-.11.443-.178.637H34.731l-.058.314c-.314 1.688-.338 2.897-.072 3.627.265.732.855 1.097 1.768 1.097.678 0 1.264-.209 1.76-.625.495-.42.918-1.062 1.268-1.927h7.373m15.116 7.658a9.337 9.337 0 01-2.185.76c-.764.165-1.61.247-2.54.247-3.119 0-5.375-1.077-6.77-3.235-1.395-2.156-1.742-5.115-1.043-8.877.687-3.688 2.16-6.629 4.42-8.822 2.26-2.193 4.924-3.29 7.997-3.29.85 0 1.629.074 2.333.221.705.151 1.35.383 1.938.694l-1.308 7.031a2.887 2.887 0 00-.85-.392 3.832 3.832 0 00-.992-.123c-.914 0-1.72.42-2.42 1.254-.698.836-1.182 1.98-1.451 3.427-.273 1.462-.227 2.562.141 3.303.366.738 1.047 1.107 2.038 1.107.283 0 .595-.042.933-.123.338-.084.702-.2 1.092-.347l-1.333 7.165m2.698.359L71.222.049h8.767l-6.637 35.668h-8.768m23-11.464c-.303 1.629-.353 2.851-.151 3.67.201.823.656 1.232 1.366 1.232.71 0 1.327-.42 1.854-1.266.527-.84.938-2.055 1.233-3.636.3-1.612.342-2.842.129-3.686-.212-.84-.674-1.265-1.382-1.265-.694 0-1.3.42-1.817 1.258-.519.834-.928 2.064-1.232 3.693m2.357 11.464l.47-2.531c-1.072 1.103-2.115 1.91-3.131 2.419a6.993 6.993 0 01-3.155.76c-2.41 0-4.1-1.063-5.065-3.19-.968-2.126-1.095-5.1-.384-8.922.717-3.85 1.945-6.834 3.684-8.946 1.74-2.11 3.832-3.167 6.273-3.167 1.104 0 2.065.25 2.886.75.82.499 1.563 1.294 2.227 2.384l.462-2.486h8.767l-4.266 22.929H89.94m11.982 0l4.267-22.929h8.413l-.635 3.404c1.064-1.314 2.21-2.285 3.437-2.912 1.228-.627 2.582-.938 4.063-.938 1.386 0 2.473.315 3.261.952.788.634 1.266 1.601 1.434 2.898.922-1.314 1.969-2.285 3.141-2.912 1.172-.627 2.507-.938 4.004-.938 1.843 0 3.152.522 3.927 1.565.773 1.048.975 2.568.602 4.569l-3.209 17.24h-8.766l2.483-13.345c.133-.714.099-1.245-.106-1.587-.204-.345-.582-.518-1.133-.518-.505 0-.936.2-1.293.595-.356.396-.6.945-.73 1.645l-2.459 13.21h-8.72l2.484-13.345c.133-.714.098-1.245-.107-1.587-.203-.345-.581-.518-1.132-.518-.52 0-.963.2-1.328.595-.365.396-.612.945-.743 1.645l-2.458 13.21h-8.697m46.176-14.352h5.175c.242-1.298.207-2.272-.105-2.92-.312-.652-.903-.976-1.768-.976-.678 0-1.285.318-1.82.952-.536.634-1.03 1.615-1.482 2.944M159.42 27.7c-.847 2.687-2.34 4.803-4.478 6.348s-4.657 2.317-7.556 2.317c-3.403 0-5.833-1.04-7.288-3.123-1.456-2.085-1.826-5.049-1.108-8.902.72-3.864 2.206-6.863 4.463-8.998 2.256-2.135 5.054-3.202 8.394-3.202 3.64 0 6.18.948 7.624 2.843 1.443 1.895 1.81 4.754 1.098 8.576-.084.445-.151.788-.201 1.018a5.42 5.42 0 01-.179.637h-12.808l-.058.314c-.314 1.688-.338 2.897-.072 3.627.265.732.855 1.097 1.77 1.097.677 0 1.263-.209 1.757-.625.496-.42.919-1.062 1.269-1.927h7.373" fill="#90B823" />
                  <path d="M171.845 24.298h3.828l.317-12.114-4.145 12.114zm-13.207 11.419l13.645-32.69h10.847l1.454 32.69h-9.381l.163-4.815h-5.695l-1.629 4.815h-9.404zm39.164-16.547c-.632 3.39-.827 5.71-.587 6.964.239 1.254.95 1.881 2.13 1.881 1.166 0 2.096-.617 2.79-1.848.693-1.231 1.36-3.564 1.999-6.998.64-3.433.84-5.766.608-7.006-.236-1.24-.936-1.86-2.101-1.86-1.181 0-2.125.628-2.83 1.88-.707 1.255-1.377 3.585-2.01 6.986M201.75 41l-2.839-4.679c-.11 0-.28.007-.512.021a9.863 9.863 0 01-.512.023c-4.144 0-7.075-1.476-8.794-4.433-1.717-2.954-2.074-7.137-1.07-12.538 1.008-5.402 2.916-9.59 5.73-12.56 2.814-2.97 6.268-4.456 10.365-4.456 4.08 0 6.966 1.48 8.66 4.444 1.694 2.962 2.037 7.154 1.028 12.572-.58 3.121-1.462 5.83-2.647 8.127-1.183 2.298-2.695 4.239-4.534 5.823l3.48 4.163L201.748 41m13.818-16.972l3.908-21.002h9.618l-4.07 21.876c-.18.955-.13 1.66.149 2.115.277.455.795.683 1.551.683.77 0 1.38-.228 1.828-.683.447-.454.76-1.16.937-2.115l4.072-21.876h9.665l-3.908 21.002c-.795 4.27-2.333 7.392-4.615 9.372-2.283 1.977-5.48 2.965-9.592 2.965-4.096 0-6.909-.988-8.44-2.965-1.53-1.98-1.898-5.101-1.103-9.372m25.544 11.689l6.083-32.69h9.642l-6.082 32.69h-9.643" fill="#007535" />
                </g>
              </svg>
            </a>
          </div>

          {/* Terms */}
          <div className="w-full flex flex-row justify-center items-center">
            <a href="#" className="text-sm mr-4" style={{ color: '#8A9BAE' }} title="Termos de uso">Termos de uso</a>
            <a href="#" className="text-sm ml-4" style={{ color: '#8A9BAE' }} title="Política de privacidade">Política de privacidade</a>
          </div>
        </div>
      </section>
    </footer>
  );
};

/* ───────────── MAIN PAGE ───────────── */
const Index = () => {
  const { data: content } = useSiteContent();
  const [activeTab, setActiveTab] = useState("Home");
  const cv = (key: string, fallback: string) => {
    if (!content) return fallback;
    const item = content.find((i) => i.content_key === key);
    return item?.content_value ?? fallback;
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Home") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* Helper: which sections to show based on active tab */
  const showAll = activeTab === "Home";
  const showSection = (name: string) => showAll || activeTab === name;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F4F6' }}>
      <Header />
      <div className="relative">
        <div className="w-full h-[105px] md:h-[280px]" style={{ backgroundColor: cv('banner_bg_color', '#EF6509') }}>
          <img src={cv('company_banner', '/images/amazon-banner.jpg')} alt="Banner" className="w-full h-full object-cover max-w-[1920px] mx-auto hidden md:block" />
          <img src={cv('company_banner_mobile', '/images/amazon-banner-mobile.jpg')} alt="Banner" className="w-full h-full object-cover md:hidden" />
        </div>
        <div className="max-w-[1286px] mx-auto px-4 md:px-10 relative">
          <div className="hidden md:flex items-end gap-6 -mt-16">
            <a href="#" className="flex-none w-[188px] h-[188px] rounded-full bg-[#FAFAFA] shadow-md flex items-center justify-center -mt-8 border-4 border-background overflow-hidden">
              <img src={cv('company_logo', '/images/amazon-logo.jpg')} alt="Logo" className="w-[170px] h-[170px] rounded-full object-cover" />
            </a>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">{cv('company_name', 'Amazon')}</h1>
                <img src="/images/seal-ra-verified.png" alt="RA Verificada" className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><img src="/images/icons/store.svg" alt="" className="w-4 h-4" /> {cv('company_category', 'Varejo - Marketplaces')}</span>
                <span className="flex items-center gap-1"><img src="/images/icons/eye.svg" alt="" className="w-4 h-4" /> {cv('company_views', '+ 2.4 milhões de visualizações')}</span>
              </div>
            </div>
            <button className="mb-3 px-6 py-2.5 rounded-md font-semibold text-sm flex items-center gap-2 text-white hover:opacity-90" style={{ backgroundColor: '#D11F26' }}>
              <MessageSquare className="w-4 h-4" /> Reclamar
            </button>
          </div>
          <div className="md:hidden flex flex-col items-center -mt-10">
            <a href="#" className="w-[80px] h-[80px] rounded-full bg-[#FAFAFA] shadow-md flex items-center justify-center border-4 border-background overflow-hidden">
              <img src={cv('company_logo', '/images/amazon-logo.jpg')} alt="Logo" className="w-[72px] h-[72px] rounded-full object-cover" />
            </a>
            <div className="flex items-center gap-1.5 mt-2">
              <h1 className="text-lg font-bold text-foreground">{cv('company_name', 'Amazon')}</h1>
              <img src="/images/seal-ra-verified.png" alt="RA Verificada" className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><img src="/images/icons/store.svg" alt="" className="w-3.5 h-3.5" /> {cv('company_category', 'Varejo - Marketplaces')}</span>
              <span className="flex items-center gap-1"><img src="/images/icons/eye.svg" alt="" className="w-3.5 h-3.5" /> {cv('company_views', '+ 2.4 milhões de visualizações')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 mb-2 md:justify-start justify-center">
            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: '#F1F9E6', color: '#0A213D' }}>
              <img src="/images/reputation-otimo.webp" alt="Ótimo" className="w-[18px] h-[18px]" /> {cv('reputation_label', 'Ótimo')}
            </a>
            <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: '#E5EEFB', color: '#0A213D' }}>
              <img src="/images/seal-ra-verified.png" alt="Verificada" className="w-[18px] h-[18px]" /> Verificada
            </a>
          </div>
          <button className="md:hidden w-full py-3 rounded-md font-semibold text-sm flex items-center justify-center gap-2 text-white mt-2 mb-2" style={{ backgroundColor: '#D11F26' }}>
            <MessageSquare className="w-4 h-4" /> Reclamar
          </button>
        </div>
      </div>
      <TabNav activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="max-w-[1286px] mx-auto px-4 md:px-6 py-6">
        {/* Mobile */}
        <div className="lg:hidden">
          {showSection("Sobre") && (
            <>
              <h2 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>{cv('company_name', 'Amazon')} é confiável?</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex-none w-[75%]">
                  <div className="rounded-xl p-4 shadow-sm min-w-[220px] md:min-w-0" style={{ background: '#EDF7E1' }}>
                    <p className="text-xs font-medium mb-3" style={{ color: '#5A6872' }}>Qual a reputação de {cv('company_name', 'Amazon')}?</p>
                    <div className="flex items-center gap-3 mb-2">
                      <img src="/images/reputation-otimo.webp" alt="Ótimo" className="w-11 h-11" />
                      <div>
                        <p className="text-xs" style={{ color: '#5A6872' }}>Reputação</p>
                        <p className="font-extrabold text-base uppercase" style={{ color: '#1A2B3D' }}>{cv('reputation_label', 'ÓTIMO')}</p>
                      </div>
                    </div>
                    <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }} dangerouslySetInnerHTML={{ __html: cv('reputation_description', '') }} />
                  </div>
                </div>
                <div className="flex-none w-[75%]">
                  <div className="rounded-xl p-4 shadow-sm min-w-[220px] md:min-w-0" style={{ background: '#EDF7E1' }}>
                    <p className="text-xs font-medium mb-3" style={{ color: '#5A6872' }}>{cv('company_name', 'Amazon')} existe?</p>
                    <div className="flex items-center gap-3 mb-2">
                      <img src="/images/seal-ra-verified.png" alt="Verificada" className="w-9 h-9" />
                      <p className="font-bold text-[15px]" style={{ color: '#1A2B3D' }}>Empresa verificada</p>
                    </div>
                    <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }}>{cv('trust_description', 'Essa empresa é verificada e possui o selo de confiança do Reclame AQUI.')}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6"><PerformanceCard content={content} cv={cv} /></div>
              <EvolutionCard companyName={cv('company_name', 'Amazon')} />
            </>
          )}
          {showSection("Sobre") && (
            <div className="mt-6">
              <h3 className="text-[17px] font-bold mb-3" style={{ color: '#1A2B3D' }}>Veja mais informações sobre {cv('company_name', 'Amazon')}</h3>
              <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #E8ECF0' }}>
                <iframe width="100%" height="200" src={cv('youtube_url', 'https://www.youtube.com/embed/MVaaQ8Qu7Iw')} title="Vídeo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
              </div>
            </div>
          )}
          {showSection("Posts") && (
            <div className="mb-4">
              <h3 className="text-[15px] font-bold mb-3" style={{ color: '#1A2B3D' }}>O que {cv('company_name', 'Amazon')} está postando</h3>
              <PostCard title="Proteja-se contra fraudes e golpes por mensagens" image="/images/post-3.jpg" />
              <a href="#" className="text-sm font-bold mt-3 inline-block" style={{ color: '#2B6CB0' }}>Ver todos os posts</a>
            </div>
          )}
          {showSection("Reclamações") && <ComplaintsSection companyName={cv('company_name', 'Amazon')} />}
          {showSection("FAQ") && <FAQSection />}
          {showSection("Principais problemas") && <ProblemsSection companyName={cv('company_name', 'Amazon')} />}
          {showSection("Descontos") && (
            <div className="mt-8">
              <div className="bg-background rounded-xl p-6 text-center" style={{ border: '1px solid #E8ECF0' }}>
                <Tag className="w-10 h-10 mx-auto mb-3" style={{ color: '#2B6CB0' }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1A2B3D' }}>Descontos de {cv('company_name', 'Amazon')}</h3>
                <p className="text-sm mb-4" style={{ color: '#5A6872' }}>Confira cupons e ofertas exclusivas disponíveis para você.</p>
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white" style={{ backgroundColor: '#2B6CB0' }}>Ver descontos</a>
              </div>
            </div>
          )}
          {showAll && <VisitedAlso />}
          {showSection("Sobre") && <div className="mt-6"><SidebarSection cv={cv} /></div>}
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-[280px_1fr_280px] gap-6">
          <div>
            {showSection("Sobre") && (
              <>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#1A2B3D' }}>{cv('company_name', 'Amazon')} é confiável?</h2>
                <div className="space-y-4">
                  <div className="rounded-xl p-4 shadow-sm" style={{ background: '#EDF7E1' }}>
                    <p className="text-xs font-medium mb-3" style={{ color: '#5A6872' }}>{cv('company_name', 'Amazon')} existe?</p>
                    <div className="flex items-center gap-3 mb-2">
                      <img src="/images/seal-ra-verified.png" alt="Verificada" className="w-9 h-9" />
                      <p className="font-bold text-[15px]" style={{ color: '#1A2B3D' }}>Empresa verificada</p>
                    </div>
                    <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }}>{cv('trust_description', 'Essa empresa é verificada e possui o selo de confiança do Reclame AQUI.')}</p>
                  </div>
                  <div className="rounded-xl p-4 shadow-sm" style={{ background: '#EDF7E1' }}>
                    <p className="text-xs font-medium mb-3" style={{ color: '#5A6872' }}>Qual a reputação de {cv('company_name', 'Amazon')}?</p>
                    <div className="flex items-center gap-3 mb-2">
                      <img src="/images/reputation-otimo.webp" alt="Ótimo" className="w-11 h-11" />
                      <div>
                        <p className="text-xs" style={{ color: '#5A6872' }}>Reputação</p>
                        <p className="font-extrabold text-base uppercase" style={{ color: '#1A2B3D' }}>{cv('reputation_label', 'ÓTIMO')}</p>
                      </div>
                    </div>
                    <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }} dangerouslySetInnerHTML={{ __html: cv('reputation_description', '') }} />
                    
                  </div>
                </div>
                <div className="mt-6"><PerformanceCard content={content} cv={cv} /></div>
                <EvolutionCard companyName={cv('company_name', 'Amazon')} />
              </>
            )}
            {showAll && <VisitedAlso />}
          </div>
          <div>
            {showSection("Sobre") && (
              <>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#1A2B3D' }}>Veja mais informações sobre {cv('company_name', 'Amazon')}</h3>
                <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #E8ECF0' }}>
                  <iframe width="100%" height="280" src={cv('youtube_url', 'https://www.youtube.com/embed/MVaaQ8Qu7Iw')} title="Vídeo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
                </div>
              </>
            )}
            {showSection("Posts") && (
              <div className="mb-4">
                <h3 className="text-base font-bold mb-3" style={{ color: '#1A2B3D' }}>O que {cv('company_name', 'Amazon')} está postando</h3>
                <PostCard title="Proteja-se contra fraudes e golpes por mensagens" image="/images/post-3.jpg" />
                <a href="#" className="text-sm font-bold mt-3 inline-block" style={{ color: '#2B6CB0' }}>Ver todos os posts</a>
              </div>
            )}
            {showSection("Reclamações") && <ComplaintsSection companyName={cv('company_name', 'Amazon')} />}
            {showSection("FAQ") && <FAQSection />}
            {showSection("Principais problemas") && <ProblemsSection companyName={cv('company_name', 'Amazon')} />}
            {showSection("Descontos") && (
              <div className="mt-8">
                <div className="bg-background rounded-xl p-6 text-center" style={{ border: '1px solid #E8ECF0' }}>
                  <Tag className="w-10 h-10 mx-auto mb-3" style={{ color: '#2B6CB0' }} />
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#1A2B3D' }}>Descontos de {cv('company_name', 'Amazon')}</h3>
                  <p className="text-sm mb-4" style={{ color: '#5A6872' }}>Confira cupons e ofertas exclusivas disponíveis para você.</p>
                  <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white" style={{ backgroundColor: '#2B6CB0' }}>Ver descontos</a>
                </div>
              </div>
            )}
          </div>
          <div>{showSection("Sobre") && <SidebarSection cv={cv} />}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
