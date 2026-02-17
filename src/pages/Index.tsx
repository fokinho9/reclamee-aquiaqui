import { Search, ChevronDown, Home, Building2, MessageSquare, Tag, HelpCircle, FileText, AlertTriangle, Eye, ExternalLink, ThumbsUp, Share2, MoreVertical } from "lucide-react";
import { useState } from "react";

const Header = () => (
  <header className="bg-background border-b border-border">
    <div className="max-w-[1286px] mx-auto flex items-center justify-between px-4 md:px-6 py-2">
      <div className="flex items-center gap-2">
        <span className="text-xl md:text-2xl font-bold" style={{ color: '#1B8B4F', fontFamily: 'Open Sans' }}>
          Reclame<span style={{ color: '#333' }}>AQUI</span>
        </span>
        <span className="text-xs text-muted-foreground font-semibold hidden sm:inline">25 ANOS</span>
      </div>
      {/* Desktop search */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="O que você procura?"
            className="w-full pl-10 pr-4 py-2 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>
      {/* Mobile search icon */}
      <button className="md:hidden p-2 border border-border rounded-lg">
        <Search className="w-5 h-5 text-foreground" />
      </button>
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

const CompanyHero = () => (
  <div className="relative">
    <div className="w-full h-[105px] md:h-[280px]" style={{ backgroundColor: '#EF6509' }}>
      <img src="/images/amazon-banner.jpg" alt="Banner Amazon" className="w-full h-full object-cover max-w-[1920px] mx-auto hidden md:block" />
      <img src="/images/amazon-banner-mobile.jpg" alt="Banner Amazon" className="w-full h-full object-cover md:hidden" />
    </div>
    <div className="max-w-[1286px] mx-auto px-4 md:px-10 relative">
      {/* Desktop layout */}
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
      {/* Mobile layout - centered */}
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
      {/* Badges */}
      <div className="flex items-center gap-2 mt-3 mb-2 md:justify-start justify-center">
        <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors hover:opacity-80" style={{ backgroundColor: '#F1F9E6', color: '#0A213D' }}>
          <img src="/images/reputation-otimo.webp" alt="Ótimo" className="w-[18px] h-[18px]" /> Ótimo
        </a>
        <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors hover:opacity-80" style={{ backgroundColor: '#E5EEFB', color: '#0A213D' }}>
          <img src="/images/seal-ra-verified.svg" alt="Verificada" className="w-[18px] h-[18px]" /> Verificada
        </a>
      </div>
      {/* Mobile full-width Reclamar button */}
      <button className="md:hidden w-full py-3 rounded-md font-semibold text-sm flex items-center justify-center gap-2 text-white hover:opacity-90 mt-2 mb-2" style={{ backgroundColor: '#D11F26' }}>
        <MessageSquare className="w-4 h-4" /> Reclamar
      </button>
    </div>
  </div>
);

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
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`flex items-center gap-1.5 px-3 md:px-4 py-3 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              active === label ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            } ${idx > 2 ? "hidden md:flex" : ""}`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
        <button className="md:hidden flex items-center px-2 py-3 text-muted-foreground">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const TrustCard = () => (
  <div className="rounded-lg p-4 shadow min-w-[200px] md:min-w-0" style={{ background: 'hsl(var(--ra-light-green))' }}>
    <p className="text-xs font-medium text-foreground/70 mb-3">Amazon existe?</p>
    <div className="flex items-center gap-3 mb-2">
      <img src="/images/seal-ra-verified.svg" alt="Verificada" className="w-8 h-8" />
      <div>
        <p className="font-semibold text-foreground">Empresa verificada</p>
      </div>
    </div>
    <p className="text-sm text-foreground/70 mb-3">Essa empresa é verificada e possui o selo de confiança do Reclame AQUI.</p>
    <a href="#" className="text-sm font-semibold" style={{ color: 'hsl(var(--ra-blue))' }}>Saiba mais</a>
  </div>
);

const ReputationCard = () => (
  <div className="rounded-lg p-4 shadow min-w-[200px] md:min-w-0" style={{ background: 'hsl(var(--ra-light-green))' }}>
    <p className="text-xs font-medium text-foreground/70 mb-3">Qual a reputação de Amazon?</p>
    <div className="flex items-center gap-3 mb-2">
      <img src="/images/reputation-otimo.webp" alt="Ótimo" className="w-10 h-10" />
      <div>
        <p className="text-sm text-foreground/70">Reputação</p>
        <p className="font-bold text-foreground uppercase">ÓTIMO</p>
      </div>
    </div>
    <p className="text-sm text-foreground/70 mb-3">O consumidor avaliou o atendimento dessa empresa como ÓTIMO. A nota média nos últimos 6 meses é <strong>8.2/10.</strong></p>
    <a href="#" className="text-sm font-semibold" style={{ color: 'hsl(var(--ra-blue))' }}>Saiba mais</a>
  </div>
);

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
    <div className="bg-background rounded-lg border border-border shadow p-4">
      <h3 className="text-lg font-bold text-foreground mb-3">Desempenho de Amazon</h3>
      <div className="flex gap-2 mb-4 flex-wrap">
        {periods.map(p => (
          <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1 text-xs font-semibold rounded-full border ${period === p ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
            {p}
          </button>
        ))}
      </div>
      <div className="space-y-4 mt-4">
        {stats.map((s, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="p-1.5 rounded-lg flex-none" style={{ backgroundColor: '#C2EAD6' }}>
              <img src={s.icon} alt="" className="w-6 h-6" />
            </div>
            <p className="text-sm text-foreground/80">{s.text}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">Os dados correspondem ao período de 01/08/2025 a 31/01/2026</p>
      <a href="#" className="text-xs font-semibold mt-2 inline-block" style={{ color: 'hsl(var(--ra-blue))' }}>Entenda como calculamos a reputação</a>
    </div>
  );
};

const VisitedAlso = () => {
  const companies = [
    { name: "Mercado Livre", logo: "/images/mercado-livre-logo.png", score: "7.6", rep: "Bom", color: "text-blue-500" },
    { name: "Total Express", logo: "/images/total-express-logo.jpg", score: "6.7", rep: "Regular", color: "text-yellow-500" },
    { name: "Shopee", logo: "/images/shopee-logo.png", score: "7.0", rep: "Bom", color: "text-blue-500" },
    { name: "Samsung Oficial", logo: "/images/samsung-logo.png", score: "--", rep: "Não recomendada", color: "text-red-500" },
    { name: "Magazine Luiza", logo: "/images/magalu-logo.png", score: "8.3", rep: "RA1000", color: "text-green-600" },
  ];
  return (
    <div className="mt-8">
      <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">Quem visitou Amazon também visitou</h2>
      <div className="flex md:grid md:grid-cols-5 gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {companies.map(c => (
          <div key={c.name} className="bg-background border border-border rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer min-w-[120px] flex-none md:min-w-0">
            <img src={c.logo} alt={c.name} className="w-12 h-12 rounded-full mx-auto mb-2 object-cover" />
            <p className="text-xs font-semibold text-foreground truncate">{c.name}</p>
            <p className={`text-xs ${c.color}`}>{c.rep}</p>
            <p className="text-lg font-bold text-foreground">{c.score}<span className="text-xs font-normal text-muted-foreground">/10</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ComplaintsSection = () => {
  const [tab, setTab] = useState("Últimas");
  const tabs = ["Últimas", "Não respondidas", "Respondidas", "Avaliadas"];
  const complaints = [
    { title: "Atraso na entrega de notebook comprado via pix na Amazon", desc: "Fiz a compra via pix de um notebook, na empresa amazon, no dia 23/12/2025, com prazo de entrega para o dia 05/01/2026. Além de não ter sido entregue o produto, não consta em nenhum campo uma garantia de entrega...", status: "Respondida", time: "Há 2 horas" },
    { title: "Produto não recebido", desc: "Não recebi minha mercadoria, reclamei e não recebi o valor de volta!", status: "Respondida", time: "Há 1 hora" },
  ];
  return (
    <div className="mt-8">
      <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">O que estão falando sobre Amazon</h2>
      <h3 className="text-base font-semibold text-foreground mb-3">Reclamações</h3>
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 text-xs font-semibold rounded-full border whitespace-nowrap ${tab === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {complaints.map((c, i) => (
          <div key={i} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer">
            <h4 className="text-sm font-bold text-foreground mb-1">{c.title}</h4>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{c.desc}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-primary">{c.status}</span>
              <span className="text-xs text-muted-foreground">{c.time}</span>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="text-sm font-semibold mt-3 inline-block" style={{ color: 'hsl(var(--ra-blue))' }}>Ver todas as reclamações</a>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    { title: "Entrega Atrasada", desc: "A maioria dos pacotes chega a tempo. Às vezes, os pedidos são entregues após a data estimada de entrega." },
    { title: "Quando vou receber meu reembolso?", desc: "Quando você devolve um produto enviado pela Amazon, o reembolso é emitido de acordo com a forma de pagamento usada." },
    { title: "Cobranças desconhecidas", desc: "Confira a seguir alguns motivos comuns para cobranças desconhecidas." },
    { title: "Cancelar sua assinatura Prime", desc: "Você pode cancelar sua assinatura em Gerenciar sua assinatura Prime." },
    { title: "Como faço para devolver meu pedido?", desc: "Para pedidos vendidos e enviados pela Amazon.com.br, acesse os Seus Pedidos." },
  ];
  return (
    <div className="mt-8">
      <h2 className="text-lg md:text-xl font-bold text-foreground mb-2">Amazon tem uma informação importante para você</h2>
      <p className="text-sm text-muted-foreground mb-4">Precisa de ajuda? Conteúdos disponibilizados pela empresa</p>
      <div className="space-y-2">
        {faqs.map((f, i) => (
          <div key={i} className="border border-border rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer">
            <h4 className="text-sm font-semibold text-foreground">{f.title}</h4>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{f.desc}</p>
          </div>
        ))}
      </div>
      <a href="#" className="text-sm font-semibold mt-3 inline-block" style={{ color: 'hsl(var(--ra-blue))' }}>Ver mais conteúdos</a>
    </div>
  );
};

const ProblemsSection = () => {
  const problems = [
    { label: "Produto não recebido", pct: "23.4%" },
    { label: "Produtos", pct: "15.1%" },
    { label: "Não encontrei meu problema", pct: "11.79%" },
  ];
  return (
    <div className="mt-8">
      <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">Principais problemas</h2>
      <div className="space-y-2">
        {problems.map((p, i) => (
          <div key={i} className="flex items-center gap-3 border border-border rounded-lg p-3 cursor-pointer hover:shadow-sm">
            <span className="text-sm font-bold" style={{ color: 'hsl(var(--ra-blue))' }}>{p.pct}</span>
            <span className="text-sm text-foreground">{p.label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">As reclamações apresentadas são de até 3 anos registradas na aba geral.</p>
    </div>
  );
};

const Sidebar = () => (
  <aside className="space-y-6">
    <div className="border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">Sobre</h3>
      <p className="text-sm text-muted-foreground mb-3">A Amazon.com.br oferece milhares de ofertas e produtos em diversas categorias, que incluem itens vendidos e entregues pela Amazon ou por vendedores parceiros.</p>
      <p className="text-sm text-foreground"><strong>CNPJ:</strong> <span style={{ color: 'hsl(var(--ra-blue))' }}>15.436.940/0001-03</span></p>
      <p className="text-xs text-muted-foreground mt-1">Informações cadastradas pela empresa</p>
      <p className="text-xs text-muted-foreground mt-3">📅 Cadastrada há 20 anos</p>
    </div>

    <div className="border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-3">Contatos da empresa</h3>
      <p className="text-xs text-muted-foreground mb-1">Site</p>
      <a href="https://www.amazon.com.br" className="text-sm font-medium flex items-center gap-1 mb-2" style={{ color: 'hsl(var(--ra-blue))' }}>
        <ExternalLink className="w-3.5 h-3.5" /> amazon.com.br
      </a>
      <a href="#" className="text-sm font-semibold" style={{ color: 'hsl(var(--ra-blue))' }}>Ir para o atendimento</a>
      <div className="flex gap-3 mt-4">
        <a href="#" className="w-8 h-8"><img src="/images/social-facebook.png" alt="Facebook" className="w-8 h-8 rounded-full" /></a>
        <a href="#" className="w-8 h-8"><img src="/images/social-instagram.png" alt="Instagram" className="w-8 h-8 rounded-full" /></a>
        <a href="#" className="w-8 h-8"><img src="/images/social-x.png" alt="X" className="w-8 h-8 rounded-full" /></a>
      </div>
    </div>

    <div className="border border-border rounded-lg p-4 text-center">
      <p className="text-sm text-muted-foreground">Qual a posição de Amazon?</p>
      <p className="text-3xl font-bold text-foreground mt-1">12º</p>
      <p className="text-xs text-muted-foreground">Melhor empresa na lista de melhores em Marketplaces</p>
      <a href="#" className="text-xs font-semibold mt-2 inline-block" style={{ color: 'hsl(var(--ra-blue))' }}>Confira a classificação</a>
    </div>

    <div className="flex gap-2">
      <span className="px-3 py-1 text-xs font-semibold border border-border rounded-full text-muted-foreground hover:bg-muted cursor-pointer">Alexa</span>
      <span className="px-3 py-1 text-xs font-semibold border border-border rounded-full text-muted-foreground hover:bg-muted cursor-pointer">Kindle</span>
    </div>

    <PostCard title="O que fazer se a entrega está atrasada?" image="/images/post-1.jpg" />
    <PostCard title="Reembolsos" image="/images/post-2.jpg" />
  </aside>
);

const PostCard = ({ title, image }: { title: string; image: string }) => (
  <div className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
    <img src={image} alt={title} className="w-full h-36 object-cover" />
    <div className="p-3">
      <h4 className="text-sm font-bold text-foreground mb-2">{title}</h4>
      <a href="#" className="text-xs font-semibold" style={{ color: 'hsl(var(--ra-blue))' }}>Saiba mais</a>
      <div className="flex items-center gap-4 mt-3 border-t border-border pt-2">
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ThumbsUp className="w-3.5 h-3.5" /> Curtir</button>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Share2 className="w-3.5 h-3.5" /> Compartilhar</button>
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-muted/50">
      <Header />
      <CompanyHero />
      <TabNav />

      <main className="max-w-[1286px] mx-auto px-4 md:px-6 py-6">
        {/* Mobile: single column with trust cards as horizontal scroll, then performance, then content */}
        <div className="lg:hidden">
          <h2 className="text-lg font-bold text-foreground mb-4">Amazon é confiável?</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex-none w-[75%]"><ReputationCard /></div>
            <div className="flex-none w-[75%]"><TrustCard /></div>
          </div>
          <div className="mt-6">
            <PerformanceCard />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold text-foreground mb-3">Veja mais informações sobre Amazon</h3>
            <div className="rounded-lg overflow-hidden border border-border mb-4">
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/MVaaQ8Qu7Iw"
                title="Ofertas do Dia da Amazon"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-base font-bold text-foreground mb-3">O que Amazon está postando</h3>
              <PostCard title="Proteja-se contra fraudes e golpes por mensagens" image="/images/post-3.jpg" />
              <a href="#" className="text-sm font-semibold mt-2 inline-block" style={{ color: 'hsl(var(--ra-blue))' }}>Ver todos os posts</a>
            </div>
            <ComplaintsSection />
            <FAQSection />
            <ProblemsSection />
          </div>
          <VisitedAlso />
          <div className="mt-6">
            <Sidebar />
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid grid-cols-[280px_1fr_280px] gap-6">
          {/* Left Column */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Amazon é confiável?</h2>
            <div className="space-y-4">
              <TrustCard />
              <ReputationCard />
            </div>
            <div className="mt-6">
              <PerformanceCard />
            </div>
            <VisitedAlso />
          </div>

          {/* Center Column */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-3">Veja mais informações sobre Amazon</h3>
            <div className="rounded-lg overflow-hidden border border-border mb-4">
              <iframe
                width="100%"
                height="280"
                src="https://www.youtube.com/embed/MVaaQ8Qu7Iw"
                title="Ofertas do Dia da Amazon"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-base font-bold text-foreground mb-3">O que Amazon está postando</h3>
              <PostCard title="Proteja-se contra fraudes e golpes por mensagens" image="/images/post-3.jpg" />
              <a href="#" className="text-sm font-semibold mt-2 inline-block" style={{ color: 'hsl(var(--ra-blue))' }}>Ver todos os posts</a>
            </div>
            <ComplaintsSection />
            <FAQSection />
            <ProblemsSection />
          </div>

          {/* Right Column */}
          <div>
            <Sidebar />
          </div>
        </div>
      </main>

      <footer className="bg-foreground text-background py-8 mt-12">
        <div className="max-w-[1286px] mx-auto px-4 md:px-6 text-center text-sm opacity-70">
          © 2025 Reclame AQUI - Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
};

export default Index;
