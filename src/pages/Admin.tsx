import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogOut } from "lucide-react";
import ManageStoresSection from "@/components/admin/ManageStoresSection";
import StoreSelector from "@/components/admin/StoreSelector";
import StoreAdminPanel from "@/components/admin/store/StoreAdminPanel";

const ADMIN_TABS = [
  { id: "stores", label: "🏪 Lojas", description: "Cadastrar e gerenciar lojas" },
  { id: "users", label: "👥 Usuários", description: "Gerenciar usuários por loja" },
];

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stores");
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F2F4F6" }}>
        <p style={{ color: "#5A6872" }}>Carregando...</p>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F2F4F6" }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: "#E8ECF0" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold" style={{ color: "#1B8B4F" }}>
              Reclame<span style={{ color: "#333" }}>AQUI</span>
            </h1>
            <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}>
              Admin
            </span>
            <div className="hidden md:block border-l pl-3 ml-1" style={{ borderColor: "#E8ECF0" }}>
              <StoreSelector selectedStoreId={selectedStoreId} onSelectStore={(id) => { setSelectedStoreId(id); }} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-sm font-medium" style={{ color: "#2B6CB0" }}>
              Ver site →
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Store Selector */}
      <div className="md:hidden bg-white border-b px-4 py-2" style={{ borderColor: "#E8ECF0" }}>
        <StoreSelector selectedStoreId={selectedStoreId} onSelectStore={setSelectedStoreId} />
      </div>

      {/* Tab Navigation (only for general panel) */}
      {!selectedStoreId && (
        <div className="bg-white border-b" style={{ borderColor: "#E8ECF0" }}>
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex gap-1 overflow-x-auto">
              {ADMIN_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors"
                  style={{
                    borderColor: activeTab === tab.id ? "#2B6CB0" : "transparent",
                    color: activeTab === tab.id ? "#2B6CB0" : "#5A6872",
                    backgroundColor: activeTab === tab.id ? "#F0F6FF" : "transparent",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {selectedStoreId ? (
          <StoreAdminPanel storeId={selectedStoreId} />
        ) : (
          <>
            {activeTab === "stores" && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold" style={{ color: "#1A2B3D" }}>Gerenciar Lojas</h2>
                  <p className="text-sm mt-1" style={{ color: "#5A6872" }}>
                    Cadastre e organize as lojas. Selecione uma loja no dropdown acima para gerenciar seu conteúdo, reclamações e configurações.
                  </p>
                </div>
                <ManageStoresSection />
              </>
            )}

            {activeTab === "users" && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold" style={{ color: "#1A2B3D" }}>Gerenciar Usuários</h2>
                  <p className="text-sm mt-1" style={{ color: "#5A6872" }}>
                    Vincule usuários às lojas para que possam gerenciá-las de forma independente.
                  </p>
                </div>
                <StoreUsersManager />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

/* ── Store Users Manager ── */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function StoreUsersManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [storeId, setStoreId] = useState("");
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);

  const { data: stores } = useQuery({
    queryKey: ["admin-stores-selector"],
    queryFn: async () => {
      const { data, error } = await supabase.from("stores").select("id, name").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: storeUsers, isLoading } = useQuery({
    queryKey: ["admin-store-users"],
    queryFn: async () => {
      const { data, error } = await supabase.from("store_users").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleAdd = async () => {
    if (!storeId || !email.trim()) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    setAdding(true);
    try {
      // We need to find user by email - this is a limitation, so we store as note
      toast({
        title: "Funcionalidade em desenvolvimento",
        description: "Para vincular um usuário, use o Supabase Dashboard para adicionar na tabela store_users com o user_id e store_id.",
      });
    } catch {
      toast({ title: "Erro", variant: "destructive" });
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover este vínculo?")) return;
    const { error } = await supabase.from("store_users").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao remover", variant: "destructive" });
    } else {
      toast({ title: "Vínculo removido!" });
      queryClient.invalidateQueries({ queryKey: ["admin-store-users"] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-base font-bold mb-4" style={{ color: "#1A2B3D" }}>Vincular usuário a uma loja</h3>
        <div className="flex gap-3 flex-wrap">
          <select
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm flex-1 min-w-[200px]"
            style={{ borderColor: "#E8ECF0" }}
          >
            <option value="">Selecione uma loja</option>
            {(stores || []).map((s) => (
              <option key={s.id} value={s.id}>🏪 {s.name}</option>
            ))}
          </select>
          <input
            type="email"
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm flex-1 min-w-[200px]"
            style={{ borderColor: "#E8ECF0" }}
          />
          <button
            onClick={handleAdd}
            disabled={adding}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: "#2B6CB0" }}
          >
            <Plus className="w-4 h-4" /> Vincular
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-base font-bold mb-4" style={{ color: "#1A2B3D" }}>Usuários vinculados</h3>
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm" style={{ color: "#5A6872" }}>
            <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
          </div>
        ) : (storeUsers || []).length === 0 ? (
          <p className="text-sm" style={{ color: "#8A9BAE" }}>Nenhum usuário vinculado a lojas ainda.</p>
        ) : (
          <div className="space-y-2">
            {(storeUsers || []).map((su) => {
              const storeName = stores?.find((s) => s.id === su.store_id)?.name || su.store_id;
              return (
                <div key={su.id} className="flex items-center justify-between px-4 py-3 rounded-lg border" style={{ borderColor: "#E8ECF0" }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1A2B3D" }}>
                      🏪 {storeName}
                    </p>
                    <p className="text-xs" style={{ color: "#8A9BAE" }}>
                      User: {su.user_id} · Role: {su.role}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(su.id)}
                    className="px-2 py-1 rounded-lg"
                    style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
