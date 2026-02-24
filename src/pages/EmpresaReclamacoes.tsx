import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { CompanyPage } from "@/components/CompanyLayout";
import { useReviews, Review } from "@/hooks/use-reviews";
import Seo from "@/components/seo/Seo";

const PER_PAGE = 10;

const STATUS_FILTERS = [
  { key: "respondida", label: "Respondida" },
  { key: "nao_respondida", label: "Não respondida" },
  { key: "avaliada", label: "Avaliada" },
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
}: {
  statusFilters: string[];
  toggleStatus: (s: string) => void;
}) => {
  const [statusOpen, setStatusOpen] = useState(true);

  return (
    <div className="bg-background rounded border" style={{ borderColor: '#E1E3E5' }}>
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
    </div>
  );
};

/* ───────────── COMPLAINT CARD ───────────── */
const ComplaintCard = ({ complaint }: { complaint: Review }) => {
  const status = STATUS_MAP[complaint.status] || STATUS_MAP.nao_respondida;
  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('pt-BR'); } catch { return d; }
  };
  return (
    <div className="bg-background rounded" style={{ boxShadow: '0px 1px 2px rgba(0,0,0,0.16)', border: '1px solid #e1e3e5' }}>
      <Link to={`/reclamacao/${complaint.id}`} className="block p-4 hover:bg-[#f9f9f9] transition-colors">
        <p className="text-sm font-semibold leading-snug mb-2" style={{ color: '#000' }}>
          {complaint.title}
        </p>
        <p className="text-[13px] leading-relaxed mb-3 line-clamp-2" style={{ color: '#4B5963' }}>
          {complaint.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: status.bg }}
          >
            {status.emoji} {status.label}
          </span>
          <span className="text-xs" style={{ color: '#4B5963' }}>{formatDate(complaint.created_at)}</span>
          {complaint.category && (
            <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#f9f9f9', color: '#4B5963' }}>
              {complaint.category}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

/* ───────────── RIGHT SIDEBAR ───────────── */
const RightSidebar = ({ companyName }: { companyName: string }) => (
  <div className="space-y-4">
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
  if (totalPages <= 1) return null;
  const maxVisible = 5;
  const start = Math.max(1, page - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}
        className="w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#4B5963] hover:text-white transition-colors"
        style={{ borderColor: '#4B5963', color: '#4B5963' }}>‹</button>
      {pages.map((p) => (
        <button key={p} onClick={() => onPageChange(p)}
          className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold transition-colors ${p === page ? 'bg-[#4B5963] text-white' : 'hover:bg-[#4B5963] hover:text-white'}`}
          style={{ borderColor: '#4B5963', color: p === page ? '#fff' : '#4B5963' }}>{p}</button>
      ))}
      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}
        className="w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#4B5963] hover:text-white transition-colors"
        style={{ borderColor: '#4B5963', color: '#4B5963' }}>›</button>
      <span className="text-sm ml-2" style={{ color: '#4B5963' }}>Página <strong>{page}</strong> de <strong>{totalPages}</strong></span>
    </div>
  );
};

/* ───────────── PAGE ───────────── */
const EmpresaReclamacoes = () => {
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data: allReviews, isLoading } = useReviews();

  const toggleStatus = (s: string) =>
    setStatusFilters((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const filtered = (allReviews || []).filter((c) => {
    if (statusFilters.length > 0 && !statusFilters.includes(c.status)) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <CompanyPage>
      {({ cv }) => {
        const companyName = cv('company_name', 'Agro Brasil');
        return (
          <div className="min-h-[60vh]" style={{ backgroundColor: '#f9f9f9' }}>
            <Seo
              title={`Reclamações sobre ${companyName} - Reclame Aqui`}
              description={`Lista completa de reclamações sobre ${companyName}. Filtre por status e busque problemas específicos.`}
              keywords={["reclamações", companyName.toLowerCase(), "reclame aqui", "problemas"]}
              canonicalPath="/empresa-reclamacoes"
            />
            <div className="max-w-[1200px] mx-auto px-4 py-4 grid gap-4" style={{ gridTemplateColumns: '1fr' }}>
              <h2 className="text-lg md:text-xl font-semibold" style={{ color: '#000' }}>
                Reclamações sobre {companyName}
              </h2>

              <div className="grid gap-4" style={{ gridTemplateColumns: '1fr' }}>
                <button onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold"
                  style={{ color: '#4B5963', border: '1px solid #E1E3E5' }}>
                  <SlidersHorizontal className="w-4 h-4" /> Filtrar
                </button>

                {/* Desktop 3-col */}
                <div className="hidden lg:grid gap-4" style={{ gridTemplateColumns: '300px 1fr 320px' }}>
                  <FilterSidebar statusFilters={statusFilters} toggleStatus={toggleStatus} />
                  <div className="space-y-4">
                    <div className="relative">
                      <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        placeholder="Buscar reclamações..." className="w-full py-4 px-4 pr-12 rounded text-sm"
                        style={{ border: '1px solid #e1e3e5', color: '#000' }} />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2"><Search className="w-5 h-5" style={{ color: '#a9b0b5' }} /></div>
                    </div>
                    {isLoading ? (
                      <div className="bg-background rounded p-8 text-center" style={{ border: '1px solid #e1e3e5' }}>
                        <p className="text-sm" style={{ color: '#4B5963' }}>Carregando...</p>
                      </div>
                    ) : paginated.length === 0 ? (
                      <div className="bg-background rounded p-8 text-center" style={{ border: '1px solid #e1e3e5' }}>
                        <p className="text-sm" style={{ color: '#4B5963' }}>Nenhuma reclamação encontrada.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {paginated.map((c) => <ComplaintCard key={c.id} complaint={c} />)}
                      </div>
                    )}
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                  </div>
                  <RightSidebar companyName={companyName} />
                </div>

                {/* Mobile */}
                <div className="lg:hidden space-y-4">
                  {showMobileFilters && <FilterSidebar statusFilters={statusFilters} toggleStatus={toggleStatus} />}
                  <div className="relative">
                    <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                      placeholder="Buscar reclamações..." className="w-full py-3 px-4 pr-12 rounded text-sm"
                      style={{ border: '1px solid #e1e3e5', color: '#000' }} />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2"><Search className="w-5 h-5" style={{ color: '#a9b0b5' }} /></div>
                  </div>
                  {isLoading ? (
                    <div className="bg-background rounded p-8 text-center" style={{ border: '1px solid #e1e3e5' }}>
                      <p className="text-sm" style={{ color: '#4B5963' }}>Carregando...</p>
                    </div>
                  ) : paginated.length === 0 ? (
                    <div className="bg-background rounded p-8 text-center" style={{ border: '1px solid #e1e3e5' }}>
                      <p className="text-sm" style={{ color: '#4B5963' }}>Nenhuma reclamação encontrada.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {paginated.map((c) => <ComplaintCard key={c.id} complaint={c} />)}
                    </div>
                  )}
                  <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                  <RightSidebar companyName={companyName} />
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
