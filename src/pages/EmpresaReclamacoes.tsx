import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { CompanyPage } from "@/components/CompanyLayout";

/* ───────────── MOCK DATA ───────────── */
const COMPLAINTS = [
  {
    id: "1",
    title: "Atraso na entrega de notebook comprado via pix na Amazon",
    desc: "Fiz a compra via pix de um notebook, na empresa amazon, no dia 23/12/2025, com prazo de entrega para o dia 05/01/2026. Além de não ter sido entregue o produto, não consta em nenhum campo uma garantia de entrega...",
    author: "João S.",
    city: "São Paulo - SP",
    time: "06/01/2025",
    status: "respondida" as const,
    category: "Produto não recebido",
  },
  {
    id: "2",
    title: "Site em loop impede a geração do código de pré-envio para devolução.",
    desc: "O site está em loop, toda vez que abro a parte de devolução ele não encaminha para geração de código do pré-envio. Já tentei por diferentes navegadores e dispositivos.",
    author: "Maria C.",
    city: "Rio de Janeiro - RJ",
    time: "06/01/2025",
    status: "respondida" as const,
    category: "Problemas com o site",
  },
  {
    id: "3",
    title: "Cobrança indevida no cartão após cancelamento de pedido",
    desc: "Cancelei um pedido no dia 10/01 e até agora não recebi o estorno no meu cartão de crédito. O valor de R$ 459,90 continua aparecendo na fatura.",
    author: "Carlos R.",
    city: "Belo Horizonte - MG",
    time: "05/01/2025",
    status: "nao_respondida" as const,
    category: "Cobrança indevida",
  },
  {
    id: "4",
    title: "Produto chegou danificado e empresa não aceita troca",
    desc: "Comprei um monitor e chegou com a tela trincada. Ao solicitar troca, a empresa alega que o prazo de 7 dias já passou, porém fiz a solicitação no mesmo dia da entrega.",
    author: "Ana P.",
    city: "Curitiba - PR",
    time: "05/01/2025",
    status: "avaliada" as const,
    category: "Produto com defeito",
    rating: 8,
  },
  {
    id: "5",
    title: "Reembolso prometido há 30 dias e nunca realizado",
    desc: "A Amazon prometeu reembolso de R$ 1.200 após devolução de produto. Já se passaram 30 dias e nenhum valor foi creditado. Todos os atendentes dizem que vão resolver mas nada acontece.",
    author: "Pedro L.",
    city: "Brasília - DF",
    time: "04/01/2025",
    status: "nao_respondida" as const,
    category: "Reembolso",
  },
  {
    id: "6",
    title: "Assinatura Prime cobrada em duplicidade",
    desc: "Fui cobrado duas vezes pela assinatura Prime no mesmo mês. Já entrei em contato 3 vezes e cada atendente dá uma informação diferente sobre o estorno.",
    author: "Fernanda M.",
    city: "Porto Alegre - RS",
    time: "04/01/2025",
    status: "respondida" as const,
    category: "Cobrança indevida",
  },
  {
    id: "7",
    title: "Entrega feita no endereço errado",
    desc: "Meu pedido foi marcado como entregue, porém não recebi nada. Ao verificar com o entregador, descobri que foi entregue em outro endereço.",
    author: "Lucas T.",
    city: "Recife - PE",
    time: "03/01/2025",
    status: "avaliada" as const,
    category: "Produto não recebido",
    rating: 2,
  },
  {
    id: "8",
    title: "Produto diferente do anunciado na página",
    desc: "Comprei um fone de ouvido bluetooth modelo X e recebi o modelo Y, muito inferior. A foto e especificações do anúncio são completamente diferentes do produto recebido.",
    author: "Juliana F.",
    city: "Salvador - BA",
    time: "03/01/2025",
    status: "respondida" as const,
    category: "Propaganda enganosa",
  },
];

const STATUS_FILTERS = [
  { key: "respondida", label: "Respondida" },
  { key: "nao_respondida", label: "Não respondida" },
  { key: "avaliada", label: "Avaliada" },
];

const PROBLEM_FILTERS = [
  "Produto não recebido",
  "Problemas com o site",
  "Cobrança indevida",
  "Produto com defeito",
  "Reembolso",
  "Propaganda enganosa",
];

const STATUS_MAP: Record<string, { label: string; emoji: string; bg: string }> = {
  respondida: { label: "Respondida", emoji: "😊", bg: "#38A169" },
  nao_respondida: { label: "Não respondida", emoji: "😕", bg: "#E53E3E" },
  avaliada: { label: "Avaliada", emoji: "⭐", bg: "#2B6CB0" },
};

/* ───────────── FILTER SIDEBAR ───────────── */
const FilterSidebar = ({
  statusFilters,
  toggleStatus,
  problemFilters,
  toggleProblem,
}: {
  statusFilters: string[];
  toggleStatus: (s: string) => void;
  problemFilters: string[];
  toggleProblem: (p: string) => void;
}) => {
  const [statusOpen, setStatusOpen] = useState(true);
  const [problemOpen, setProblemOpen] = useState(true);

  return (
    <div className="bg-background rounded border" style={{ borderColor: '#E1E3E5' }}>
      {/* Status */}
      <button
        onClick={() => setStatusOpen(!statusOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold"
        style={{ color: '#000' }}
      >
        <span>Status</span>
        {statusOpen ? <ChevronUp className="w-4 h-4" style={{ color: '#4B5963' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#4B5963' }} />}
      </button>
      {statusOpen && (
        <div className="px-4 pb-3 space-y-2">
          {STATUS_FILTERS.map((f) => (
            <label key={f.key} className="flex items-center gap-2 cursor-pointer hover:bg-[#edf1ff] rounded p-1 transition-colors">
              <input
                type="checkbox"
                checked={statusFilters.includes(f.key)}
                onChange={() => toggleStatus(f.key)}
                className="w-[18px] h-[18px] rounded-sm border-2 accent-[#1f69c1] cursor-pointer"
                style={{ borderColor: '#4B5963' }}
              />
              <span className="text-sm" style={{ color: '#000' }}>{f.label}</span>
            </label>
          ))}
        </div>
      )}

      <hr style={{ border: 0, height: 1, background: 'rgba(181,181,181,0.3)' }} />

      {/* Problem type */}
      <button
        onClick={() => setProblemOpen(!problemOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold"
        style={{ color: '#000' }}
      >
        <span>Tipo de problema</span>
        {problemOpen ? <ChevronUp className="w-4 h-4" style={{ color: '#4B5963' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#4B5963' }} />}
      </button>
      {problemOpen && (
        <div className="px-4 pb-3 space-y-2">
          {PROBLEM_FILTERS.map((p) => (
            <label key={p} className="flex items-center gap-2 cursor-pointer hover:bg-[#edf1ff] rounded p-1 transition-colors">
              <input
                type="checkbox"
                checked={problemFilters.includes(p)}
                onChange={() => toggleProblem(p)}
                className="w-[18px] h-[18px] rounded-sm border-2 accent-[#1f69c1] cursor-pointer"
                style={{ borderColor: '#4B5963' }}
              />
              <span className="text-sm" style={{ color: '#000' }}>{p}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

/* ───────────── COMPLAINT CARD ───────────── */
const ComplaintCard = ({ complaint }: { complaint: typeof COMPLAINTS[0] }) => {
  const status = STATUS_MAP[complaint.status];
  return (
    <div className="bg-background rounded" style={{ boxShadow: '0px 1px 2px rgba(0,0,0,0.16)', border: '1px solid #e1e3e5' }}>
      <Link to={`/reclamacao/${complaint.id}`} className="block p-4 hover:bg-[#f9f9f9] transition-colors">
        <p className="text-sm font-semibold leading-snug mb-2" style={{ color: '#000' }}>
          {complaint.title}
        </p>
        <p className="text-[13px] leading-relaxed mb-3 line-clamp-2" style={{ color: '#4B5963' }}>
          {complaint.desc}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: status.bg }}
          >
            {status.emoji} {status.label}
          </span>
          <span className="text-xs" style={{ color: '#4B5963' }}>{complaint.time}</span>
          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#f9f9f9', color: '#4B5963' }}>
            {complaint.category}
          </span>
        </div>
      </Link>
    </div>
  );
};

/* ───────────── RIGHT SIDEBAR ───────────── */
const RightSidebar = ({ companyName }: { companyName: string }) => (
  <div className="space-y-4">
    {/* CTA */}
    <div className="bg-background rounded p-4 space-y-3" style={{ border: '1px solid #e1e3e5' }}>
      <p className="text-sm font-semibold text-center" style={{ color: '#4B5963' }}>
        Você também tem um problema com {companyName}?
      </p>
      <button className="w-full py-3 rounded font-semibold text-sm text-white" style={{ backgroundColor: '#DF2930' }}>
        Reclamar
      </button>
      <button className="w-full py-3 rounded font-semibold text-sm" style={{ color: '#4B5963', border: '1px solid #4B5963' }}>
        Ir para o atendimento
      </button>
    </div>

    {/* Seus pedidos */}
    <div className="bg-background rounded p-4" style={{ border: '1px solid #e1e3e5' }}>
      <h4 className="text-sm font-semibold mb-2" style={{ color: '#000' }}>Seus pedidos</h4>
      <p className="text-[13px] mb-3" style={{ color: '#4B5963' }}>
        Acesse informações de entrega e pedidos na página da {companyName}.
      </p>
      <button className="w-full py-2.5 rounded font-semibold text-sm text-white" style={{ backgroundColor: '#1f69c1' }}>
        Consultar pedidos
      </button>
    </div>

    {/* Reputation */}
    <div className="bg-background rounded p-4" style={{ border: '1px solid #e1e3e5' }}>
      <p className="text-xs mb-2" style={{ color: '#4B5963' }}>Reputação de {companyName}</p>
      <div className="flex items-center gap-3">
        <img src="/images/reputation-otimo.webp" alt="Ótimo" className="w-10 h-10" />
        <div>
          <p className="text-xs" style={{ color: '#4B5963' }}>Reputação</p>
          <p className="font-bold text-sm uppercase" style={{ color: '#000' }}>ÓTIMO</p>
        </div>
      </div>
    </div>
  </div>
);

/* ───────────── PAGINATION ───────────── */
const Pagination = ({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) => {
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#4B5963] hover:text-white transition-colors"
        style={{ borderColor: '#4B5963', color: '#4B5963' }}
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold transition-colors ${
            p === page ? 'bg-[#4B5963] text-white' : 'hover:bg-[#4B5963] hover:text-white'
          }`}
          style={{ borderColor: '#4B5963', color: p === page ? '#fff' : '#4B5963' }}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#4B5963] hover:text-white transition-colors"
        style={{ borderColor: '#4B5963', color: '#4B5963' }}
      >
        ›
      </button>
      <span className="text-sm ml-2" style={{ color: '#4B5963' }}>
        Página <strong>{page}</strong> de <strong>{totalPages}</strong>
      </span>
    </div>
  );
};

/* ───────────── PAGE ───────────── */
const EmpresaReclamacoes = () => {
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [problemFilters, setProblemFilters] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleStatus = (s: string) =>
    setStatusFilters((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const toggleProblem = (p: string) =>
    setProblemFilters((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const filtered = COMPLAINTS.filter((c) => {
    if (statusFilters.length > 0 && !statusFilters.includes(c.status)) return false;
    if (problemFilters.length > 0 && !problemFilters.includes(c.category)) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / 10));

  return (
    <CompanyPage>
      {({ cv }) => {
        const companyName = cv('company_name', 'Amazon');
        return (
          <div className="min-h-[60vh]" style={{ backgroundColor: '#f9f9f9' }}>
            <div
              className="max-w-[1200px] mx-auto px-4 py-4 grid gap-4"
              style={{
                gridTemplateColumns: '1fr',
              }}
            >
              {/* Title */}
              <h2 className="text-lg md:text-xl font-semibold" style={{ color: '#000' }}>
                Reclamações sobre {companyName}
              </h2>

              {/* 3-column layout on desktop */}
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: '1fr',
                }}
              >
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold"
                  style={{ color: '#4B5963', border: '1px solid #E1E3E5' }}
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filtrar
                </button>

                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateAreas: "'content'",
                  }}
                >
                  {/* Desktop: 3-col grid */}
                  <div className="hidden lg:grid gap-4" style={{ gridTemplateColumns: '300px 1fr 320px' }}>
                    {/* Left sidebar - filters */}
                    <div className="space-y-4">
                      <FilterSidebar
                        statusFilters={statusFilters}
                        toggleStatus={toggleStatus}
                        problemFilters={problemFilters}
                        toggleProblem={toggleProblem}
                      />
                    </div>

                    {/* Center content */}
                    <div className="space-y-4">
                      {/* Search */}
                      <div className="relative">
                        <input
                          type="text"
                          value={search}
                          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                          placeholder="Buscar reclamações..."
                          className="w-full py-4 px-4 pr-12 rounded text-sm"
                          style={{ border: '1px solid #e1e3e5', color: '#000' }}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <Search className="w-5 h-5" style={{ color: '#a9b0b5' }} />
                        </div>
                      </div>

                      {/* Complaint list */}
                      {filtered.length === 0 ? (
                        <div className="bg-background rounded p-8 text-center" style={{ border: '1px solid #e1e3e5' }}>
                          <p className="text-sm" style={{ color: '#4B5963' }}>Nenhuma reclamação encontrada.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filtered.map((c) => (
                            <ComplaintCard key={c.id} complaint={c} />
                          ))}
                        </div>
                      )}

                      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                    </div>

                    {/* Right sidebar */}
                    <RightSidebar companyName={companyName} />
                  </div>

                  {/* Mobile layout */}
                  <div className="lg:hidden space-y-4">
                    {/* Mobile filters */}
                    {showMobileFilters && (
                      <FilterSidebar
                        statusFilters={statusFilters}
                        toggleStatus={toggleStatus}
                        problemFilters={problemFilters}
                        toggleProblem={toggleProblem}
                      />
                    )}

                    {/* Search */}
                    <div className="relative">
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        placeholder="Buscar reclamações..."
                        className="w-full py-3 px-4 pr-12 rounded text-sm"
                        style={{ border: '1px solid #e1e3e5', color: '#000' }}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Search className="w-5 h-5" style={{ color: '#a9b0b5' }} />
                      </div>
                    </div>

                    {/* Complaint list */}
                    {filtered.length === 0 ? (
                      <div className="bg-background rounded p-8 text-center" style={{ border: '1px solid #e1e3e5' }}>
                        <p className="text-sm" style={{ color: '#4B5963' }}>Nenhuma reclamação encontrada.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filtered.map((c) => (
                          <ComplaintCard key={c.id} complaint={c} />
                        ))}
                      </div>
                    )}

                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

                    {/* Right sidebar on mobile below */}
                    <RightSidebar companyName={companyName} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </CompanyPage>
  );
};

export default EmpresaReclamacoes;
