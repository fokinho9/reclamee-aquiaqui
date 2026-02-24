import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useReviews, type Review } from "@/hooks/use-reviews";
import Seo from "@/components/seo/Seo";

/* ───────────── MOCK DATA (fallback) ───────────── */
const MOCK_COMPLAINTS = [
  { id: "1", title: "Atraso na entrega de notebook comprado via pix na Agro Brasil", desc: "Fiz a compra via pix de um notebook, na empresa Agro Brasil, no dia 23/12/2025, com prazo de entrega para o dia 05/01/2026...", author: "João S.", city: "São Paulo - SP", time: "Há 1 hora", status: "respondida" as const, category: "Produto não recebido", reactions: { up: 12, down: 2 } },
  { id: "2", title: "Site em loop impede a geração do código de pré-envio para devolução.", desc: "O site está em loop, toda vez que abro a parte de devolução ele não encaminha para geração de código do pré-envio.", author: "Maria C.", city: "Rio de Janeiro - RJ", time: "Há 2 horas", status: "respondida" as const, category: "Problemas com o site", reactions: { up: 8, down: 1 } },
  { id: "3", title: "Cobrança indevida no cartão após cancelamento de pedido", desc: "Cancelei um pedido no dia 10/01 e até agora não recebi o estorno no meu cartão de crédito.", author: "Carlos R.", city: "Belo Horizonte - MG", time: "Há 3 horas", status: "nao_respondida" as const, category: "Cobrança indevida", reactions: { up: 25, down: 3 } },
  { id: "4", title: "Produto chegou danificado e empresa não aceita troca", desc: "Comprei um monitor e chegou com a tela trincada.", author: "Ana P.", city: "Curitiba - PR", time: "Há 5 horas", status: "avaliada" as const, category: "Produto com defeito", reactions: { up: 42, down: 5 }, rating: 8 },
  { id: "5", title: "Reembolso prometido há 30 dias e nunca realizado", desc: "A Agro Brasil prometeu reembolso de R$ 1.200 após devolução de produto.", author: "Pedro L.", city: "Brasília - DF", time: "Há 6 horas", status: "nao_respondida" as const, category: "Reembolso", reactions: { up: 56, down: 8 } },
];

const STATUS_MAP = {
  respondida: { label: "Respondida", emoji: "😊", bg: "#38A169" },
  nao_respondida: { label: "Não respondida", emoji: "😕", bg: "#E53E3E" },
  avaliada: { label: "Avaliada", emoji: "⭐", bg: "#2B6CB0" },
};

type TabKey = "ultimas" | "nao_respondidas" | "respondidas" | "avaliadas";

const TABS: { key: TabKey; label: string }[] = [
  { key: "ultimas", label: "Últimas" },
  { key: "nao_respondidas", label: "Não respondidas" },
  { key: "respondidas", label: "Respondidas" },
  { key: "avaliadas", label: "Avaliadas" },
];

const Header = () => (
  <header className="bg-background border-b border-border">
    <div className="max-w-[1286px] mx-auto flex items-center justify-between px-4 md:px-6 py-2">
      <Link to="/" className="flex items-center gap-2">
        <img src="/images/logo-25-anos.svg" alt="ReclameAQUI 25 anos" className="h-7 md:h-9 w-auto" />
      </Link>
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <img src="/images/icons/search.svg" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
          <input type="text" placeholder="O que você procura?" className="w-full pl-10 pr-4 py-2 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <button className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold border border-primary rounded-full text-primary hover:bg-primary/5">Entrar</button>
        <button className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90">Criar conta</button>
      </div>
    </div>
  </header>
);

const ReviewCard = ({ review }: { review: Review }) => {
  const status = STATUS_MAP[review.status] || STATUS_MAP.nao_respondida;
  const timeAgo = formatTimeAgo(review.created_at);

  return (
    <Link to={`/reclamacao/${review.id}`} className="block px-4 md:px-6 py-5 hover:bg-[#F7F9FB] transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold leading-snug mb-1.5" style={{ color: '#2B6CB0' }}>{review.title}</h3>
          <p className="text-[13px] leading-relaxed mb-3 line-clamp-2" style={{ color: '#5A6872' }}>{review.description}</p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-xs" style={{ color: '#8A9BAE' }}>{review.author_name} · {review.author_city}</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F0F4F8', color: '#5A6872' }}>{review.category}</span>
            {review.product && (
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#E5EEFB', color: '#2B6CB0' }}>📦 {review.product}</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">👍</span>
              <span className="text-xs" style={{ color: '#8A9BAE' }}>{review.reactions_up}</span>
              <span className="text-lg ml-1">👎</span>
              <span className="text-xs" style={{ color: '#8A9BAE' }}>{review.reactions_down}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: status.bg }}>
              {status.emoji} {status.label}
            </span>
            {review.status === "avaliada" && review.rating != null && (
              <span className="text-xs font-semibold" style={{ color: '#1A2B3D' }}>Nota: {review.rating}/10</span>
            )}
            <span className="text-xs ml-auto" style={{ color: '#8A9BAE' }}>{timeAgo}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const MockCard = ({ complaint }: { complaint: typeof MOCK_COMPLAINTS[0] }) => {
  const status = STATUS_MAP[complaint.status];
  return (
    <Link to={`/reclamacao/${complaint.id}`} className="block px-4 md:px-6 py-5 hover:bg-[#F7F9FB] transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold leading-snug mb-1.5" style={{ color: '#2B6CB0' }}>{complaint.title}</h3>
          <p className="text-[13px] leading-relaxed mb-3 line-clamp-2" style={{ color: '#5A6872' }}>{complaint.desc}</p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-xs" style={{ color: '#8A9BAE' }}>{complaint.author} · {complaint.city}</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F0F4F8', color: '#5A6872' }}>{complaint.category}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">👍</span>
              <span className="text-xs" style={{ color: '#8A9BAE' }}>{complaint.reactions.up}</span>
              <span className="text-lg ml-1">👎</span>
              <span className="text-xs" style={{ color: '#8A9BAE' }}>{complaint.reactions.down}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: status.bg }}>
              {status.emoji} {status.label}
            </span>
            <span className="text-xs ml-auto" style={{ color: '#8A9BAE' }}>{complaint.time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

function formatTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `Há ${diffMin} minutos`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Há ${diffH} hora${diffH > 1 ? 's' : ''}`;
  const diffD = Math.floor(diffH / 24);
  return `Há ${diffD} dia${diffD > 1 ? 's' : ''}`;
}

const ITEMS_PER_PAGE = 10;

const Reclamacoes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get("tab") as TabKey) || "ultimas";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const { data: dbReviews, isLoading } = useReviews(currentTab);

  const allReviews = dbReviews || [];
  const totalPages = Math.max(1, Math.ceil(allReviews.length / ITEMS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const paginatedReviews = allReviews.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const setPage = (p: number) => {
    setSearchParams({ tab: currentTab, page: String(p) });
  };

  const setTab = (tab: string) => {
    setSearchParams({ tab, page: "1" });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Seo
        title="Reclamações Agro Brasil - Reclame Aqui"
        description="Veja todas as reclamações sobre Agro Brasil no Reclame AQUI. Confira as últimas, respondidas, não respondidas e avaliadas pelos consumidores."
        keywords={["reclamações", "agro brasil", "consumidor", "reclame aqui"]}
        canonicalPath="/reclamacoes"
      />
      <Header />

      <div className="bg-background border-b border-border">
        <div className="max-w-[900px] mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <Link to="/">
            <img src="/placeholder.svg" alt="Agro Brasil" className="w-12 h-12 rounded-full object-cover border-2 border-border" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold" style={{ color: '#1A2B3D' }}>Agro Brasil</h1>
              <img src="/images/seal-ra-verified.png" alt="Verificada" className="w-5 h-5" />
            </div>
            <p className="text-xs" style={{ color: '#8A9BAE' }}>Reclamações dos consumidores</p>
          </div>
          <Link to="/" className="ml-auto text-xs font-semibold" style={{ color: '#2B6CB0' }}>
            ← Voltar ao perfil
          </Link>
        </div>
      </div>

      <div className="bg-background border-b" style={{ borderColor: '#E8ECF0' }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-6 flex">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-[13px] font-semibold border-b-2 transition-colors whitespace-nowrap ${
                currentTab === t.key
                  ? "border-[#2B6CB0] text-[#2B6CB0]"
                  : "border-transparent text-[#8A9BAE] hover:text-[#5A6872]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-6">
        <div className="bg-background rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
          <div className="divide-y" style={{ borderColor: '#E8ECF0' }}>
            {isLoading ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm" style={{ color: '#8A9BAE' }}>Carregando reclamações...</p>
              </div>
            ) : paginatedReviews.length > 0 ? (
              paginatedReviews.map(r => <ReviewCard key={r.id} review={r} />)
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-sm" style={{ color: '#8A9BAE' }}>Nenhuma reclamação encontrada nesta categoria.</p>
              </div>
            )}
          </div>
        </div>

       {/* Pagination - Reclame Aqui style */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-0 mt-6">
            <button
              onClick={() => setPage(1)}
              disabled={page <= 1}
              aria-label="Primeira página"
              className="w-10 h-10 flex items-center justify-center rounded-l-lg border border-r-0 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F0F4F8] transition-colors"
              style={{ borderColor: '#D1D9E0', color: '#5A6872' }}
            >
              <span className="flex items-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M7 1L2 6l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="-ml-1"><path d="M7 1L2 6l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              aria-label="Página anterior"
              className="w-10 h-10 flex items-center justify-center border border-r-0 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F0F4F8] transition-colors"
              style={{ borderColor: '#D1D9E0', color: '#5A6872' }}
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M7 1L2 6l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span className="h-10 flex items-center px-4 border text-sm" style={{ borderColor: '#D1D9E0', color: '#5A6872' }}>
              <strong className="font-bold" style={{ color: '#1A2B3D' }}>{page}</strong>&nbsp;de {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              aria-label="Próxima página"
              className="w-10 h-10 flex items-center justify-center border border-l-0 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F0F4F8] transition-colors"
              style={{ borderColor: '#D1D9E0', color: '#5A6872' }}
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page >= totalPages}
              aria-label="Última página"
              className="w-10 h-10 flex items-center justify-center rounded-r-lg border border-l-0 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F0F4F8] transition-colors"
              style={{ borderColor: '#D1D9E0', color: '#5A6872' }}
            >
              <span className="flex items-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="-ml-1"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </button>
          </div>
        )}

        {!isLoading && allReviews.length > 0 && (
          <p className="text-center text-xs mt-3" style={{ color: '#8A9BAE' }}>
            Mostrando {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, allReviews.length)} de {allReviews.length} reclamações
          </p>
        )}
      </div>
    </div>
  );
};

export default Reclamacoes;
