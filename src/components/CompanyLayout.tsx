import { Home, Building2, MessageSquare, Tag, HelpCircle, FileText, AlertTriangle, Eye, ExternalLink, ThumbsUp, MoreVertical, Globe, Info, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSiteContent, useContentValue } from "@/hooks/use-site-content";
import { useReviews } from "@/hooks/use-reviews";
import React from "react";

/* ───────────── HEADER ───────────── */
export const Header = () => (
  <header className="bg-background border-b border-border">
    <div className="max-w-[1286px] mx-auto flex items-center justify-between px-4 md:px-6 py-2">
      <div className="flex items-center gap-2">
        <Link to="/"><img src="/images/logo-25-anos.svg" alt="ReclameAQUI 25 anos" className="w-[110px] md:w-[130px] h-auto" /></Link>
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

/* ───────────── TAB NAV ───────────── */
const tabRoutes: Record<string, string> = {
  "Home": "/",
  "Sobre": "/sobre",
  "Reclamações": "/empresa-reclamacoes",
  "Descontos": "/empresa-descontos",
  "FAQ": "/empresa-faq",
  "Posts": "/empresa-posts",
  "Principais problemas": "/principais-problemas",
};

export const TabNav = () => {
  const location = useLocation();
  const allTabs = [
    { icon: Home, label: "Home" },
    { icon: Building2, label: "Sobre" },
    { icon: MessageSquare, label: "Reclamações" },
    { icon: Tag, label: "Descontos" },
    { icon: HelpCircle, label: "FAQ" },
    { icon: FileText, label: "Posts" },
    { icon: AlertTriangle, label: "Principais problemas" },
  ];

  const activeTab = Object.entries(tabRoutes).find(([, path]) => path === location.pathname)?.[0] || "Home";

  return (
    <div className="border-b border-border bg-background sticky top-0 z-10">
      <div className="max-w-[1286px] mx-auto px-4 md:px-6 flex gap-1 overflow-x-auto scrollbar-hide">
        {allTabs.map(({ icon: Icon, label }, idx) => (
          <Link key={label} to={tabRoutes[label]}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-3 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === label ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"} ${idx > 2 ? "hidden md:flex" : ""}`}>
            <Icon className="w-4 h-4" /> {label}
          </Link>
        ))}
        <button className="md:hidden flex items-center px-2 py-3 text-muted-foreground"><MoreVertical className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

/* ───────────── COMPANY HERO ───────────── */
export const CompanyHero = ({ cv }: { cv: (key: string, fallback: string) => string }) => (
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
            <h1 className="text-2xl font-bold text-foreground">{cv('company_name', 'Agro Brasil')}</h1>
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
          <h1 className="text-lg font-bold text-foreground">{cv('company_name', 'Agro Brasil')}</h1>
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
);

/* ───────────── TRUST & REPUTATION ───────────── */
export const TrustCard = ({ cv }: { cv: (key: string, fallback: string) => string }) => (
  <div className="rounded-xl p-4 shadow-sm min-w-[220px] md:min-w-0" style={{ background: '#EDF7E1' }}>
    <p className="text-xs font-medium mb-3" style={{ color: '#5A6872' }}>{cv('company_name', 'Agro Brasil')} existe?</p>
    <div className="flex items-center gap-3 mb-2">
      <img src="/images/seal-ra-verified.png" alt="Verificada" className="w-9 h-9" />
      <p className="font-bold text-[15px]" style={{ color: '#1A2B3D' }}>Empresa verificada</p>
    </div>
    <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }}>{cv('trust_description', 'Essa empresa é verificada e possui o selo de confiança do Reclame AQUI.')}</p>
  </div>
);

export const ReputationCard = ({ cv }: { cv: (key: string, fallback: string) => string }) => (
  <div className="rounded-xl p-4 shadow-sm min-w-[220px] md:min-w-0" style={{ background: '#EDF7E1' }}>
    <p className="text-xs font-medium mb-3" style={{ color: '#5A6872' }}>Qual a reputação de {cv('company_name', 'Agro Brasil')}?</p>
    <div className="flex items-center gap-3 mb-2">
      <img src="/images/reputation-otimo.webp" alt="Ótimo" className="w-11 h-11" />
      <div>
        <p className="text-xs" style={{ color: '#5A6872' }}>Reputação</p>
        <p className="font-extrabold text-base uppercase" style={{ color: '#1A2B3D' }}>{cv('reputation_label', 'ÓTIMO')}</p>
      </div>
    </div>
    <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }} dangerouslySetInnerHTML={{ __html: cv('reputation_description', '') }} />
  </div>
);

/* ───────────── PERFORMANCE ───────────── */
export const PerformanceCard = ({ content, cv }: { content?: any[]; cv: (key: string, fallback: string) => string }) => {
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
      <h3 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>Desempenho de {cv('company_name', 'Agro Brasil')}</h3>
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
export const EvolutionCard = ({ companyName }: { companyName?: string }) => (
  <div className="bg-background rounded-xl border border-border p-4 mt-4">
    <div className="flex items-center justify-between">
      <h3 className="text-[15px] font-bold" style={{ color: '#1A2B3D' }}>Evolução</h3>
      <img src="/images/icons/chevron-down-official.svg" alt="" className="w-5 h-5" style={{ opacity: 0.5 }} />
    </div>
    <div className="flex items-center gap-3 mt-3">
      <img src="/images/icons/chart-trending.svg" alt="" className="w-5 h-5 flex-none" />
      <p className="text-[13px]" style={{ color: '#5A6872' }}>Confira a evolução de {companyName || 'Agro Brasil'} nos últimos 12 meses</p>
    </div>
  </div>
);

/* ───────────── VISITED ALSO ───────────── */
export const VisitedAlso = () => {
  const companies = [
    { name: "Mercado Livre", logo: "/images/mercado-livre-logo.png", score: "7.6", repImg: "/images/icons/rep-otimo.webp" },
    { name: "Total Express", logo: "/images/total-express-logo.jpg", score: "6.7", repImg: "/images/icons/rep-regular.png" },
    { name: "Shopee", logo: "/images/shopee-logo.png", score: "7.0", repImg: "/images/icons/rep-otimo.webp" },
    { name: "Samsung Oficial", logo: "/images/samsung-logo.png", score: "--", repImg: "/images/icons/rep-nao-recomendada.png" },
    { name: "Magazine Luiza", logo: "/images/magalu-logo.png", score: "8.3", repImg: "/images/icons/rep-otimo.webp" },
  ];

  const itemsPerPage = { mobile: 2, desktop: 2 };
  const [currentIndex, setCurrentIndex] = useState(0);
  const getPerPage = () => (typeof window !== 'undefined' && window.innerWidth >= 768 ? itemsPerPage.desktop : itemsPerPage.mobile);
  const [perPage, setPerPage] = useState(getPerPage());

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
        <button onClick={prev} disabled={isFirst}
          className="absolute left-[-16px] top-[calc(50%-24px)] z-10 w-9 h-9 rounded-full bg-background flex items-center justify-center transition-opacity"
          style={{ border: '1px solid #E0E4E8', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', opacity: isFirst ? 0.35 : 1, cursor: isFirst ? 'default' : 'pointer' }}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#5A6872"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
        </button>
        <div className="flex mx-2">
          {visibleCompanies.map(c => <CompanyCard key={c.name} c={c} />)}
        </div>
        <button onClick={next} disabled={isLast}
          className="absolute right-[-16px] top-[calc(50%-24px)] z-10 w-9 h-9 rounded-full bg-background flex items-center justify-center transition-opacity"
          style={{ border: '1px solid #E0E4E8', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', opacity: isLast ? 0.35 : 1, cursor: isLast ? 'default' : 'pointer' }}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#5A6872"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalDots }).map((_, i) => (
          <button key={i} onClick={() => goToDot(i)} className="w-2.5 h-2.5 rounded-full transition-colors"
            style={{ backgroundColor: i === currentDot ? '#1B8B4F' : '#D1D5DB' }} />
        ))}
      </div>
    </div>
  );
};

/* ───────────── COMPLAINTS ───────────── */
export const ComplaintsSection = ({ companyName }: { companyName?: string }) => {
  const [tab, setTab] = useState("ultimas");
  const tabLabels: Record<string, string> = { ultimas: "Últimas", nao_respondidas: "Não respondidas", respondidas: "Respondidas", avaliadas: "Avaliadas" };
  const tabs = Object.keys(tabLabels);
  const { data: reviews, isLoading } = useReviews(tab);
  const displayed = (reviews || []).slice(0, 5);

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `Há ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Há ${hours}h`;
    const days = Math.floor(hours / 24);
    return `Há ${days}d`;
  };

  const statusStyle: Record<string, { bg: string; label: string; emoji: string }> = {
    respondida: { bg: '#38A169', label: 'Respondida', emoji: '😊' },
    nao_respondida: { bg: '#E53E3E', label: 'Não respondida', emoji: '😟' },
    avaliada: { bg: '#2B6CB0', label: 'Avaliada', emoji: '⭐' },
  };

  return (
    <div className="mt-8">
      <h2 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>O que estão falando sobre {companyName || 'Agro Brasil'}</h2>
      <div className="bg-background rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
        <div className="px-4 pt-4">
          <p className="text-sm font-bold mb-0" style={{ color: '#1A2B3D' }}>Reclamações</p>
        </div>
        <div className="flex px-4 border-b" style={{ borderColor: '#E8ECF0' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-3 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${tab === t ? "border-[#2B6CB0] text-[#2B6CB0] font-semibold" : "border-transparent text-[#8A9BAE]"}`}>
              {tabLabels[t]}
            </button>
          ))}
        </div>
        <div className="divide-y" style={{ borderColor: '#E8ECF0' }}>
          {isLoading ? (
            <div className="px-4 py-8 text-center text-sm" style={{ color: '#8A9BAE' }}>Carregando...</div>
          ) : displayed.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm" style={{ color: '#8A9BAE' }}>Nenhuma reclamação encontrada</div>
          ) : displayed.map((c) => {
            const st = statusStyle[c.status] || statusStyle.nao_respondida;
            return (
              <Link key={c.id} to={`/reclamacao/${c.id}`} className="block px-4 py-5 hover:bg-[#F7F9FB] transition-colors">
                <h4 className="text-sm font-bold leading-snug mb-2" style={{ color: '#2B6CB0' }}>{c.title}</h4>
                <p className="text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ color: '#5A6872' }}>{c.description}</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: st.bg }}>
                    {st.emoji} {st.label}
                  </span>
                  <span className="text-xs" style={{ color: '#8A9BAE' }}>{formatTime(c.created_at)}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="py-4 text-center space-y-2" style={{ borderTop: '1px solid #E8ECF0' }}>
          <Link to="/reclamacoes" className="text-sm font-semibold block" style={{ color: '#2B6CB0' }}>Ler mais</Link>
          <Link to="/reclamacoes" className="text-sm font-bold block" style={{ color: '#2B6CB0' }}>Ver todas as reclamações</Link>
        </div>
      </div>
    </div>
  );
};

/* ───────────── FAQ ───────────── */
export const FAQSection = () => {
  const faqs = [
    { title: "Entrega Atrasada", desc: "A maioria dos pacotes chega a tempo. Às vezes, os pedidos são entregues após a data estimada de entrega. Possíveis razões para o atraso na entrega inc..." },
    { title: "Quando vou receber meu reembolso?", desc: "Quando você devolve um produto enviado pela Agro Brasil, o reembolso é emitido de acordo com a forma de pagamento usada no momento da compra. O..." },
    { title: "Cobranças desconhecidas", desc: "Confira a seguir alguns motivos comuns para cobranças desconhecidas: Um pedido foi feito por um membro da família, amigo ou colega de trabalho com..." },
    { title: "Cancelar sua assinatura", desc: "Você pode cancelar sua assinatura em Gerenciar sua assinatura. Importante lembrar que: \\- Você pode estar qualificado para um reembolso se seus..." },
    { title: "Como faço para devolver meu pedido?", desc: "Para pedidos vendidos e enviados pela Agro Brasil, acesse os Seus Pedidos. 1. Acesse o pedido que deseja devolver. 2. Clique em \"Devolver..." },
  ];
  return (
    <div className="mt-8">
      <div className="bg-background rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
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

/* ───────────── PROBLEMAS ───────────── */
export const ProblemsSection = ({ companyName }: { companyName?: string }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const problems = [
    { category: "Tipos de problemas", pct: "23.4%", label: "Produto não recebido" },
    { category: "Produtos e Serviços", pct: "15.1%", label: "Produtos" },
    { category: "Categorias", pct: "11.79%", label: "Não encontrei meu problema" },
    { category: "Tipos de problemas", pct: "9.8%", label: "Estorno do valor pago" },
    { category: "Produtos e Serviços", pct: "7.5%", label: "Eletrônicos" },
    { category: "Categorias", pct: "6.2%", label: "Atendimento / SAC" },
  ];

  const updateScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' });
  };

  React.useEffect(() => {
    updateScroll();
  }, []);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-bold" style={{ color: '#1A2B3D' }}>Saiba quais são os principais problemas de {companyName || 'Agro Brasil'}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30"
            style={{ borderColor: '#4B5963', color: '#4B5963' }}
          >
            ‹
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30"
            style={{ borderColor: '#4B5963', color: '#4B5963' }}
          >
            ›
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        onScroll={updateScroll}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {problems.map((p, i) => (
          <Link
            key={i}
            to="/principais-problemas"
            className="flex-none w-[240px] bg-background rounded-xl p-4 hover:shadow-md transition-shadow"
            style={{ border: '1px solid #E8ECF0', scrollSnapAlign: 'start' }}
          >
            <span className="text-xs" style={{ color: '#8A9BAE' }}>{p.category}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold" style={{ color: '#2B6CB0' }}>{p.pct}</span>
              <span className="text-sm font-semibold" style={{ color: '#2B6CB0' }}>{p.label}</span>
            </div>
          </Link>
        ))}
      </div>
      <p className="text-xs text-center mt-3" style={{ color: '#8A9BAE' }}>As reclamações apresentadas são de até 3 anos registradas na aba geral.</p>
    </div>
  );
};

/* ───────────── SIDEBAR ───────────── */
export const SidebarSection = ({ cv }: { cv: (key: string, fallback: string) => string }) => (
  <aside className="space-y-5">
    <div>
      <h3 className="text-[17px] font-bold mb-3 lg:hidden" style={{ color: '#1A2B3D' }}>Veja mais informações sobre {cv('company_name', 'Agro Brasil')}</h3>
      <div className="rounded-xl p-4 bg-background" style={{ border: '1px solid #E8ECF0' }}>
        <h4 className="font-bold text-sm mb-2" style={{ color: '#1A2B3D' }}>Sobre</h4>
        <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }}>{cv('about_text', 'A Agro Brasil oferece milhares de ofertas e produtos em diversas categorias.')}</p>
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
      <a href={cv('website_url', '#')} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium mb-2" style={{ backgroundColor: '#E5EEFB', color: '#2B6CB0' }}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#2B6CB0"><path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg> {cv('website_url', '#').replace('https://', '').replace('www.', '')}
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

/* ───────────── POST CARD ───────────── */
export const PostCard = ({ title, image }: { title: string; image: string }) => (
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
export const Footer = () => {
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
      <section className="flex md:hidden flex-col pl-4 py-6 text-sm" style={{ color: '#5A6872' }}>
        {[...consumerLinks.slice(0, 3), { label: "Melhores empresas", href: "#" }, { label: "Buscar descontos", href: "#" }, { label: "Ranking", href: "#" }, { label: "Cadastre uma empresa", href: "#" }, { label: "Por que estar AQUI?", href: "#" }, { label: "Tire suas dúvidas sobre o Reclame AQUI", href: "#" }].map((link, i) => (
          <a key={i} href={link.href} className="my-2">{link.label}</a>
        ))}
      </section>
      <section className="py-8 mt-0 md:mt-0" style={{ borderTop: '1px solid #E8ECF0' }}>
        <div className="max-w-[1184px] mx-auto w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 px-4">
          <span className="md:hidden text-sm" style={{ color: '#8A9BAE' }}>Siga a gente nas redes sociais</span>
          <div className="w-full flex justify-center">
            <ul className="mx-auto flex flex-row list-none gap-4">
              <li><a href="https://www.facebook.com/ReclameAqui" target="_blank" rel="noopener noreferrer" title="Facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-5 h-5" fill="#5A6872"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg></a></li>
              <li><a href="https://twitter.com/reclameaqui" target="_blank" rel="noopener noreferrer" title="X (Twitter)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5" fill="#5A6872"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg></a></li>
              <li><a href="https://www.youtube.com/channel/UCHSTgEYmopZluZ7N4BSGPpw" target="_blank" rel="noopener noreferrer" title="YouTube"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5" fill="#5A6872"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg></a></li>
              <li><a href="https://www.instagram.com/reclameaqui/" target="_blank" rel="noopener noreferrer" title="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5" fill="#5A6872"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg></a></li>
              <li><a href="https://www.linkedin.com/company/reclame-aqui/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5" fill="#5A6872"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg></a></li>
            </ul>
          </div>
          <div className="w-full flex justify-center">
            <a href="#" className="mx-auto flex items-center" title="Reclame Aqui - Início">
              <svg viewBox="0 0 257 41" xmlns="http://www.w3.org/2000/svg" className="h-8 opacity-40">
                <g fill="none">
                  <path d="M14.463 9.812l-1.45 7.791c1.313-.028 2.326-.353 3.04-.974.714-.62 1.195-1.594 1.443-2.921.241-1.3.138-2.274-.308-2.922-.445-.652-1.228-.974-2.347-.974h-.378zM0 35.717l6.083-32.69h11.084c3.75 0 6.534.903 8.357 2.709 1.822 1.806 2.444 4.262 1.866 7.367-.355 1.91-1.142 3.54-2.363 4.893-1.22 1.349-2.874 2.428-4.961 3.233l4.133 14.488h-10.21l-1.992-12.652L9.64 35.717H0z" fill="#90B823" />
                  <path d="M171.845 24.298h3.828l.317-12.114-4.145 12.114z" fill="#007535" />
                </g>
              </svg>
            </a>
          </div>
          <div className="w-full flex flex-row justify-center items-center">
            <a href="#" className="text-sm mr-4" style={{ color: '#8A9BAE' }} title="Termos de uso">Termos de uso</a>
            <a href="#" className="text-sm ml-4" style={{ color: '#8A9BAE' }} title="Política de privacidade">Política de privacidade</a>
          </div>
        </div>
      </section>
    </footer>
  );
};

/* ───────────── PAGE WRAPPER ───────────── */
export const CompanyPageWrapper = ({ children }: { children: React.ReactNode }) => {
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
        {typeof children === 'function' ? (children as any)({ content, cv }) : children}
      </main>
      <Footer />
    </div>
  );
};

/* Helper type for render prop */
export type CompanyRenderProps = { content: any[]; cv: (key: string, fallback: string) => string };

/* Wrapper that passes cv via render prop */
export const CompanyPage = ({ children }: { children: (props: CompanyRenderProps) => React.ReactNode }) => {
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
        {children({ content: content || [], cv })}
      </main>
      <Footer />
    </div>
  );
};
