import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function StoreImportSection({ storeId }: { storeId: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [quantity, setQuantity] = useState(10);

  const handleImport = async () => {
    if (!url.trim()) {
      toast({ title: "Erro", description: "Informe a URL da empresa no Reclame Aqui.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("scrape-reclameaqui", {
        body: { url, quantity, storeId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: "Importação concluída!", description: `${data?.imported || 0} reclamações importadas para esta loja.` });
      queryClient.invalidateQueries({ queryKey: ["store-reviews", storeId] });
      queryClient.invalidateQueries({ queryKey: ["store-stats", storeId] });
    } catch (err: any) {
      toast({ title: "Erro na importação", description: err.message || "Tente novamente.", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-sm font-bold mb-3" style={{ color: "#1A2B3D" }}>Importar do Reclame Aqui</h3>
        <p className="text-sm mb-4" style={{ color: "#5A6872" }}>
          Importe reclamações diretamente do Reclame Aqui e vincule automaticamente a esta loja.
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: "#5A6872" }}>URL da Empresa no Reclame Aqui</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.reclameaqui.com.br/empresa/nome-da-empresa/"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
              style={{ borderColor: "#E8ECF0" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: "#5A6872" }}>Quantidade</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg text-sm"
              style={{ borderColor: "#E8ECF0" }}
            >
              {[5, 10, 20, 30, 50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button
            onClick={handleImport}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: "#2B6CB0" }}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {loading ? "Importando..." : "Importar Reclamações"}
          </button>
        </div>
      </div>
    </div>
  );
}
