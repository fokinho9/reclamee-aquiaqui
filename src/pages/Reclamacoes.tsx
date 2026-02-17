import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

/* ───────────── MOCK DATA ───────────── */
const COMPLAINTS = [
  {
    id: "1",
    title: "Atraso na entrega de notebook comprado via pix na Amazon",
    desc: "Fiz a compra via pix de um notebook, na empresa amazon, no dia 23/12/2025, com prazo de entrega para o dia 05/01/2026. Além de não ter sido entregue o produto, não consta em nenhum campo uma garantia de entrega...",
    author: "João S.",
    city: "São Paulo - SP",
    time: "Há 1 hora",
    status: "respondida" as const,
    category: "Produto não recebido",
    reactions: { up: 12, down: 2 },
  },
  {
    id: "2",
    title: "Site em loop impede a geração do código de pré-envio para devolução.",
    desc: "O site está em loop, toda vez que abro a parte de devolução ele não encaminha para geração de código do pré-envio. Já tentei por diferentes navegadores e dispositivos.",
    author: "Maria C.",
    city: "Rio de Janeiro - RJ",
    time: "Há 2 horas",
    status: "respondida" as const,
    category: "Problemas com o site",
    reactions: { up: 8, down: 1 },
  },
  {
    id: "3",
    title: "Cobrança indevida no cartão após cancelamento de pedido",
    desc: "Cancelei um pedido no dia 10/01 e até agora não recebi o estorno no meu cartão de crédito. O valor de R$ 459,90 continua aparecendo na fatura.",
    author: "Carlos R.",
    city: "Belo Horizonte - MG",
    time: "Há 3 horas",
    status: "nao_respondida" as const,
    category: "Cobrança indevida",
    reactions: { up: 25, down: 3 },
  },
  {
    id: "4",
    title: "Produto chegou danificado e empresa não aceita troca",
    desc: "Comprei um monitor e chegou com a tela trincada. Ao solicitar troca, a empresa alega que o prazo de 7 dias já passou, porém fiz a solicitação no mesmo dia da entrega.",
    author: "Ana P.",
    city: "Curitiba - PR",
    time: "Há 5 horas",
    status: "avaliada" as const,
    category: "Produto com defeito",
    reactions: { up: 42, down: 5 },
    rating: 8,
  },
  {
    id: "5",
    title: "Reembolso prometido há 30 dias e nunca realizado",
    desc: "A Amazon prometeu reembolso de R$ 1.200 após devolução de produto. Já se passaram 30 dias e nenhum valor foi creditado. Todos os atendentes dizem que vão resolver mas nada acontece.",
    author: "Pedro L.",
    city: "Brasília - DF",
    time: "Há 6 horas",
    status: "nao_respondida" as const,
    category: "Reembolso",
    reactions: { up: 56, down: 8 },
  },
  {
    id: "6",
    title: "Assinatura Prime cobrada em duplicidade",
    desc: "Fui cobrado duas vezes pela assinatura Prime no mesmo mês. Já entrei em contato 3 vezes e cada atendente dá uma informação diferente sobre o estorno.",
    author: "Fernanda M.",
    city: "Porto Alegre - RS",
    time: "Há 8 horas",
    status: "respondida" as const,
    category: "Cobrança indevida",
    reactions: { up: 18, down: 2 },
  },
  {
    id: "7",
    title: "Entrega feita no endereço errado",
    desc: "Meu pedido foi marcado como entregue, porém não recebi nada. Ao verificar com o entregador, descobri que foi entregue em outro endereço.",
    author: "Lucas T.",
    city: "Recife - PE",
    time: "Há 12 horas",
    status: "avaliada" as const,
    category: "Produto não recebido",
    reactions: { up: 33, down: 4 },
    rating: 2,
  },
  {
    id: "8",
    title: "Produto diferente do anunciado na página",
    desc: "Comprei um fone de ouvido bluetooth modelo X e recebi o modelo Y, muito inferior. A foto e especificações do anúncio são completamente diferentes do produto recebido.",
    author: "Juliana F.",
    city: "Salvador - BA",
    time: "Há 1 dia",
    status: "respondida" as const,
    category: "Propaganda enganosa",
    reactions: { up: 29, down: 3 },
  },
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

const filterComplaints = (tab: TabKey) => {
  switch (tab) {
    case "nao_respondidas": return COMPLAINTS.filter(c => c.status === "nao_respondida");
    case "respondidas": return COMPLAINTS.filter(c => c.status === "respondida");
    case "avaliadas": return COMPLAINTS.filter(c => c.status === "avaliada");
    default: return COMPLAINTS;
  }
};

/* ───────────── HEADER (reusado) ───────────── */
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

/* ───────────── COMPLAINT CARD ───────────── */
const ComplaintCard = ({ complaint }: { complaint: typeof COMPLAINTS[0] }) => {
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
            {complaint.status === "avaliada" && complaint.rating !== undefined && (
              <span className="text-xs font-semibold" style={{ color: '#1A2B3D' }}>Nota: {complaint.rating}/10</span>
            )}
            <span className="text-xs ml-auto" style={{ color: '#8A9BAE' }}>{complaint.time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* ───────────── PAGE ───────────── */
const Reclamacoes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = (searchParams.get("tab") as TabKey) || "ultimas";
  const filtered = filterComplaints(currentTab);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />

      {/* Company mini header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-[900px] mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <Link to="/">
            <img src="/images/amazon-logo.jpg" alt="Amazon" className="w-12 h-12 rounded-full object-cover border-2 border-border" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold" style={{ color: '#1A2B3D' }}>Amazon</h1>
              <img src="/images/seal-ra-verified.png" alt="Verificada" className="w-5 h-5" />
            </div>
            <p className="text-xs" style={{ color: '#8A9BAE' }}>Reclamações dos consumidores</p>
          </div>
          <Link to="/" className="ml-auto text-xs font-semibold" style={{ color: '#2B6CB0' }}>
            ← Voltar ao perfil
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-background border-b" style={{ borderColor: '#E8ECF0' }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-6 flex">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setSearchParams({ tab: t.key })}
              className={`px-4 py-3 text-[13px] font-semibold border-b-2 transition-colors whitespace-nowrap ${
                currentTab === t.key
                  ? "border-[#2B6CB0] text-[#2B6CB0]"
                  : "border-transparent text-[#8A9BAE] hover:text-[#5A6872]"
              }`}
            >
              {t.label}
              <span className="ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: currentTab === t.key ? '#E5EEFB' : '#F0F4F8' }}>
                {filterComplaints(t.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-6">
        <div className="bg-background rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
          <div className="divide-y" style={{ borderColor: '#E8ECF0' }}>
            {filtered.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-sm" style={{ color: '#8A9BAE' }}>Nenhuma reclamação encontrada nesta categoria.</p>
              </div>
            ) : (
              filtered.map(c => <ComplaintCard key={c.id} complaint={c} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reclamacoes;
