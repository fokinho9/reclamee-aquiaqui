import { useParams, Link } from "react-router-dom";
import { useReview } from "@/hooks/use-reviews";
import { useSiteContent, useContentValue } from "@/hooks/use-site-content";
import { Header } from "@/components/CompanyLayout";
import { MapPin, Calendar, ThumbsUp, Hand, Angry, Share2 } from "lucide-react";
import Seo from "@/components/seo/Seo";

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; img: string }> = {
  respondida: { label: "Respondida", bg: "#BFDBFE", color: "#1E40AF", img: "/images/icons/rep-bom.png" },
  nao_respondida: { label: "Não respondida", bg: "#FEE2E2", color: "#991B1B", img: "/images/icons/rep-ruim.png" },
  avaliada: { label: "Resolvido", bg: "#BBF7D0", color: "#166534", img: "/images/icons/rep-otimo.webp" },
};

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  } catch {
    return dateStr;
  }
}

const Reclamacao = () => {
  const { id } = useParams<{ id: string }>();
  const isUuid = id && id.length > 10;
  const { data: dbReview, isLoading } = useReview(isUuid ? id : undefined);
  const { data: content } = useSiteContent();
  const cv = (key: string, fallback: string) => useContentValue(content, key, fallback);

  const companyName = cv("company_name", "Agro Brasil");
  const companyLogo = cv("company_logo", "/placeholder.svg");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <div className="max-w-[1286px] mx-auto px-4 py-20 text-center">
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!dbReview) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <div className="max-w-[1286px] mx-auto px-4 py-20 text-center">
          <h1 className="text-xl font-bold mb-2 text-foreground">Reclamação não encontrada</h1>
          <Link to="/reclamacoes" className="text-sm font-semibold text-primary">← Voltar às reclamações</Link>
        </div>
      </div>
    );
  }

  const status = STATUS_CONFIG[dbReview.status] || STATUS_CONFIG.nao_respondida;
  const formattedDate = formatDate(dbReview.created_at);

  // Parse full_text for response and final consideration sections
  let mainDescription = dbReview.full_text || dbReview.description;
  let responseFromText: string | null = null;
  let finalConsideration: string | null = null;

  if (mainDescription.includes("--- Resposta da empresa ---")) {
    const parts = mainDescription.split("--- Resposta da empresa ---");
    mainDescription = parts[0].trim();
    let rest = parts[1] || "";
    if (rest.includes("--- Consideração final do consumidor ---")) {
      const parts2 = rest.split("--- Consideração final do consumidor ---");
      responseFromText = parts2[0].trim();
      finalConsideration = parts2[1]?.trim() || null;
    } else {
      responseFromText = rest.trim();
    }
  }

  const responseText = dbReview.response_text || responseFromText;

  return (
    <div className="min-h-screen bg-muted/30">
      <Seo
        title={`${dbReview.title} - ${companyName} | Reclame Aqui`}
        description={dbReview.description.substring(0, 155)}
        canonicalPath={`/reclamacao/${id}`}
      />
      <Header />

      <div className="max-w-[1286px] mx-auto px-4 md:px-6 py-6">
        <div className="flex justify-between max-lg:flex-col gap-6">

          {/* ───── LEFT: Main content (70%) ───── */}
          <section className="w-[70%] max-lg:w-full">
            <article>
              {/* Title + Status */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {/* "Veja também" nav */}
                  <nav className="mt-2 mb-4 max-lg:hidden">
                    <ul className="flex gap-5 items-center">
                      <li className="text-sm text-muted-foreground">Veja também</li>
                      <li><Link to="/empresa-reclamacoes" className="text-sm text-primary hover:underline">todas as reclamações</Link></li>
                      <li><Link to="/empresa-reclamacoes?status=nao_respondidas" className="text-sm text-primary hover:underline">não respondidas</Link></li>
                      <li><Link to="/empresa-reclamacoes?status=respondidas" className="text-sm text-primary hover:underline">respondidas</Link></li>
                      <li><Link to="/empresa-reclamacoes?status=avaliadas" className="text-sm text-primary hover:underline">finalizadas</Link></li>
                    </ul>
                  </nav>

                  <h1
                    className="text-foreground text-4xl max-md:text-2xl font-bold md:w-full my-5 pr-10 max-lg:pr-0 max-lg:my-6 break-words"
                    style={{ wordBreak: "break-word" }}
                  >
                    {dbReview.title}
                  </h1>
                </div>

                {/* Status badge - desktop */}
                <div className="max-lg:hidden flex-shrink-0">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={status.img}
                      alt={status.label}
                      className="p-3 rounded-full w-16 mb-[-12px]"
                      style={{ backgroundColor: status.bg }}
                    />
                    <p
                      className="p-4 rounded-2xl text-base text-center font-bold"
                      style={{ backgroundColor: status.bg, color: status.color }}
                    >
                      {status.label}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company name + meta */}
              <section className="mb-4">
                <div>
                  <Link to="/" className="text-primary font-bold text-base">{companyName}</Link>
                </div>

                <div className="flex gap-4 mt-2 max-lg:flex-wrap text-sm text-foreground">
                  <p className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {dbReview.author_city || "São Paulo - SP"}
                  </p>
                  <p className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formattedDate}
                  </p>
                  <p>
                    <b>ID: </b>{dbReview.id.substring(0, 8)}
                  </p>
                </div>

                {/* Status badge - mobile */}
                <div className="lg:hidden">
                  <section className="flex items-center gap-2 my-5">
                    <p className="text-sm font-bold text-foreground">Status da reclamação:</p>
                    <div
                      className="inline-flex items-center rounded-lg p-2 gap-2"
                      style={{ backgroundColor: status.bg, color: status.color }}
                    >
                      <img src={status.img} alt={status.label} className="w-6" />
                      <p className="text-base text-center font-bold">{status.label}</p>
                    </div>
                  </section>
                </div>
              </section>

              {/* Category tag */}
              {dbReview.category && (
                <nav className="mb-8 max-lg:hidden">
                  <ul className="flex gap-3">
                    <li>
                      <span className="bg-primary/10 py-1 px-3 rounded-full text-primary text-base">
                        {dbReview.category}
                      </span>
                    </li>
                  </ul>
                </nav>
              )}

              {/* Description */}
              <p className="text-foreground mt-4 mb-10 text-base break-words leading-relaxed">
                {mainDescription}
              </p>

              {/* Reactions */}
              <div className="flex flex-col gap-5 mb-5">
                <div className="relative mb-6">
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center gap-1">
                      <button className="flex items-center justify-center w-9 h-9 rounded-full border border-border transition-all hover:bg-muted">
                        <ThumbsUp className="w-5 h-5 text-foreground" />
                      </button>
                      <span className="text-xs text-muted-foreground">{dbReview.reactions_up}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <button className="flex items-center justify-center w-9 h-9 rounded-full border border-border transition-all hover:bg-muted">
                        <Hand className="w-5 h-5 text-foreground" />
                      </button>
                      <span className="text-xs text-muted-foreground">Eu também</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <button className="flex items-center justify-center w-9 h-9 rounded-full border border-border transition-all hover:bg-muted">
                        <Angry className="w-5 h-5 text-foreground" />
                      </button>
                      <span className="text-xs text-muted-foreground">Revoltante</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share */}
              <section className="flex gap-4 items-center justify-end mb-11">
                <p className="text-foreground text-sm">Compartilhe</p>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0965FE" }}>
                  <span className="text-white text-xs font-bold">f</span>
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-black">
                  <span className="text-white text-xs font-bold">𝕏</span>
                </button>
              </section>

              {/* Company response */}
              {responseText && (
                <section
                  className="text-base leading-6 my-8 border border-solid rounded-lg p-8 max-lg:p-4"
                  style={{ backgroundColor: "#f8f9ff", borderColor: "#c9c9c9" }}
                >
                  <div className="flex items-center justify-between max-lg:flex-col max-lg:items-start">
                    <h2 className="font-bold text-foreground text-2xl max-lg:text-base">Resposta da empresa</h2>
                    {dbReview.response_time && (
                      <p className="text-foreground text-sm">{dbReview.response_time}</p>
                    )}
                  </div>
                  <p className="my-4 text-foreground break-words whitespace-pre-line">{responseText}</p>
                </section>
              )}

              {/* Awaiting response */}
              {!responseText && (
                <section
                  className="text-base leading-6 my-8 border border-solid rounded-lg p-8 max-lg:p-4 text-center"
                  style={{ backgroundColor: "#FFF5F5", borderColor: "#FED7D7" }}
                >
                  <p className="text-sm font-semibold" style={{ color: "#E53E3E" }}>😕 Aguardando resposta da empresa</p>
                  <p className="text-xs mt-1 text-muted-foreground">A empresa ainda não respondeu esta reclamação.</p>
                </section>
              )}

              {/* Final consideration */}
              {finalConsideration && (
                <section className="rounded-lg border border-solid my-8" style={{ borderColor: "#c9c9c9" }}>
                  <div
                    className="text-base leading-6 mb-8 p-8 max-lg:p-4 rounded-t-lg text-white"
                    style={{ backgroundColor: "#22C55E" }}
                  >
                    <div className="flex items-center justify-between max-lg:flex-col max-lg:items-start">
                      <h2 className="font-bold text-2xl max-lg:text-base">Consideração final do consumidor</h2>
                    </div>
                    <p className="my-4 break-words whitespace-pre-line">{finalConsideration}</p>
                  </div>

                  <div className="flex items-start justify-between pb-8 px-8 max-lg:px-4 max-lg:flex-col max-lg:items-start gap-6">
                    <div className="text-center">
                      <p className="text-foreground mb-1 text-sm">O problema foi resolvido?</p>
                      <div className="flex flex-col items-center">
                        <img
                          src={status.img}
                          alt={status.label}
                          className="p-3 rounded-full w-16 mb-[-12px]"
                          style={{ backgroundColor: status.bg }}
                        />
                        <p
                          className="p-4 rounded-2xl text-base text-center font-bold"
                          style={{ backgroundColor: status.bg, color: status.color }}
                        >
                          {status.label}
                        </p>
                      </div>
                    </div>

                    {dbReview.rating != null && (
                      <div className="text-center">
                        <p className="text-foreground mb-5 text-sm">Nota do atendimento</p>
                        <p
                          className="flex items-center justify-center font-bold text-3xl text-white w-20 h-20 rounded-full mx-auto"
                          style={{ backgroundColor: "#1D4ED8" }}
                        >
                          {dbReview.rating}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Rating without final consideration */}
              {!finalConsideration && dbReview.status === "avaliada" && dbReview.rating != null && (
                <section
                  className="my-8 rounded-lg border p-8 max-lg:p-4"
                  style={{ borderColor: "#c9c9c9" }}
                >
                  <div className="flex items-center gap-8 justify-center">
                    <div className="text-center">
                      <p className="text-foreground mb-2 text-sm">Status</p>
                      <div className="flex flex-col items-center">
                        <img src={status.img} alt={status.label} className="p-2 rounded-full w-14 mb-[-10px]" style={{ backgroundColor: status.bg }} />
                        <p className="p-3 rounded-2xl text-sm text-center font-bold" style={{ backgroundColor: status.bg, color: status.color }}>{status.label}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-foreground mb-2 text-sm">Nota do atendimento</p>
                      <p className="flex items-center justify-center font-bold text-3xl text-white w-20 h-20 rounded-full mx-auto" style={{ backgroundColor: "#1D4ED8" }}>
                        {dbReview.rating}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </article>
          </section>

          {/* ───── RIGHT: Sidebar (25%) ───── */}
          <aside className="w-[25%] max-lg:w-full flex flex-col items-center gap-5">
            {/* Company card */}
            <section className="w-full border rounded-lg bg-background self-start" style={{ borderColor: "#c9c9c9" }}>
              <div className="flex items-center justify-center w-full mt-5">
                <div className="w-20 h-20 rounded-full border-2 border-border overflow-hidden bg-muted">
                  <img src={companyLogo} alt={companyName} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex gap-3 justify-center items-center px-6">
                <h2 className="text-center my-5 text-lg text-foreground font-normal">{companyName}</h2>
                <img className="w-5" src="/images/seal-ra-verified.png" alt="Empresa verificada" />
              </div>

              <section className="flex items-center justify-center gap-1 rounded-full py-2 px-4 w-fit mx-auto" style={{ backgroundColor: "#DBEAFE" }}>
                <img className="w-5" src="/images/seal-ra-verified.png" alt="Empresa verificada" />
                <p className="text-sm text-foreground font-semibold">Verificada</p>
              </section>

              <div className="mt-5 text-center">
                <Link to="/sobre" className="text-primary text-sm inline-flex items-center gap-1">
                  Entenda sobre a verificação
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" /></svg>
                </Link>
              </div>

              <div className="border-b border-border w-5/6 mx-auto my-5" />

              <h3 className="text-center my-3 text-base font-semibold text-foreground">Reputação da empresa:</h3>
              <section className="mb-5 flex items-center justify-center gap-4">
                <img src="/images/reputation-otimo.webp" alt="Reputação" className="w-16 h-16" />
                <div>
                  <p className="font-bold text-foreground">{cv("reputation_label", "ÓTIMO")}</p>
                  <p className="font-bold">
                    <span className="text-lg">{cv("reputation_score", "7.4")}</span>
                    <span className="text-base"> / 10</span>
                  </p>
                </div>
              </section>

              <Link to="/" className="text-primary text-sm font-normal inline-flex items-center gap-1 justify-center w-full mb-5">
                Ver página da empresa
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" /></svg>
              </Link>
            </section>

            {/* CTA card */}
            <section className="w-full border rounded-lg bg-background self-start" style={{ borderColor: "#c9c9c9" }}>
              <div className="p-4 flex flex-col items-center justify-center gap-3">
                <p className="text-center text-foreground my-2">
                  Está com problema com <b>{companyName}</b>?
                </p>
                <Link
                  to="/empresa-reclamacoes"
                  className="inline-flex items-center justify-center gap-2 rounded-xl text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 h-12 px-4 w-full font-bold py-7"
                >
                  📢 Reclamar
                </Link>
              </div>
            </section>
          </aside>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link to="/reclamacoes" className="text-sm font-semibold text-primary">← Voltar às reclamações</Link>
        </div>
      </div>
    </div>
  );
};

export default Reclamacao;
