import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Trash2, Plus, Play, Square } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface WordReplacement {
  id: string;
  original_word: string;
  replacement_word: string;
  is_active: boolean;
}

export default function StoreImportSection({ storeId }: { storeId: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Word replacements
  const [replacements, setReplacements] = useState<WordReplacement[]>([]);
  const [newOriginal, setNewOriginal] = useState("");
  const [newReplacement, setNewReplacement] = useState("");
  const [loadingReplacements, setLoadingReplacements] = useState(true);

  // Pagination import
  const [paginationUrl, setPaginationUrl] = useState("");
  const [paginationImporting, setPaginationImporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImported, setTotalImported] = useState(0);
  const [pageLog, setPageLog] = useState<string[]>([]);
  const [stopRequested, setStopRequested] = useState(false);

  // Deep import
  const [deepImportUrl, setDeepImportUrl] = useState("");
  const [deepImporting, setDeepImporting] = useState(false);
  const [deepImportLog, setDeepImportLog] = useState<string[]>([]);
  const [deepImportStatus, setDeepImportStatus] = useState("");
  const [deepStopRequested, setDeepStopRequested] = useState(false);

  useEffect(() => { loadReplacements(); }, []);

  const loadReplacements = async () => {
    setLoadingReplacements(true);
    const { data } = await supabase.from("word_replacements").select("*").order("created_at", { ascending: true });
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

  const invalidateStore = () => {
    queryClient.invalidateQueries({ queryKey: ["store-reviews", storeId] });
    queryClient.invalidateQueries({ queryKey: ["store-stats", storeId] });
  };

  // Pagination import
  const startPaginationImport = async (reimport = false) => {
    if (!paginationUrl.trim()) {
      toast({ title: "Erro", description: "Cole a URL do Reclame Aqui.", variant: "destructive" });
      return;
    }
    setPaginationImporting(true);
    setStopRequested(false);
    setCurrentPage(1);
    setTotalImported(0);
    setPageLog([]);

    // If reimport, delete existing reviews for this store first
    if (reimport) {
      setPageLog(["🗑️ Deletando reclamações existentes desta loja..."]);
      try {
        const { data, error } = await supabase.functions.invoke("scrape-reclameaqui", {
          body: { deleteAll: true, storeId },
        });
        if (error) throw error;
        setPageLog(["✅ Reclamações anteriores deletadas.", ""]);
      } catch (err: any) {
        setPageLog([`❌ Erro ao deletar: ${err.message}`]);
        setPaginationImporting(false);
        return;
      }
    }

    let page = 1;
    let hasMore = true;
    let total = 0;
    let stopRef = false;

    while (hasMore && !stopRef) {
      setCurrentPage(page);
      setPageLog(prev => [...prev, `⏳ Importando página ${page}...`]);

      try {
        const { data, error } = await supabase.functions.invoke("auto-import-reviews", {
          body: { page, url: paginationUrl.trim(), storeId },
        });
        if (error) throw error;
        if (!data?.success) throw new Error(data?.error || "Erro");

        const imported = data.imported || 0;
        const dupes = data.duplicatesSkipped || 0;
        hasMore = data.hasMore ?? false;

        setPageLog(prev => [
          ...prev.slice(0, -1),
          `✅ Página ${page}: ${imported} importadas, ${dupes} duplicadas ignoradas`,
        ]);
        total += imported;
        setTotalImported(total);
      } catch (err: any) {
        setPageLog(prev => [...prev.slice(0, -1), `❌ Página ${page}: ${err.message}`]);
        hasMore = false;
      }

      page++;
      await new Promise(r => setTimeout(r, 1000));

      const el = document.getElementById(`stop-import-flag-${storeId}`);
      if (el?.dataset.stop === "true") {
        setPageLog(prev => [...prev, `⏹️ Importação parada pelo usuário.`]);
        stopRef = true;
      }
    }

    if (!stopRef) {
      setPageLog(prev => [...prev, `🏁 Importação completa! Total: ${total} reclamações.`]);
    }

    // Apply word replacements after import
    if (total > 0) {
      setPageLog(prev => [...prev, `🔄 Aplicando substituições de palavras...`]);
      try {
        await supabase.functions.invoke("scrape-reclameaqui", {
          body: { bulkReplace: { storeId } },
        });
        setPageLog(prev => [...prev, `✅ Substituições aplicadas.`]);
      } catch { /* ignore */ }
    }

    toast({ title: "Finalizado", description: `${total} reclamações importadas.` });
    setPaginationImporting(false);
    invalidateStore();
  };

  const handleStopImport = () => {
    setStopRequested(true);
    const el = document.getElementById(`stop-import-flag-${storeId}`);
    if (el) el.dataset.stop = "true";
  };

  // Deep import
  const startDeepImport = async () => {
    if (!deepImportUrl.trim()) {
      toast({ title: "Erro", description: "Cole as URLs das reclamações.", variant: "destructive" });
      return;
    }
    setDeepImporting(true);
    setDeepStopRequested(false);
    setDeepImportLog([]);

    const allUrls = deepImportUrl.split("\n").map(u => u.trim()).filter(u => u.startsWith("http"));
    if (allUrls.length === 0) {
      setDeepImportLog(["⚠️ Nenhuma URL válida encontrada."]);
      setDeepImporting(false);
      return;
    }

    setDeepImportLog([`📋 ${allUrls.length} URLs encontradas.`]);
    setDeepImportStatus(`Importando 0/${allUrls.length}...`);
    let imported = 0, skipped = 0, failed = 0;

    for (let i = 0; i < allUrls.length; i++) {
      const el = document.getElementById(`stop-deep-import-flag-${storeId}`);
      if (el?.dataset.stop === "true") {
        setDeepImportLog(prev => [...prev, `⏹️ Parado após ${imported} importações.`]);
        break;
      }

      setDeepImportStatus(`Importando ${i + 1}/${allUrls.length} (${imported} salvas)...`);

      try {
        const { data, error } = await supabase.functions.invoke("import-individual-reviews", {
          body: { mode: "import_single", complaintUrl: allUrls[i], storeId },
        });
        if (error) throw error;
        if (data?.imported) {
          imported++;
          setDeepImportLog(prev => [...prev, `✅ ${i + 1}/${allUrls.length}: ${data.review?.title || "Importada"}`]);
        } else {
          skipped++;
          setDeepImportLog(prev => [...prev, `⏭️ ${i + 1}/${allUrls.length}: ${data?.reason || "Ignorada"}`]);
        }
      } catch (err: any) {
        failed++;
        setDeepImportLog(prev => [...prev, `❌ ${i + 1}/${allUrls.length}: ${err.message}`]);
      }
      await new Promise(r => setTimeout(r, 1500));
    }

    setDeepImportLog(prev => [...prev, `\n🏁 Concluído! ${imported} importadas, ${skipped} duplicadas, ${failed} erros.`]);
    toast({ title: "Finalizado", description: `${imported} reclamações importadas.` });
    setDeepImporting(false);
    invalidateStore();
  };

  const handleStopDeepImport = () => {
    setDeepStopRequested(true);
    const el = document.getElementById(`stop-deep-import-flag-${storeId}`);
    if (el) el.dataset.stop = "true";
  };

  return (
    <div className="space-y-4">
      <div id={`stop-import-flag-${storeId}`} data-stop="false" className="hidden" />
      <div id={`stop-deep-import-flag-${storeId}`} data-stop="false" className="hidden" />

      {/* Word Replacements */}
      <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
        <h4 className="text-sm font-bold mb-2" style={{ color: "#1A2B3D" }}>🔄 Substituição de Palavras</h4>
        <p className="text-xs mb-3" style={{ color: "#5A6872" }}>
          Palavras substituídas automaticamente nas reclamações importadas.
        </p>
        {loadingReplacements ? (
          <p className="text-xs" style={{ color: "#8A9BAE" }}>Carregando...</p>
        ) : (
          <div className="space-y-2 mb-3">
            {replacements.map((r) => (
              <div key={r.id} className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded-md font-mono text-xs" style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}>{r.original_word}</span>
                <span style={{ color: "#8A9BAE" }}>→</span>
                <span className="px-2 py-1 rounded-md font-mono text-xs" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>{r.replacement_word}</span>
                <button onClick={() => deleteReplacement(r.id)} className="ml-auto p-1 rounded hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            ))}
            {replacements.length === 0 && <p className="text-xs italic" style={{ color: "#8A9BAE" }}>Nenhuma substituição cadastrada.</p>}
          </div>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <input type="text" value={newOriginal} onChange={(e) => setNewOriginal(e.target.value)} placeholder="Palavra original" className="px-3 py-1.5 border rounded-lg text-sm w-40" style={{ borderColor: "#E8ECF0" }} />
          <span className="text-sm" style={{ color: "#8A9BAE" }}>→</span>
          <input type="text" value={newReplacement} onChange={(e) => setNewReplacement(e.target.value)} placeholder="Substituir por" className="px-3 py-1.5 border rounded-lg text-sm w-40" style={{ borderColor: "#E8ECF0" }} />
          <button onClick={addReplacement} className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1" style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}>
            <Plus className="w-3.5 h-3.5" /> Adicionar
          </button>
        </div>
      </div>

      {/* Deep Import */}
      <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
        <h4 className="text-sm font-bold mb-2" style={{ color: "#1A2B3D" }}>🔍 Importação Detalhada (URLs Manuais)</h4>
        <p className="text-xs mb-3" style={{ color: "#5A6872" }}>
          Cole URLs individuais de reclamações (uma por linha) para importar com dados completos.
        </p>
        <textarea
          value={deepImportUrl}
          onChange={(e) => setDeepImportUrl(e.target.value)}
          placeholder={"https://www.reclameaqui.com.br/empresa/reclamacao-1/\nhttps://www.reclameaqui.com.br/empresa/reclamacao-2/"}
          className="w-full min-h-[120px] px-3 py-2 border rounded-lg text-sm font-mono mb-3"
          style={{ borderColor: "#E8ECF0" }}
          disabled={deepImporting}
        />
        <div className="flex gap-2 items-center flex-wrap">
          {!deepImporting ? (
            <button onClick={startDeepImport} disabled={paginationImporting} className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50" style={{ backgroundColor: "#7C3AED" }}>
              <Play className="w-4 h-4" /> Importar com Dados Completos
            </button>
          ) : (
            <button onClick={handleStopDeepImport} className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2" style={{ backgroundColor: "#DC2626" }}>
              <Square className="w-4 h-4" /> Parar
            </button>
          )}
          {deepImporting && (
            <span className="text-sm flex items-center gap-2" style={{ color: "#7C3AED" }}>
              <Loader2 className="w-4 h-4 animate-spin" /> {deepImportStatus}
            </span>
          )}
        </div>
        {deepImportLog.length > 0 && (
          <div className="mt-3 max-h-80 overflow-y-auto space-y-1 bg-gray-50 rounded-lg p-3">
            {deepImportLog.map((log, i) => <p key={i} className="text-xs font-mono" style={{ color: "#5A6872" }}>{log}</p>)}
          </div>
        )}
      </div>

      {/* Pagination Import */}
      <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
        <h4 className="text-sm font-bold mb-2" style={{ color: "#1A2B3D" }}>📄 Importação com Paginação (Modo Rápido)</h4>
        <p className="text-xs mb-3" style={{ color: "#5A6872" }}>
          Cole a URL da empresa no Reclame Aqui para importar todas as reclamações automaticamente, página por página.
        </p>
        <div className="flex gap-2 mb-3">
          <input
            type="url"
            value={paginationUrl}
            onChange={(e) => setPaginationUrl(e.target.value)}
            placeholder="https://www.reclameaqui.com.br/empresa/nome-da-empresa/"
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
            style={{ borderColor: "#E8ECF0" }}
            disabled={paginationImporting}
          />
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {!paginationImporting ? (
            <div className="flex gap-2">
              <button onClick={() => startPaginationImport(false)} disabled={deepImporting} className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50" style={{ backgroundColor: "#2B6CB0" }}>
                <Play className="w-4 h-4" /> Iniciar Importação
              </button>
              <button onClick={() => startPaginationImport(true)} disabled={deepImporting} className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50" style={{ backgroundColor: "#E53E3E" }}>
                <Trash2 className="w-4 h-4" /> Reimportar (Deletar e Reimportar)
              </button>
            </div>
          ) : (
            <button onClick={handleStopImport} className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2" style={{ backgroundColor: "#DC2626" }}>
              <Square className="w-4 h-4" /> Parar
            </button>
          )}
          {paginationImporting && (
            <span className="text-sm flex items-center gap-2" style={{ color: "#2B6CB0" }}>
              <Loader2 className="w-4 h-4 animate-spin" /> Página {currentPage} · {totalImported} importadas
            </span>
          )}
        </div>
        {pageLog.length > 0 && (
          <div className="mt-3 max-h-60 overflow-y-auto space-y-1 bg-gray-50 rounded-lg p-3">
            {pageLog.map((log, i) => <p key={i} className="text-xs font-mono" style={{ color: "#5A6872" }}>{log}</p>)}
          </div>
        )}
      </div>
    </div>
  );
}
