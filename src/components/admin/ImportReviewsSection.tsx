import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Loader2, Download, Trash2, Plus, Save, ExternalLink, CheckCircle, Play, Square } from "lucide-react";

interface WordReplacement {
  id: string;
  original_word: string;
  replacement_word: string;
  is_active: boolean;
}

interface ImportedReview {
  id?: string;
  title: string;
  description: string;
  full_text: string;
  author_name: string;
  status: string;
}

const ImportReviewsSection = () => {
  const [open, setOpen] = useState(true);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<ImportedReview[]>([]);
  const [saved, setSaved] = useState(false);
  const [liveImports, setLiveImports] = useState<ImportedReview[]>([]);

  // Pagination import state
  const [paginationImporting, setPaginationImporting] = useState(false);
  const [paginationUrl, setPaginationUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImported, setTotalImported] = useState(0);
  const [pageLog, setPageLog] = useState<string[]>([]);
  const [stopRequested, setStopRequested] = useState(false);

  // Deep import state
  const [deepImporting, setDeepImporting] = useState(false);
  const [deepImportUrl, setDeepImportUrl] = useState("");
  const [deepImportLog, setDeepImportLog] = useState<string[]>([]);
  const [deepImportStatus, setDeepImportStatus] = useState("");
  const [deepStopRequested, setDeepStopRequested] = useState(false);

  // Word replacements
  const [replacements, setReplacements] = useState<WordReplacement[]>([]);
  const [newOriginal, setNewOriginal] = useState("");
  const [newReplacement, setNewReplacement] = useState("");
  const [loadingReplacements, setLoadingReplacements] = useState(true);
  const { toast } = useToast();

  // Load word replacements
  useEffect(() => {
    loadReplacements();
  }, []);

  // Subscribe to realtime inserts on reviews table
  useEffect(() => {
    if (!loading && !paginationImporting && liveImports.length === 0) return;

    const channel = supabase
      .channel("reviews-import")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reviews" },
        (payload) => {
          const newReview = payload.new as ImportedReview;
          setLiveImports((prev) => [...prev, newReview]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loading, paginationImporting]);

  const loadReplacements = async () => {
    setLoadingReplacements(true);
    const { data } = await supabase
      .from("word_replacements")
      .select("*")
      .order("created_at", { ascending: true });
    setReplacements((data as WordReplacement[]) || []);
    setLoadingReplacements(false);
  };

  const addReplacement = async () => {
    if (!newOriginal.trim() || !newReplacement.trim()) {
      toast({ title: "Erro", description: "Preencha ambos os campos.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("word_replacements").insert({
      original_word: newOriginal.trim(),
      replacement_word: newReplacement.trim(),
    });
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    setNewOriginal("");
    setNewReplacement("");
    loadReplacements();
    toast({ title: "Adicionado!", description: `"${newOriginal}" → "${newReplacement}"` });
  };

  const deleteReplacement = async (id: string) => {
    await supabase.from("word_replacements").delete().eq("id", id);
    loadReplacements();
  };

  const handleScrape = async (save: boolean) => {
    if (!url.trim()) {
      toast({ title: "Erro", description: "Cole a URL do Reclame Aqui.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setSaved(false);
    setPreviews([]);
    if (save) setLiveImports([]);

    try {
      const { data, error } = await supabase.functions.invoke("scrape-reclameaqui", {
        body: { url: url.trim(), saveToDb: save },
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Erro ao importar");

      setPreviews(data.reviews || []);
      if (save && data.saved) {
        setSaved(true);
        toast({ title: "Importado!", description: `${data.reviews?.length || 0} reclamações salvas no banco.` });
      } else if (!save) {
        toast({ title: "Preview pronto!", description: `${data.reviews?.length || 0} reclamações encontradas. Clique em "Importar" para salvar.` });
      }
    } catch (err: any) {
      toast({ title: "Erro", description: err.message || "Falha ao importar.", variant: "destructive" });
    }
    setLoading(false);
  };

  // Pagination import - page by page
  const startPaginationImport = async () => {
    if (!paginationUrl.trim()) {
      toast({ title: "Erro", description: "Cole a URL do Reclame Aqui para importar.", variant: "destructive" });
      return;
    }
    setPaginationImporting(true);
    setStopRequested(false);
    setCurrentPage(1);
    setTotalImported(0);
    setPageLog([]);
    setLiveImports([]);

    let page = 1;
    let hasMore = true;
    let total = 0;
    let stopRef = false;

    const importPage = async (p: number): Promise<{ imported: number; hasMore: boolean; stopped: boolean }> => {
      setCurrentPage(p);
      setPageLog(prev => [...prev, `⏳ Importando página ${p}...`]);

      try {
        const { data, error } = await supabase.functions.invoke("auto-import-reviews", {
          body: { page: p, url: paginationUrl.trim() },
        });

        if (error) throw error;
        if (!data?.success) throw new Error(data?.error || "Erro");

        const imported = data.imported || 0;
        const dupes = data.duplicatesSkipped || 0;
        const more = data.hasMore ?? false;

        setPageLog(prev => [
          ...prev.slice(0, -1),
          `✅ Página ${p}: ${imported} importadas, ${dupes} duplicadas ignoradas`,
        ]);

        return { imported, hasMore: more, stopped: false };
      } catch (err: any) {
        setPageLog(prev => [
          ...prev.slice(0, -1),
          `❌ Página ${p}: ${err.message}`,
        ]);
        return { imported: 0, hasMore: false, stopped: false };
      }
    };

    while (hasMore && !stopRef) {
      // Check stop via DOM trick since state won't update in loop
      const result = await importPage(page);
      total += result.imported;
      setTotalImported(total);
      hasMore = result.hasMore;
      page++;

      // Small delay between pages
      await new Promise(r => setTimeout(r, 1000));

      // Check if stop was requested via a ref-like approach
      const el = document.getElementById('stop-import-flag');
      if (el?.dataset.stop === 'true') {
        setPageLog(prev => [...prev, `⏹️ Importação parada pelo usuário na página ${page - 1}.`]);
        stopRef = true;
      }
    }

    if (!stopRef) {
      setPageLog(prev => [...prev, `🏁 Importação completa! Total: ${total} reclamações importadas.`]);
    }

    toast({
      title: "Importação finalizada",
      description: `${total} reclamações importadas de ${page - 1} páginas.`,
    });

    setPaginationImporting(false);
  };

  // Deep import - extract URLs from listing, then scrape each individually
  const startDeepImport = async () => {
    if (!deepImportUrl.trim()) {
      toast({ title: "Erro", description: "Cole as URLs das reclamações.", variant: "destructive" });
      return;
    }
    setDeepImporting(true);
    setDeepStopRequested(false);
    setDeepImportLog([]);
    setLiveImports([]);

    // Parse URLs from textarea (one per line, filter empty/invalid)
    const allUrls = deepImportUrl
      .split('\n')
      .map(u => u.trim())
      .filter(u => u.startsWith('http'));

    if (allUrls.length === 0) {
      setDeepImportLog([`⚠️ Nenhuma URL válida encontrada. Cole uma URL por linha.`]);
      setDeepImporting(false);
      return;
    }

    setDeepImportLog([`📋 ${allUrls.length} URLs encontradas no campo.`]);
    setDeepImportStatus(`Importando 0/${allUrls.length}...`);
    let imported = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < allUrls.length; i++) {
      const el = document.getElementById('stop-deep-import-flag');
      if (el?.dataset.stop === 'true') {
        setDeepImportLog(prev => [...prev, `⏹️ Parado pelo usuário após ${imported} importações.`]);
        break;
      }

      setDeepImportStatus(`Importando ${i + 1}/${allUrls.length} (${imported} salvas)...`);

      try {
        const { data, error } = await supabase.functions.invoke("import-individual-reviews", {
          body: { mode: "import_single", complaintUrl: allUrls[i] },
        });
        if (error) throw error;

        if (data?.imported) {
          imported++;
          setDeepImportLog(prev => [...prev, `✅ ${i + 1}/${allUrls.length}: ${data.review?.title || 'Importada'}`]);
        } else {
          skipped++;
          setDeepImportLog(prev => [...prev, `⏭️ ${i + 1}/${allUrls.length}: ${data?.reason || 'Ignorada'} - ${data?.title || allUrls[i]}`]);
        }
      } catch (err: any) {
        failed++;
        setDeepImportLog(prev => [...prev, `❌ ${i + 1}/${allUrls.length}: ${err.message}`]);
      }

      // Small delay between requests
      await new Promise(r => setTimeout(r, 1500));
    }

    setDeepImportLog(prev => [...prev, `\n🏁 Concluído! ${imported} importadas, ${skipped} duplicadas, ${failed} erros.`]);
    toast({
      title: "Importação detalhada finalizada",
      description: `${imported} reclamações importadas com dados completos.`,
    });
    setDeepImporting(false);
  };

  const handleStopDeepImport = () => {
    setDeepStopRequested(true);
    const el = document.getElementById('stop-deep-import-flag');
    if (el) el.dataset.stop = 'true';
  };

  const handleStopImport = () => {
    setStopRequested(true);
    const el = document.getElementById('stop-import-flag');
    if (el) el.dataset.stop = 'true';
  };

  const statusColors: Record<string, { bg: string; color: string }> = {
    respondida: { bg: "#E8F5E9", color: "#2E7D32" },
    nao_respondida: { bg: "#FFF3E0", color: "#E65100" },
    avaliada: { bg: "#E5EEFB", color: "#2B6CB0" },
  };

  const displayReviews = saved && liveImports.length > 0 ? liveImports : previews;

  return (
    <div className="mb-6">
      {/* Hidden flag elements for stopping imports */}
      <div id="stop-import-flag" data-stop="false" className="hidden" />
      <div id="stop-deep-import-flag" data-stop="false" className="hidden" />

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-lg font-bold mb-3 w-full text-left"
        style={{ color: "#1A2B3D" }}
      >
        {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        📥 Importar do Reclame Aqui
        <span className="text-xs font-normal ml-2" style={{ color: "#8A9BAE" }}>Scraping + Substituição</span>
      </button>

      {open && (
        <div className="ml-7 space-y-4">
          {/* Word Replacements */}
          <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
            <h4 className="text-sm font-bold mb-2" style={{ color: "#1A2B3D" }}>
              🔄 Substituição de Palavras
            </h4>
            <p className="text-xs mb-3" style={{ color: "#5A6872" }}>
              Defina palavras que serão substituídas automaticamente nas reclamações importadas (ex: "7 M Boots" → "Agro Brasil").
            </p>

            {loadingReplacements ? (
              <p className="text-xs" style={{ color: "#8A9BAE" }}>Carregando...</p>
            ) : (
              <div className="space-y-2 mb-3">
                {replacements.map((r) => (
                  <div key={r.id} className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 rounded-md font-mono text-xs" style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}>
                      {r.original_word}
                    </span>
                    <span style={{ color: "#8A9BAE" }}>→</span>
                    <span className="px-2 py-1 rounded-md font-mono text-xs" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
                      {r.replacement_word}
                    </span>
                    <button
                      onClick={() => deleteReplacement(r.id)}
                      className="ml-auto p-1 rounded hover:bg-red-50"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                ))}
                {replacements.length === 0 && (
                  <p className="text-xs italic" style={{ color: "#8A9BAE" }}>Nenhuma substituição cadastrada.</p>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <input
                type="text"
                value={newOriginal}
                onChange={(e) => setNewOriginal(e.target.value)}
                placeholder="Palavra original"
                className="px-3 py-1.5 border rounded-lg text-sm w-40"
                style={{ borderColor: "#E8ECF0" }}
              />
              <span className="text-sm" style={{ color: "#8A9BAE" }}>→</span>
              <input
                type="text"
                value={newReplacement}
                onChange={(e) => setNewReplacement(e.target.value)}
                placeholder="Substituir por"
                className="px-3 py-1.5 border rounded-lg text-sm w-40"
                style={{ borderColor: "#E8ECF0" }}
              />
              <button
                onClick={addReplacement}
                className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1"
                style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar
              </button>
            </div>
          </div>

          {/* Deep Import - Manual URLs */}
          <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
            <h4 className="text-sm font-bold mb-2" style={{ color: "#1A2B3D" }}>
              🔍 Importação Detalhada (URLs Manuais)
            </h4>
            <p className="text-xs mb-3" style={{ color: "#5A6872" }}>
              Cole as URLs individuais de cada reclamação (uma por linha). O sistema vai acessar cada uma e importar com dados completos (resposta da empresa, consideração final, nota, cidade, etc).
            </p>

            <textarea
              value={deepImportUrl}
              onChange={(e) => setDeepImportUrl(e.target.value)}
              placeholder={"https://www.reclameaqui.com.br/empresa/reclamacao-1_ABC123/\nhttps://www.reclameaqui.com.br/empresa/reclamacao-2_DEF456/\nhttps://www.reclameaqui.com.br/empresa/reclamacao-3_GHI789/"}
              className="w-full min-h-[120px] px-3 py-2 border rounded-lg text-sm font-mono mb-3"
              style={{ borderColor: "#E8ECF0" }}
              disabled={deepImporting}
            />

            <div className="flex gap-2 items-center flex-wrap">
              {!deepImporting ? (
                <button
                  onClick={startDeepImport}
                  disabled={loading || paginationImporting}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: "#7C3AED" }}
                >
                  <Play className="w-4 h-4" />
                  Importar com Dados Completos
                </button>
              ) : (
                <button
                  onClick={handleStopDeepImport}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2"
                  style={{ backgroundColor: "#DC2626" }}
                >
                  <Square className="w-4 h-4" />
                  Parar
                </button>
              )}

              {deepImporting && (
                <span className="text-sm flex items-center gap-2" style={{ color: "#7C3AED" }}>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {deepImportStatus}
                </span>
              )}
            </div>

            {/* Deep import log */}
            {deepImportLog.length > 0 && (
              <div className="mt-3 max-h-80 overflow-y-auto space-y-1 bg-gray-50 rounded-lg p-3">
                {deepImportLog.map((log, i) => (
                  <p key={i} className="text-xs font-mono" style={{ color: "#5A6872" }}>
                    {log}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Import */}
          <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
            <h4 className="text-sm font-bold mb-2" style={{ color: "#1A2B3D" }}>
              📄 Importação com Paginação (Modo Rápido)
            </h4>
            <p className="text-xs mb-3" style={{ color: "#5A6872" }}>
              Cole a URL da lista de reclamações do Reclame Aqui. Todas as páginas serão importadas automaticamente (extrai dados básicos do markdown da listagem).
            </p>

            <div className="flex gap-2 items-center flex-wrap mb-3">
              <input
                type="url"
                value={paginationUrl}
                onChange={(e) => setPaginationUrl(e.target.value)}
                placeholder="https://www.reclameaqui.com.br/empresa/nome/lista-reclamacoes/"
                className="flex-1 min-w-[300px] px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: "#E8ECF0" }}
                disabled={paginationImporting}
              />
            </div>

            <div className="flex gap-2 items-center flex-wrap">
              {!paginationImporting ? (
                <button
                  onClick={startPaginationImport}
                  disabled={loading || deepImporting}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: "#2B6CB0" }}
                >
                  <Play className="w-4 h-4" />
                  Iniciar Importação Paginada
                </button>
              ) : (
                <button
                  onClick={handleStopImport}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2"
                  style={{ backgroundColor: "#DC2626" }}
                >
                  <Square className="w-4 h-4" />
                  Parar Importação
                </button>
              )}

              {paginationImporting && (
                <span className="text-sm flex items-center gap-2" style={{ color: "#2B6CB0" }}>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Página {currentPage} • {totalImported} importadas
                </span>
              )}
            </div>

            {/* Page log */}
            {pageLog.length > 0 && (
              <div className="mt-3 max-h-60 overflow-y-auto space-y-1 bg-gray-50 rounded-lg p-3">
                {pageLog.map((log, i) => (
                  <p key={i} className="text-xs font-mono" style={{ color: "#5A6872" }}>
                    {log}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Live import feed during pagination */}
          {paginationImporting && liveImports.length > 0 && (
            <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
              <h4 className="text-sm font-semibold mb-2" style={{ color: "#1A2B3D" }}>
                🔴 Importações em tempo real ({liveImports.length})
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {[...liveImports].reverse().slice(0, 20).map((r, i) => (
                  <LiveImportItem key={r.id || i} review={r} index={i} statusColors={statusColors} />
                ))}
              </div>
            </div>
          )}

          {/* URL Input + Actions (manual single page) */}
          <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
            <h4 className="text-sm font-bold mb-2" style={{ color: "#1A2B3D" }}>
              🔗 Importação Manual (URL única)
            </h4>
            <p className="text-xs mb-3" style={{ color: "#5A6872" }}>
              Cole a URL de uma página específica de reclamações do Reclame Aqui.
            </p>
            <div className="flex gap-2 flex-wrap">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.reclameaqui.com.br/empresa/..."
                className="flex-1 min-w-[250px] px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: "#E8ECF0" }}
              />
              <button
                onClick={() => handleScrape(false)}
                disabled={loading || paginationImporting}
                className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Preview
              </button>
              <button
                onClick={() => handleScrape(true)}
                disabled={loading || paginationImporting}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: "#1B8B4F" }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Importar e Salvar
              </button>
            </div>
          </div>

          {/* Live import feed (manual) */}
          {loading && (
            <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
              <div className="flex items-center gap-2 mb-3">
                <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#2B6CB0" }} />
                <span className="text-sm font-semibold" style={{ color: "#1A2B3D" }}>Importando reclamações...</span>
              </div>
              {liveImports.length > 0 && (
                <div className="space-y-2">
                  {liveImports.map((r, i) => (
                    <LiveImportItem key={r.id || i} review={r} index={i} statusColors={statusColors} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Results (manual) */}
          {!loading && !paginationImporting && displayReviews.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold" style={{ color: "#1A2B3D" }}>
                {saved ? "✅" : "👁️"} {displayReviews.length} reclamações {saved ? "importadas" : "encontradas"}:
              </h4>
              {displayReviews.map((r, i) => {
                const sc = statusColors[r.status] || statusColors.nao_respondida;
                return (
                  <div key={r.id || i} className="bg-white rounded-xl p-4 border transition-all" style={{ borderColor: "#E8ECF0" }}>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {saved && <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#2E7D32" }} />}
                        {r.id ? (
                          <Link
                            to={`/reclamacao/${r.id}`}
                            className="text-sm font-bold hover:underline truncate"
                            style={{ color: "#2B6CB0" }}
                          >
                            {r.title}
                            <ExternalLink className="w-3 h-3 inline ml-1 mb-0.5" />
                          </Link>
                        ) : (
                          <span className="text-sm font-bold truncate" style={{ color: "#1A2B3D" }}>{r.title}</span>
                        )}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: sc.bg, color: sc.color }}>
                        {r.status}
                      </span>
                    </div>
                    <p className="text-sm line-clamp-2" style={{ color: "#5A6872" }}>{r.description}</p>
                    <p className="text-xs mt-1" style={{ color: "#8A9BAE" }}>👤 {r.author_name}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Animated live import item
const LiveImportItem = ({
  review,
  index,
  statusColors,
}: {
  review: ImportedReview;
  index: number;
  statusColors: Record<string, { bg: string; color: string }>;
}) => {
  const sc = statusColors[review.status] || statusColors.nao_respondida;

  return (
    <div
      className="flex items-center gap-3 p-2 rounded-lg animate-fade-in"
      style={{ backgroundColor: "#F7FAFC", animationDelay: `${index * 100}ms` }}
    >
      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#2E7D32" }} />
      <div className="flex-1 min-w-0">
        {review.id ? (
          <Link
            to={`/reclamacao/${review.id}`}
            className="text-xs font-semibold hover:underline truncate block"
            style={{ color: "#2B6CB0" }}
          >
            {review.title}
            <ExternalLink className="w-3 h-3 inline ml-1 mb-0.5" />
          </Link>
        ) : (
          <span className="text-xs font-semibold truncate block" style={{ color: "#1A2B3D" }}>
            {review.title}
          </span>
        )}
      </div>
      <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: sc.bg, color: sc.color }}>
        {review.status}
      </span>
    </div>
  );
};

export default ImportReviewsSection;
