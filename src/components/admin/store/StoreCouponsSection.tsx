import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: string;
  discount_value: number;
  is_active: boolean;
  expires_at: string | null;
}

export default function StoreCouponsSection({ storeId }: { storeId: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ code: "", description: "", discount_type: "percentage", discount_value: "", expires_at: "" });

  const { data: coupons, isLoading } = useQuery({
    queryKey: ["store-coupons", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("store_id", storeId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Coupon[];
    },
  });

  const handleAdd = async () => {
    if (!form.code.trim()) {
      toast({ title: "Erro", description: "Preencha o código do cupom.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("coupons").insert({
      store_id: storeId,
      code: form.code.toUpperCase(),
      description: form.description,
      discount_type: form.discount_type,
      discount_value: parseFloat(form.discount_value) || 0,
      expires_at: form.expires_at || null,
    });
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Cupom criado!" });
      setForm({ code: "", description: "", discount_type: "percentage", discount_value: "", expires_at: "" });
      setAdding(false);
      queryClient.invalidateQueries({ queryKey: ["store-coupons", storeId] });
    }
    setSaving(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("coupons").update({ is_active: !current }).eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["store-coupons", storeId] });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este cupom?")) return;
    await supabase.from("coupons").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["store-coupons", storeId] });
    toast({ title: "Cupom excluído!" });
  };

  if (isLoading) return <p style={{ color: "#5A6872" }}>Carregando cupons...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: "#5A6872" }}>{(coupons || []).length} cupom(ns)</p>
        <button
          onClick={() => setAdding(!adding)}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white flex items-center gap-1"
          style={{ backgroundColor: "#1B8B4F" }}
        >
          <Plus className="w-4 h-4" /> Novo Cupom
        </button>
      </div>

      {adding && (
        <div className="bg-white rounded-xl p-4 border space-y-3" style={{ borderColor: "#E8ECF0" }}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#1A2B3D" }}>Código</label>
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm uppercase"
                style={{ borderColor: "#E8ECF0" }}
                placeholder="CUPOM10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#1A2B3D" }}>Descrição</label>
              <input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: "#E8ECF0" }}
                placeholder="10% de desconto"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#1A2B3D" }}>Tipo</label>
              <select
                value={form.discount_type}
                onChange={(e) => setForm({ ...form, discount_type: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: "#E8ECF0" }}
              >
                <option value="percentage">Porcentagem (%)</option>
                <option value="fixed">Valor fixo (R$)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#1A2B3D" }}>Valor</label>
              <input
                type="number"
                value={form.discount_value}
                onChange={(e) => setForm({ ...form, discount_value: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: "#E8ECF0" }}
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#1A2B3D" }}>Expira em (opcional)</label>
              <input
                type="date"
                value={form.expires_at}
                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: "#E8ECF0" }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: "#1B8B4F" }}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Salvar
            </button>
            <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: "#F2F4F6", color: "#5A6872" }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {(coupons || []).map((c) => (
        <div key={c.id} className="bg-white rounded-xl p-4 border flex items-center justify-between" style={{ borderColor: "#E8ECF0" }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold font-mono px-2 py-0.5 rounded" style={{ backgroundColor: "#F3E5F5", color: "#7B1FA2" }}>
                {c.code}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${c.is_active ? "" : "opacity-50"}`}
                style={{ backgroundColor: c.is_active ? "#E8F5E9" : "#F2F4F6", color: c.is_active ? "#2E7D32" : "#8A9BAE" }}>
                {c.is_active ? "Ativo" : "Inativo"}
              </span>
            </div>
            <p className="text-sm" style={{ color: "#5A6872" }}>
              {c.description || "Sem descrição"} · {c.discount_type === "percentage" ? `${c.discount_value}%` : `R$ ${c.discount_value}`}
            </p>
            {c.expires_at && (
              <p className="text-xs mt-1" style={{ color: "#8A9BAE" }}>
                Expira: {new Date(c.expires_at).toLocaleDateString("pt-BR")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleActive(c.id, c.is_active)}
              className="text-xs px-3 py-1 rounded-lg font-medium"
              style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}
            >
              {c.is_active ? "Desativar" : "Ativar"}
            </button>
            <button onClick={() => handleDelete(c.id)} className="text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
