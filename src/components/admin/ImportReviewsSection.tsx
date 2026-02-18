import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Loader2, Download, Trash2, Plus, Save, ExternalLink, CheckCircle } from "lucide-react";

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
    if (!loading && liveImports.length === 0) return;

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
  }, [loading]);

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

  const statusColors: Record<string, { bg: string; color: string }> = {
    respondida: { bg: "#E8F5E9", color: "#2E7D32" },
    nao_respondida: { bg: "#FFF3E0", color: "#E65100" },
    avaliada: { bg: "#E5EEFB", color: "#2B6CB0" },
  };

  // Use live imports if we saved, otherwise use previews
  const displayReviews = saved && liveImports.length > 0 ? liveImports : previews;

  return (
    <div className="mb-6">
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
              Defina palavras que serão substituídas automaticamente nas reclamações importadas (ex: "Amazon" → "Minha Loja").
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

          {/* URL Input + Actions */}
          <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
            <h4 className="text-sm font-bold mb-2" style={{ color: "#1A2B3D" }}>
              🔗 URL do Reclame Aqui
            </h4>
            <p className="text-xs mb-3" style={{ color: "#5A6872" }}>
              Cole a URL de uma página de reclamações do Reclame Aqui. As substituições de palavras serão aplicadas automaticamente.
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
                disabled={loading}
                className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Preview
              </button>
              <button
                onClick={() => handleScrape(true)}
                disabled={loading}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: "#1B8B4F" }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Importar e Salvar
              </button>
            </div>
          </div>

          {/* Live import feed */}
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

          {/* Results */}
          {!loading && displayReviews.length > 0 && (
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
