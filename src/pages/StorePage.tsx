import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header, Footer } from "@/components/CompanyLayout";
import Seo from "@/components/seo/Seo";
import { ExternalLink, Star, MessageSquare } from "lucide-react";

const StorePage = () => {
  const { storeId } = useParams();

  const { data: store, isLoading } = useQuery({
    queryKey: ["store-page", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("id", storeId!)
        .eq("is_active", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!storeId,
  });

  const { data: reviews } = useQuery({
    queryKey: ["store-page-reviews", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("store_id", storeId!)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    enabled: !!storeId,
  });

  const { data: coupons } = useQuery({
    queryKey: ["store-page-coupons", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("store_id", storeId!)
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!storeId,
  });

  const statusLabels: Record<string, { label: string; bg: string; color: string }> = {
    nao_respondida: { label: "Não respondida", bg: "#FFF3E0", color: "#E65100" },
    respondida: { label: "Respondida", bg: "#E8F5E9", color: "#2E7D32" },
    avaliada: { label: "Avaliada", bg: "#E5EEFB", color: "#2B6CB0" },
    finalizada: { label: "Finalizada", bg: "#F3E5F5", color: "#7B1FA2" },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F2F4F6" }}>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p style={{ color: "#5A6872" }}>Carregando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F2F4F6" }}>
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#1A2B3D" }}>Loja não encontrada</h1>
          <p style={{ color: "#5A6872" }}>Esta loja não existe ou está inativa.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const totalReviews = reviews?.length || 0;
  const responded = reviews?.filter(r => r.status === "respondida" || r.status === "finalizada").length || 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F2F4F6" }}>
      <Seo
        title={`${store.name} - Reclame Aqui`}
        description={`Veja a reputação da ${store.name}. Confira reclamações, avaliações e cupons de desconto.`}
        canonicalPath={`/loja/${store.id}`}
      />
      <Header />

      {/* Hero */}
      <div className="bg-white border-b" style={{ borderColor: "#E8ECF0" }}>
        <div className="max-w-4xl mx-auto px-4 py-8 flex items-center gap-6">
          {store.logo_url ? (
            <img src={store.logo_url} alt={store.name} className="w-20 h-20 rounded-2xl object-contain border" style={{ borderColor: "#E8ECF0" }} />
          ) : (
            <div className="w-20 h-20 rounded-2xl border-2 border-dashed flex items-center justify-center text-3xl" style={{ borderColor: "#CBD5E0" }}>🏪</div>
          )}
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1A2B3D" }}>{store.name}</h1>
            {store.category && <p className="text-sm mt-1" style={{ color: "#8A9BAE" }}>{store.category}</p>}
            {store.description && <p className="text-sm mt-2" style={{ color: "#5A6872" }}>{store.description}</p>}
            {store.website_url && (
              <a href={store.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium mt-2" style={{ color: "#2B6CB0" }}>
                <ExternalLink className="w-4 h-4" /> Visitar site
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border text-center" style={{ borderColor: "#E8ECF0" }}>
            <MessageSquare className="w-6 h-6 mx-auto mb-2" style={{ color: "#2B6CB0" }} />
            <p className="text-2xl font-bold" style={{ color: "#2B6CB0" }}>{totalReviews}</p>
            <p className="text-xs" style={{ color: "#5A6872" }}>Reclamações</p>
          </div>
          <div className="bg-white rounded-xl p-5 border text-center" style={{ borderColor: "#E8ECF0" }}>
            <Star className="w-6 h-6 mx-auto mb-2" style={{ color: "#2E7D32" }} />
            <p className="text-2xl font-bold" style={{ color: "#2E7D32" }}>{responded}</p>
            <p className="text-xs" style={{ color: "#5A6872" }}>Respondidas</p>
          </div>
          <div className="bg-white rounded-xl p-5 border text-center" style={{ borderColor: "#E8ECF0" }}>
            <Star className="w-6 h-6 mx-auto mb-2" style={{ color: "#F57F17" }} />
            <p className="text-2xl font-bold" style={{ color: "#F57F17" }}>
              {totalReviews > 0 ? `${((responded / totalReviews) * 100).toFixed(0)}%` : "0%"}
            </p>
            <p className="text-xs" style={{ color: "#5A6872" }}>Taxa de Resposta</p>
          </div>
        </div>

        {/* Coupons */}
        {coupons && coupons.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#1A2B3D" }}>🎟️ Cupons de Desconto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {coupons.map(c => (
                <div key={c.id} className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold font-mono px-2 py-0.5 rounded text-sm" style={{ backgroundColor: "#F3E5F5", color: "#7B1FA2" }}>{c.code}</span>
                    <span className="text-sm font-semibold" style={{ color: "#1B8B4F" }}>
                      {c.discount_type === "percentage" ? `${c.discount_value}% OFF` : `R$ ${c.discount_value} OFF`}
                    </span>
                  </div>
                  {c.description && <p className="text-sm" style={{ color: "#5A6872" }}>{c.description}</p>}
                  {c.expires_at && <p className="text-xs mt-1" style={{ color: "#8A9BAE" }}>Válido até {new Date(c.expires_at).toLocaleDateString("pt-BR")}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {reviews && reviews.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#1A2B3D" }}>📝 Reclamações Recentes</h2>
            <div className="space-y-3">
              {reviews.map(r => {
                const st = statusLabels[r.status] || statusLabels.nao_respondida;
                return (
                  <div key={r.id} className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold" style={{ color: "#1A2B3D" }}>{r.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: st.bg, color: st.color }}>{st.label}</span>
                    </div>
                    <p className="text-sm" style={{ color: "#5A6872" }}>{r.description?.slice(0, 200)}...</p>
                    <div className="flex gap-3 mt-2 text-xs" style={{ color: "#8A9BAE" }}>
                      <span>👤 {r.author_name}</span>
                      <span>📅 {new Date(r.created_at).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StorePage;
