import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { StoreCompanyPage } from "@/components/CompanyLayout";
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

const FilterSidebar = ({ statusFilters, toggleStatus }: { statusFilters: string[]; toggleStatus: (s: string) => void }) => {
  const [statusOpen, setStatusOpen] = useState(true);
  return (
    <div className="bg-background rounded border" style={{ borderColor: '#E1E3E5' }}>
      <button onClick={() => setStatusOpen(!statusOpen)} className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold" style={{ color: '#000' }}>
        <span>Status</span>
        {statusOpen ? <ChevronUp className="w-4 h-4" style={{ color: '#4B5963' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#4B5963' }} />}
      </button>
      {statusOpen && (
        <div className="px-4 pb-3 space-y-2">
          {STATUS_FILTERS.map((f) => (
            <label key={f.key} className="flex items-center gap-2 cursor-pointer hover:bg-[#edf1ff] rounded p-1 transition-colors">
              <input type="checkbox" checked={statusFilters.includes(f.key)} onChange={() => toggleStatus(f.key)} className="w-[18px] h-[18px] rounded-sm border-2 accent-[#1f69c1] cursor-pointer" style={{ borderColor: '#4B5963' }} />
              <span className="text-sm" style={{ color: '#000' }}>{f.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const ComplaintCard = ({ complaint }: { complaint: Review }) => {
  const status = STATUS_MAP[complaint.status] || STATUS_MAP.nao_respondida;
  const formatDate = (d: string) => { try { return new Date(d).toLocaleDateString('pt-BR'); } catch { return d; } };
  return (
    <div className="bg-background rounded" style={{ boxShadow: '0px 1px 2px rgba(0,0,0,0.16)', border: '1px solid #e1e3e5' }}>
      <Link to={`/reclamacao/${complaint.id}`} className="block p-4 hover:bg-[#f9f9f9] transition-colors">
        <p className="text-sm font-semibold leading-snug mb-2" style={{ color: '#000' }}>{complaint.title}</p>
        <p className="text-[13px] leading-relaxed mb-3 line-clamp-2" style={{ color: '#4B5963' }}>{complaint.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: status.bg }}>{status.emoji} {status.label}</span>
          <span className="text-xs" style={{ color: '#4B5963' }}>{formatDate(complaint.created_at)}</span>
        </div>
      </Link>
    </div>
  );
};

const Pagination = ({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) => {
  if (totalPages <= 1) return null;
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className="w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold disabled:opacity-40" style={{ borderColor: '#4B5963', color: '#4B5963' }}>‹</button>
      {pages.map((p) => (
        <button key={p} onClick={() => onPageChange(p)} className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold ${p === page ? 'bg-[#4B5963] text-white' : ''}`} style={{ borderColor: '#4B5963', color: p === page ? '#fff' : '#4B5963' }}>{p}</button>
      ))}
      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)} className="w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold disabled:opacity-40" style={{ borderColor: '#4B5963', color: '#4B5963' }}>›</button>
    </div>
  );
};

const StoreReclamacoes = () => {
  const { storeId } = useParams();
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { data: allReviews, isLoading } = useReviews(undefined, storeId);

  const toggleStatus = (s: string) => setStatusFilters((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const filtered = (allReviews || []).filter((c) => {
    if (statusFilters.length > 0 && !statusFilters.includes(c.status)) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <StoreCompanyPage>
      {({ cv }) => {
        const companyName = cv('company_name', 'Empresa');
        return (
          <div className="min-h-[60vh]" style={{ backgroundColor: '#f9f9f9' }}>
            <Seo title={`Reclamações sobre ${companyName} - Reclame Aqui`} description={`Lista de reclamações sobre ${companyName}.`} canonicalPath="#" />
            <h2 className="text-lg md:text-xl font-semibold mb-4" style={{ color: '#000' }}>Reclamações sobre {companyName}</h2>
            <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="lg:hidden flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold mb-4" style={{ color: '#4B5963', border: '1px solid #E1E3E5' }}>
              <SlidersHorizontal className="w-4 h-4" /> Filtrar
            </button>
            <div className="hidden lg:grid gap-4" style={{ gridTemplateColumns: '300px 1fr' }}>
              <FilterSidebar statusFilters={statusFilters} toggleStatus={toggleStatus} />
              <div className="space-y-4">
                <div className="relative">
                  <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Buscar reclamações..." className="w-full py-4 px-4 pr-12 rounded text-sm" style={{ border: '1px solid #e1e3e5' }} />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2"><Search className="w-5 h-5" style={{ color: '#a9b0b5' }} /></div>
                </div>
                {isLoading ? <p className="text-sm p-8 text-center" style={{ color: '#4B5963' }}>Carregando...</p> : paginated.length === 0 ? <p className="text-sm p-8 text-center" style={{ color: '#4B5963' }}>Nenhuma reclamação encontrada.</p> : (
                  <div className="space-y-4">{paginated.map((c) => <ComplaintCard key={c.id} complaint={c} />)}</div>
                )}
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            </div>
            <div className="lg:hidden space-y-4">
              {showMobileFilters && <FilterSidebar statusFilters={statusFilters} toggleStatus={toggleStatus} />}
              <div className="relative">
                <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Buscar reclamações..." className="w-full py-3 px-4 pr-12 rounded text-sm" style={{ border: '1px solid #e1e3e5' }} />
                <div className="absolute right-4 top-1/2 -translate-y-1/2"><Search className="w-5 h-5" style={{ color: '#a9b0b5' }} /></div>
              </div>
              {isLoading ? <p className="text-sm p-8 text-center" style={{ color: '#4B5963' }}>Carregando...</p> : paginated.length === 0 ? <p className="text-sm p-8 text-center" style={{ color: '#4B5963' }}>Nenhuma reclamação encontrada.</p> : (
                <div className="space-y-3">{paginated.map((c) => <ComplaintCard key={c.id} complaint={c} />)}</div>
              )}
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        );
      }}
    </StoreCompanyPage>
  );
};

export default StoreReclamacoes;
