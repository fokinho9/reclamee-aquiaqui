import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  storeId: string;
}

export default function StoreDataSection({ storeId }: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  const { data: store, isLoading } = useQuery({
    queryKey: ["store-detail", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("id", storeId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState<Record<string, string>>({});

  const val = (key: string) => form[key] ?? (store as any)?.[key] ?? "";

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("stores")
        .update({
          name: val("name"),
          description: val("description"),
          website_url: val("website_url"),
          logo_url: val("logo_url"),
          category: val("category"),
        })
        .eq("id", storeId);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["store-detail", storeId] });
      queryClient.invalidateQueries({ queryKey: ["admin-stores-selector"] });
      setForm({});
      toast({ title: "Salvo!", description: "Dados da loja atualizados." });
    } catch {
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    }
    setSaving(false);
  };

  if (isLoading) return <p style={{ color: "#5A6872" }}>Carregando dados da loja...</p>;

  const fields = [
    { key: "name", label: "Nome da Loja" },
    { key: "description", label: "Descrição" },
    { key: "website_url", label: "Website URL" },
    { key: "logo_url", label: "Logo URL" },
    { key: "category", label: "Categoria" },
  ];

  const hasChanges = Object.keys(form).length > 0;

  return (
    <div className="space-y-4">
      {store?.logo_url && (
        <img src={store.logo_url} alt={store.name} className="w-20 h-20 rounded-xl object-cover border" style={{ borderColor: "#E8ECF0" }} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
            <label className="block text-sm font-semibold mb-1" style={{ color: "#1A2B3D" }}>{f.label}</label>
            <input
              type="text"
              value={val(f.key)}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
              style={{ borderColor: "#E8ECF0" }}
            />
          </div>
        ))}
      </div>
      {hasChanges && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
          style={{ backgroundColor: "#1B8B4F" }}
        >
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</> : <><Save className="w-4 h-4" /> Salvar Dados</>}
        </button>
      )}
    </div>
  );
}
