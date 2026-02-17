import { Search, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Home, Building2, MessageSquare, Tag, HelpCircle, FileText, AlertTriangle, Eye, ExternalLink, ThumbsUp, Share2, MoreVertical, TrendingDown, Globe, Info, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

/* ───────────── HEADER ───────────── */
const Header = () => (
  <header className="bg-background border-b border-border">
    <div className="max-w-[1286px] mx-auto flex items-center justify-between px-4 md:px-6 py-2">
      <div className="flex items-center gap-2">
        <span className="text-xl md:text-2xl font-bold" style={{ color: '#1B8B4F', fontFamily: 'Open Sans' }}>
          Reclame<span style={{ color: '#333' }}>AQUI</span>
        </span>
        <span className="text-xs text-muted-foreground font-semibold hidden sm:inline">25 ANOS</span>
      </div>
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="O que você procura?" className="w-full pl-10 pr-4 py-2 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>
      <button className="md:hidden p-2 border border-border rounded-lg"><Search className="w-5 h-5 text-foreground" /></button>
      <div className="flex items-center gap-2 md:gap-3">
        <button className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold border border-primary rounded-full text-primary hover:bg-primary/5">Entrar</button>
        <button className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90">Criar conta</button>
      </div>
    </div>
    <nav className="max-w-[1286px] mx-auto px-6 hidden md:flex items-center gap-8 py-2 text-sm font-semibold text-foreground">
      <span className="flex items-center gap-1 cursor-pointer hover:text-primary">Para você <ChevronDown className="w-3 h-3" /></span>
      <span className="flex items-center gap-1 cursor-pointer hover:text-primary">Melhores empresas <ChevronDown className="w-3 h-3" /></span>
      <span className="cursor-pointer hover:text-primary">Detector de Site Confiável</span>
      <span className="cursor-pointer hover:text-primary">Compare</span>
      <span className="cursor-pointer hover:text-primary">Descontos</span>
      <span className="flex items-center gap-1 cursor-pointer hover:text-primary">Para empresas <ChevronDown className="w-3 h-3" /></span>
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
            <img src="/images/seal-ra-verified.svg" alt="RA Verificada" className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Varejo - Marketplaces</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> + 2.4 milhões de visualizações</span>
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
          <img src="/images/seal-ra-verified.svg" alt="RA Verificada" className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> Varejo - Marketplaces</span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> + 2.4 milhões de visualizações</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 mb-2 md:justify-start justify-center">
        <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: '#F1F9E6', color: '#0A213D' }}>
          <img src="/images/reputation-otimo.webp" alt="Ótimo" className="w-[18px] h-[18px]" /> Ótimo
        </a>
        <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: '#E5EEFB', color: '#0A213D' }}>
          <img src="/images/seal-ra-verified.svg" alt="Verificada" className="w-[18px] h-[18px]" /> Verificada
        </a>
      </div>
      <button className="md:hidden w-full py-3 rounded-md font-semibold text-sm flex items-center justify-center gap-2 text-white mt-2 mb-2" style={{ backgroundColor: '#D11F26' }}>
        <MessageSquare className="w-4 h-4" /> Reclamar
      </button>
    </div>
  </div>
);

/* ───────────── TAB NAV ───────────── */
const TabNav = () => {
  const [active, setActive] = useState("Home");
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
          <button key={label} onClick={() => setActive(label)}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-3 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${active === label ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"} ${idx > 2 ? "hidden md:flex" : ""}`}>
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
      <img src="/images/seal-ra-verified.svg" alt="Verificada" className="w-9 h-9" />
      <p className="font-bold text-[15px]" style={{ color: '#1A2B3D' }}>Empresa verificada</p>
    </div>
    <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }}>Essa empresa é verificada e possui o selo de confiança do Reclame AQUI.</p>
    <a href="#" className="text-[13px] font-bold" style={{ color: '#2B6CB0' }}>Saiba mais</a>
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
    <a href="#" className="text-[13px] font-bold" style={{ color: '#2B6CB0' }}>Saiba mais</a>
  </div>
);

/* ───────────── PERFORMANCE ───────────── */
const PerformanceCard = () => {
  const [period, setPeriod] = useState("6 meses");
  const periods = ["6 meses", "12 meses", "2025", "2024", "Geral"];
  const stats = [
    { icon: "/images/icons/bullhorn.svg", text: <>Esta empresa recebeu <strong>106194 reclamações.</strong></> },
    { icon: "/images/icons/check-circle.svg", text: <>Respondeu <strong>88.4% das reclamações</strong> recebidas.</> },
    { icon: "/images/icons/comment-question.svg", text: <>Há <strong>10690 reclamações</strong> aguardando resposta.</> },
    { icon: "/images/icons/star-box.svg", text: <>Há <strong>46196 reclamações</strong> avaliadas, e a nota média dos consumidores é <strong>7.36.</strong></> },
    { icon: "/images/icons/handshake.svg", text: <>Dos que avaliaram, <strong>80% voltariam a fazer negócio.</strong></> },
    { icon: "/images/icons/comment-check.svg", text: <>A empresa resolveu <strong>88% das reclamações recebidas.</strong></> },
    { icon: "/images/icons/timer.svg", text: <>O tempo médio de resposta é <strong>19 dias e 13 horas.</strong></> },
  ];
  return (
    <div className="bg-background rounded-xl border border-border p-5">
      <h3 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>Desempenho de Amazon</h3>
      {/* Tabs como texto underline - igual ao print */}
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
      <p className="text-xs mt-5 pt-4 border-t border-border" style={{ color: '#8A9BAE' }}>Os dados correspondem ao período de 01/08/2025 a 31/01/2026</p>
      <a href="#" className="text-xs font-bold mt-2 inline-block" style={{ color: '#2B6CB0' }}>Entenda como calculamos a reputação</a>
    </div>
  );
};

/* ───────────── EVOLUÇÃO ───────────── */
const EvolutionCard = () => (
  <div className="bg-background rounded-xl border border-border p-4 mt-4">
    <div className="flex items-center justify-between">
      <h3 className="text-[15px] font-bold" style={{ color: '#1A2B3D' }}>Evolução</h3>
      <ChevronDown className="w-5 h-5" style={{ color: '#8A9BAE' }} />
    </div>
    <div className="flex items-center gap-3 mt-3">
      <TrendingDown className="w-5 h-5 flex-none" style={{ color: '#2B6CB0' }} />
      <p className="text-[13px]" style={{ color: '#5A6872' }}>Confira a evolução de Amazon nos últimos 12 meses</p>
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
          <img src={c.repImg} alt="Reputação" className="w-[27px] h-[27px]" />
          <span className="text-[22px] font-bold leading-none" style={{ color: '#1A2B3D' }}>{c.score}</span>
          <span className="text-xs" style={{ color: '#8A9BAE' }}>/10</span>
        </div>
      </div>
    </a>
  );

  return (
    <div className="mt-8">
      <h2 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>Quem visitou Amazon também visitou</h2>
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
const ComplaintsSection = () => {
  const [tab, setTab] = useState("Respondidas");
  const tabs = ["Últimas", "Não respondidas", "Respondidas", "Avaliadas"];
  const complaints = [
    { title: "Atraso na entrega de notebook comprado via pix na Amazon", desc: "Fiz a compra via pix de um notebook, na empresa amazon, no dia 23/12/2025, com prazo de entrega para o dia 05/01/2026. Além de não ter sido entregue o produto, não consta em nenhum campo uma garantia de entrega...", time: "Há 1 hora" },
    { title: "Site em loop impede a geração do código de pré-envio para devolução.", desc: "O site está em loop, toda vez que abro a parte de devolução ele não encaminha para geração de código do pré-envio.", time: "Há 2 horas" },
  ];
  return (
    <div className="mt-8">
      <h2 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>O que estão falando sobre Amazon</h2>
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
          <a href="#" className="text-sm font-semibold block" style={{ color: '#2B6CB0' }}>Ler mais</a>
          <a href="#" className="text-sm font-bold block" style={{ color: '#2B6CB0' }}>Ver todas as reclamações</a>
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
          <ChevronUp className="w-5 h-5 text-white/60" />
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
const ProblemsSection = () => {
  const problems = [
    { category: "Tipos de problemas", pct: "23.4%", label: "Produto não recebido" },
    { category: "Produtos e Serviços", pct: "15.1%", label: "Produtos" },
    { category: "Categorias", pct: "11.79%", label: "Não encontrei meu problema" },
  ];
  return (
    <div className="mt-8">
      <h2 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>Saiba quais são os principais problemas de Amazon</h2>
      <div className="bg-background rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
        <div className="px-5 pt-4 pb-2">
          <h3 className="text-sm font-bold" style={{ color: '#1A2B3D' }}>Principais problemas</h3>
        </div>
        <div className="divide-y" style={{ borderColor: '#E8ECF0' }}>
          {problems.map((p, i) => (
            <div key={i} className="px-5 py-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs" style={{ color: '#8A9BAE' }}>{p.category}</span>
                <ChevronDown className="w-4 h-4" style={{ color: '#8A9BAE' }} />
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
const Sidebar = () => (
  <aside className="space-y-5">
    <div>
      <h3 className="text-[17px] font-bold mb-3 lg:hidden" style={{ color: '#1A2B3D' }}>Veja mais informações sobre Amazon</h3>
      <div className="rounded-xl p-4 bg-background" style={{ border: '1px solid #E8ECF0' }}>
        <h4 className="font-bold text-sm mb-2" style={{ color: '#1A2B3D' }}>Sobre</h4>
        <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#5A6872' }}>A Amazon.com.br oferece milhares de ofertas e produtos em diversas categorias, que incluem itens vendidos e entregues pela Amazon ou por vendedores parceiros.</p>
        <p className="text-[13px]" style={{ color: '#1A2B3D' }}><strong>CNPJ:</strong> <span style={{ color: '#2B6CB0' }}>15.436.940/0001-03</span></p>
        <p className="text-xs mt-1" style={{ color: '#8A9BAE' }}>Informações cadastradas pela empresa</p>
        <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#8A9BAE' }}>
          <Calendar className="w-3.5 h-3.5" /> Cadastrada há 20 anos
        </div>
      </div>
    </div>

    <div className="rounded-xl p-4 bg-background" style={{ border: '1px solid #E8ECF0' }}>
      <h4 className="font-bold text-sm mb-3" style={{ color: '#1A2B3D' }}>Contatos da empresa</h4>
      <p className="text-xs mb-2" style={{ color: '#8A9BAE' }}>Site</p>
      {/* Botões azul claro igual ao print */}
      <a href="https://www.amazon.com.br" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium mb-2" style={{ backgroundColor: '#E5EEFB', color: '#2B6CB0' }}>
        <Globe className="w-4 h-4" /> amazon.com.br
      </a>
      <a href="#" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: '#E5EEFB', color: '#2B6CB0' }}>
        <ExternalLink className="w-4 h-4" /> Ir para o atendimento
      </a>
      <div className="flex gap-5 mt-4 justify-center md:justify-start">
        <a href="#"><img src="/images/social-facebook.png" alt="Facebook" className="w-7 h-7" /></a>
        <a href="#"><img src="/images/social-instagram.png" alt="Instagram" className="w-7 h-7" /></a>
        <a href="#"><img src="/images/social-x.png" alt="X" className="w-7 h-7" /></a>
      </div>
    </div>

    {/* Posição card */}
    <div className="rounded-xl p-4 bg-background" style={{ border: '1px solid #E8ECF0' }}>
      <p className="text-xs mb-2" style={{ color: '#8A9BAE' }}>Qual a posição de Amazon ?</p>
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold" style={{ color: '#1A2B3D' }}>12º</span>
        <span className="text-sm font-bold" style={{ color: '#1A2B3D' }}>Melhor empresa</span>
      </div>
      <p className="text-xs mt-1" style={{ color: '#8A9BAE' }}>na lista de melhores em Marketplaces</p>
      <a href="#" className="text-xs font-bold mt-2 inline-flex items-center gap-1" style={{ color: '#2B6CB0' }}>
        Confira a classificação <ChevronRight className="w-3 h-3" />
      </a>
    </div>

    {/* Marcas */}
    <div>
      <h4 className="text-sm font-bold mb-2" style={{ color: '#1A2B3D' }}>Marcas Amazon</h4>
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
  <div className="rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow" style={{ border: '1px solid #E8ECF0' }}>
    <div className="relative">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="absolute bottom-3 left-3">
        <a href="#" className="inline-flex items-center gap-1 px-4 py-2 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#2B6CB0' }}>
          Saiba mais <ChevronRight className="w-3 h-3" />
        </a>
      </div>
    </div>
    <div className="p-4">
      <h4 className="text-sm font-bold mb-3" style={{ color: '#1A2B3D' }}>{title}</h4>
      <div className="flex items-center gap-5 border-t pt-3" style={{ borderColor: '#E8ECF0' }}>
        <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#5A6872' }}><ThumbsUp className="w-4 h-4" /> Curtir</button>
        <button className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#5A6872' }}><Share2 className="w-4 h-4" /> Compartilhar</button>
      </div>
    </div>
  </div>
);

/* ───────────── MAIN PAGE ───────────── */
const Index = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F4F6' }}>
      <Header />
      <CompanyHero />
      <TabNav />

      <main className="max-w-[1286px] mx-auto px-4 md:px-6 py-6">
        {/* Mobile */}
        <div className="lg:hidden">
          <h2 className="text-[17px] font-bold mb-4" style={{ color: '#1A2B3D' }}>Amazon é confiável?</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex-none w-[75%]"><ReputationCard /></div>
            <div className="flex-none w-[75%]"><TrustCard /></div>
          </div>
          <div className="mt-6"><PerformanceCard /></div>
          <EvolutionCard />
          <div className="mt-6">
            <h3 className="text-[17px] font-bold mb-3" style={{ color: '#1A2B3D' }}>Veja mais informações sobre Amazon</h3>
            <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #E8ECF0' }}>
              <iframe width="100%" height="200" src="https://www.youtube.com/embed/MVaaQ8Qu7Iw" title="Ofertas do Dia da Amazon" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
            </div>
            <div className="mb-4">
              <h3 className="text-[15px] font-bold mb-3" style={{ color: '#1A2B3D' }}>O que Amazon está postando</h3>
              <PostCard title="Proteja-se contra fraudes e golpes por mensagens" image="/images/post-3.jpg" />
              <a href="#" className="text-sm font-bold mt-3 inline-block" style={{ color: '#2B6CB0' }}>Ver todos os posts</a>
            </div>
            <ComplaintsSection />
            <FAQSection />
            <ProblemsSection />
          </div>
          <VisitedAlso />
          <div className="mt-6"><Sidebar /></div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-[280px_1fr_280px] gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1A2B3D' }}>Amazon é confiável?</h2>
            <div className="space-y-4">
              <TrustCard />
              <ReputationCard />
            </div>
            <div className="mt-6"><PerformanceCard /></div>
            <EvolutionCard />
            <VisitedAlso />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: '#1A2B3D' }}>Veja mais informações sobre Amazon</h3>
            <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #E8ECF0' }}>
              <iframe width="100%" height="280" src="https://www.youtube.com/embed/MVaaQ8Qu7Iw" title="Ofertas do Dia da Amazon" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
            </div>
            <div className="mb-4">
              <h3 className="text-base font-bold mb-3" style={{ color: '#1A2B3D' }}>O que Amazon está postando</h3>
              <PostCard title="Proteja-se contra fraudes e golpes por mensagens" image="/images/post-3.jpg" />
              <a href="#" className="text-sm font-bold mt-3 inline-block" style={{ color: '#2B6CB0' }}>Ver todos os posts</a>
            </div>
            <ComplaintsSection />
            <FAQSection />
            <ProblemsSection />
          </div>
          <div><Sidebar /></div>
        </div>
      </main>

      <footer className="py-8 mt-12" style={{ backgroundColor: '#1A2B3D' }}>
        <div className="max-w-[1286px] mx-auto px-4 md:px-6 text-center text-sm text-white/60">
          © 2025 Reclame AQUI - Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
};

export default Index;
