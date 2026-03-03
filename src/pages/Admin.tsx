import { useState, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useSiteContent, useUpdateContent, useUploadAsset, type SiteContent } from "@/hooks/use-site-content";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Save, Upload, LogOut, Image, Type, Code, ChevronDown, ChevronRight, Check, Sparkles, Loader2 } from "lucide-react";
import ImportReviewsSection from "@/components/admin/ImportReviewsSection";
import ManageReviewsSection from "@/components/admin/ManageReviewsSection";
import ManageStoresSection from "@/components/admin/ManageStoresSection";
import StoreSelector from "@/components/admin/StoreSelector";
import StoreAdminPanel from "@/components/admin/store/StoreAdminPanel";
import { useToast } from "@/hooks/use-toast";

const SECTION_LABELS: Record<string, string> = {
  hero: "🏠 Hero / Cabeçalho",
  reputation: "⭐ Reputação",
  trust: "🛡️ Confiança",
  performance: "📊 Desempenho",
  sidebar: "📋 Sidebar / Sobre",
  content: "📄 Conteúdo",
  geral: "⚙️ Geral",
};

interface ContentItemProps {
  item: SiteContent;
}

const IMAGE_DIMENSIONS: Record<string, string> = {
  company_banner: "1920 × 280 px",
  company_banner_mobile: "768 × 105 px",
  company_logo: "188 × 188 px (circular)",
  reputation_otimo: "44 × 44 px",
  seal_ra_verified: "24 × 24 px",
};

const TYPE_ICONS: Record<string, typeof Type> = {
  text: Type,
  image: Image,
  html: Code,
};

const ContentItem = ({ item }: { item: SiteContent }) => {
  const [value, setValue] = useState(item.content_value);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const updateContent = useUpdateContent();
  const uploadAsset = useUploadAsset();
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const hasChanges = value !== item.content_value;
  const Icon = TYPE_ICONS[item.content_type] || Type;

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContent.mutateAsync({ id: item.id, content_value: value });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      toast({ title: "Salvo!", description: `"${item.label}" atualizado com sucesso.` });
    } catch {
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    }
    setSaving(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSaving(true);
    try {
      const url = await uploadAsset.mutateAsync(file);
      setValue(url);
      await updateContent.mutateAsync({ id: item.id, content_value: url });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      toast({ title: "Imagem enviada!", description: `"${item.label}" atualizado.` });
    } catch {
      toast({ title: "Erro no upload", description: "Tente novamente.", variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color: "#8A9BAE" }} />
        <span className="text-sm font-semibold" style={{ color: "#1A2B3D" }}>{item.label}</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100" style={{ color: "#8A9BAE" }}>{item.content_key}</span>
      </div>

      {item.content_type === "image" ? (
        <div className="space-y-3">
          {IMAGE_DIMENSIONS[item.content_key] && (
            <p className="text-xs font-medium px-2 py-1 rounded-md inline-block" style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}>
              📐 Tamanho recomendado: {IMAGE_DIMENSIONS[item.content_key]}
            </p>
          )}
          {value && (
            <img src={value} alt={item.label} className="h-20 rounded-lg object-cover border" style={{ borderColor: "#E8ECF0" }} />
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
              style={{ borderColor: "#E8ECF0" }}
              placeholder="URL da imagem"
            />
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <button
              onClick={() => fileRef.current?.click()}
              className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1"
              style={{ backgroundColor: "#E5EEFB", color: "#2B6CB0" }}
            >
              <Upload className="w-4 h-4" /> Upload
            </button>
          </div>
        </div>
      ) : item.content_type === "html" ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30 font-mono"
          style={{ borderColor: "#E8ECF0" }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B8B4F]/30"
          style={{ borderColor: "#E8ECF0" }}
        />
      )}

      {hasChanges && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
          style={{ backgroundColor: "#1B8B4F" }}
        >
          {saving ? "Salvando..." : saved ? <><Check className="w-4 h-4" /> Salvo!</> : <><Save className="w-4 h-4" /> Salvar</>}
        </button>
      )}
    </div>
  );
};

const SectionGroup = ({ section, items }: { section: string; items: SiteContent[] }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-lg font-bold mb-3 w-full text-left"
        style={{ color: "#1A2B3D" }}
      >
        {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        {SECTION_LABELS[section] || section}
        <span className="text-xs font-normal ml-2" style={{ color: "#8A9BAE" }}>({items.length} itens)</span>
      </button>
      {open && (
        <div className="space-y-3 ml-7">
          {items.map((item) => (
            <ContentItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

interface GeneratedReview {
  title: string;
  text: string;
  author: string;
  rating: number;
  date: string;
  status: string;
  resolved: boolean;
  product: string;
}

const AIReviewsSection = ({ companyName, companyCategory }: { companyName: string; companyCategory: string }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<GeneratedReview[]>([]);
  const [quantity, setQuantity] = useState(5);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!companyName.trim()) {
      toast({ title: "Erro", description: "Preencha o nome da empresa antes de gerar.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-reviews', {
        body: { companyName, companyCategory: companyCategory || 'e-commerce', quantity },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setReviews(data?.reviews || []);
      toast({ title: "Avaliações geradas!", description: `${data?.reviews?.length || 0} avaliações criadas com IA.` });
    } catch (err: any) {
      toast({ title: "Erro ao gerar", description: err.message || "Tente novamente.", variant: "destructive" });
    }
    setLoading(false);
  };

  const statusColors: Record<string, { bg: string; color: string }> = {
    respondida: { bg: "#E8F5E9", color: "#2E7D32" },
    "não respondida": { bg: "#FFF3E0", color: "#E65100" },
    avaliada: { bg: "#E5EEFB", color: "#2B6CB0" },
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-lg font-bold mb-3 w-full text-left"
        style={{ color: "#1A2B3D" }}
      >
        {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        🤖 Avaliações com IA
        <span className="text-xs font-normal ml-2" style={{ color: "#8A9BAE" }}>Geração automática</span>
      </button>
      {open && (
        <div className="ml-7 space-y-4">
          <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
            <p className="text-sm mb-3" style={{ color: "#5A6872" }}>
              A IA irá gerar avaliações realistas baseadas no tipo de empresa e segmento cadastrado.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium" style={{ color: "#1A2B3D" }}>Quantidade:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="px-3 py-2 border rounded-lg text-sm"
                  style={{ borderColor: "#E8ECF0" }}
                >
                  {[3, 5, 7, 10].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: "#F3E5F5", color: "#7B1FA2" }}>
                Empresa: <strong>{companyName || "(não definido)"}</strong> · Segmento: <strong>{companyCategory || "(não definido)"}</strong>
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: "#7B1FA2" }}
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Gerando...</> : <><Sparkles className="w-4 h-4" /> Gerar Avaliações</>}
              </button>
            </div>
          </div>

          {reviews.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold" style={{ color: "#1A2B3D" }}>
                {reviews.length} avaliações geradas:
              </h4>
              {reviews.map((r, i) => {
                const sc = statusColors[r.status] || statusColors["avaliada"];
                return (
                  <div key={i} className="bg-white rounded-xl p-4 border" style={{ borderColor: "#E8ECF0" }}>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <span className="text-sm font-bold" style={{ color: "#1A2B3D" }}>{r.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: sc.bg, color: sc.color }}>
                          {r.status}
                        </span>
                        <span className="text-xs" style={{ color: "#8A9BAE" }}>
                          {"⭐".repeat(r.rating)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mb-2" style={{ color: "#5A6872" }}>{r.text}</p>
                    <div className="flex items-center gap-4 text-xs" style={{ color: "#8A9BAE" }}>
                      <span>👤 {r.author}</span>
                      <span>📅 {r.date}</span>
                      <span>📦 {r.product}</span>
                      <span className={r.resolved ? "text-green-600" : "text-red-500"}>
                        {r.resolved ? "✅ Resolvida" : "❌ Não resolvida"}
                      </span>
                    </div>
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

const GoogleAdsGuide = () => {
  const [open, setOpen] = useState(true);
  const steps = [
    {
      num: "1",
      title: "Criar conta no Google Ads",
      desc: "Acesse ads.google.com e crie sua conta gratuita. Você precisará de um e-mail Google e dados de faturamento.",
      link: "https://ads.google.com",
    },
    {
      num: "2",
      title: "Criar uma campanha de Pesquisa",
      desc: "Clique em '+ Nova Campanha' → Escolha a meta 'Vendas' ou 'Tráfego do site' → Selecione 'Pesquisa' como tipo de campanha.",
    },
    {
      num: "3",
      title: "Definir palavras-chave",
      desc: "Adicione palavras-chave relacionadas ao seu negócio, como: 'loja agro', 'produtos agropecuários', 'selaria', 'manta para cavalo', 'vestuário country'. Use correspondência de frase para melhor controle.",
    },
    {
      num: "4",
      title: "Criar anúncios",
      desc: "Escreva títulos atrativos (máx. 30 caracteres cada) e descrições (máx. 90 caracteres). Exemplo: Título: 'Agro Brasil | Produtos Agro' / Descrição: 'Confira selaria, mantas e vestuário country com os melhores preços.'",
    },
    {
      num: "5",
      title: "Configurar orçamento",
      desc: "Defina um orçamento diário (ex: R$ 20-50/dia para começar). O Google vai distribuir ao longo do dia. Você só paga quando clicam no anúncio (CPC).",
    },
    {
      num: "6",
      title: "Instalar o pixel de conversão",
      desc: "Copie seu ID do Google Ads (formato AW-XXXXXXXXX) e cole na variável VITE_GOOGLE_ADS_ID nas configurações do Lovable. O código já está instalado no site!",
    },
    {
      num: "7",
      title: "Configurar conversões",
      desc: "No Google Ads, vá em Ferramentas → Conversões → Nova ação de conversão → Website. Use o código gtag('event', 'conversion', {...}) nas páginas de obrigado/confirmação.",
    },
    {
      num: "8",
      title: "Vincular Google Analytics (opcional)",
      desc: "Vincule o Google Analytics 4 ao Google Ads para ver dados mais completos de comportamento dos visitantes que clicam nos anúncios.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-base font-bold mb-2" style={{ color: "#1A2B3D" }}>
          ⚡ Status do Pixel Google Ads
        </h3>
        <div className="flex items-center gap-3">
          {import.meta.env.VITE_GOOGLE_ADS_ID ? (
            <span className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
              <Check className="w-4 h-4" /> Pixel instalado: {import.meta.env.VITE_GOOGLE_ADS_ID}
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}>
              ⚠️ Pixel não configurado — adicione VITE_GOOGLE_ADS_ID nas variáveis de ambiente
            </span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-lg font-bold w-full text-left"
          style={{ color: "#1A2B3D" }}
        >
          {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          📋 Passo a passo para configurar Google Ads
        </button>
        {open && (
          <div className="mt-4 space-y-4">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-4 items-start">
                <span className="flex-none w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "#2B6CB0" }}>
                  {s.num}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-bold" style={{ color: "#1A2B3D" }}>{s.title}</h4>
                  <p className="text-sm mt-1" style={{ color: "#5A6872" }}>{s.desc}</p>
                  {s.link && (
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold mt-1 inline-block" style={{ color: "#2B6CB0" }}>
                      Acessar →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8ECF0" }}>
        <h3 className="text-base font-bold mb-3" style={{ color: "#1A2B3D" }}>💡 Dicas importantes</h3>
        <ul className="space-y-2 text-sm" style={{ color: "#5A6872" }}>
          <li>• <strong>Comece pequeno:</strong> R$ 20-30/dia é suficiente para testar e aprender.</li>
          <li>• <strong>Segmente por região:</strong> Foque nas cidades/estados onde você entrega.</li>
          <li>• <strong>Use extensões:</strong> Adicione links, telefone e localização nos anúncios.</li>
          <li>• <strong>Monitore diariamente:</strong> Pause palavras-chave que gastam sem converter.</li>
          <li>• <strong>Landing page:</strong> Envie o tráfego para páginas específicas de produtos, não a home.</li>
          <li>• <strong>Remarketing:</strong> Com o pixel instalado, você pode criar campanhas de remarketing para visitantes que não compraram.</li>
        </ul>
      </div>
    </div>
  );
};

const ADMIN_TABS = [
  { id: "content", label: "📄 Conteúdo", description: "Textos, imagens e configurações" },
  { id: "reviews", label: "📝 Reclamações", description: "Gerenciar e editar reclamações" },
  { id: "import", label: "📥 Importar", description: "Importar do Reclame Aqui" },
  { id: "ai", label: "🤖 IA", description: "Gerar avaliações com IA" },
  { id: "google-ads", label: "📢 Google Ads", description: "Configurar anúncios" },
  { id: "stores", label: "🏪 Lojas", description: "Cadastrar e gerenciar lojas" },
];

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { data: content, isLoading } = useSiteContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reviews");
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

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F2F4F6" }}>
        <p style={{ color: "#5A6872" }}>Carregando...</p>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const cv = (key: string, fallback = "") => {
    const item = (content || []).find(i => i.content_key === key);
    return item?.content_value || fallback;
  };

  const sections = (content || []).reduce<Record<string, SiteContent[]>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const sectionOrder = ["hero", "reputation", "trust", "performance", "sidebar", "content", "geral"];
  const sortedSections = sectionOrder.filter((s) => sections[s]);

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
        {activeTab === "content" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold" style={{ color: "#1A2B3D" }}>Gerenciar Conteúdo</h2>
              <p className="text-sm mt-1" style={{ color: "#5A6872" }}>
                Edite textos, imagens e configurações do site.
              </p>
            </div>
            {sortedSections.map((section) => (
              <SectionGroup key={section} section={section} items={sections[section]} />
            ))}
          </>
        )}

        {activeTab === "reviews" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold" style={{ color: "#1A2B3D" }}>Gerenciar Reclamações</h2>
              <p className="text-sm mt-1" style={{ color: "#5A6872" }}>
                Edite títulos, descrições, categorias e status de cada reclamação.
              </p>
            </div>
            <ManageReviewsSection />
          </>
        )}

        {activeTab === "import" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold" style={{ color: "#1A2B3D" }}>Importar Reclamações</h2>
              <p className="text-sm mt-1" style={{ color: "#5A6872" }}>
                Importe reclamações do Reclame Aqui com substituição automática de palavras.
              </p>
            </div>
            <ImportReviewsSection />
          </>
        )}

        {activeTab === "ai" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold" style={{ color: "#1A2B3D" }}>Avaliações com IA</h2>
              <p className="text-sm mt-1" style={{ color: "#5A6872" }}>
                Gere avaliações realistas automaticamente usando inteligência artificial.
              </p>
            </div>
            <AIReviewsSection
              companyName={cv('company_name', 'Agro Brasil')}
              companyCategory={cv('company_category', 'Marketplace')}
            />
          </>
        )}

        {activeTab === "google-ads" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold" style={{ color: "#1A2B3D" }}>Google Ads</h2>
              <p className="text-sm mt-1" style={{ color: "#5A6872" }}>
                Configure e gerencie seus anúncios no Google para atrair mais clientes.
              </p>
            </div>
            <GoogleAdsGuide />
          </>
        )}

        {activeTab === "stores" && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold" style={{ color: "#1A2B3D" }}>Gerenciar Lojas</h2>
              <p className="text-sm mt-1" style={{ color: "#5A6872" }}>
                Cadastre, edite e organize as lojas exibidas no site.
              </p>
            </div>
            <ManageStoresSection />
          </>
        )}
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
