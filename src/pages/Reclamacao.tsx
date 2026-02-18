import { useParams, Link } from "react-router-dom";
import { useReview } from "@/hooks/use-reviews";

/* ───────────── MOCK DATA (fallback for old IDs) ───────────── */
const MOCK_COMPLAINTS: Record<string, {
  id: string; title: string; desc: string; fullText: string;
  author: string; city: string; time: string; status: "respondida" | "nao_respondida" | "avaliada";
  category: string; reactions: { up: number; down: number }; rating?: number;
  response?: { text: string; time: string };
}> = {
  "1": { id: "1", title: "Atraso na entrega de notebook comprado via pix na Amazon", desc: "Fiz a compra via pix de um notebook...", fullText: "Fiz a compra via pix de um notebook, na empresa amazon, no dia 23/12/2025, com prazo de entrega para o dia 05/01/2026. Além de não ter sido entregue o produto, não consta em nenhum campo uma garantia de entrega. O rastreamento do pedido mostra que o produto está parado no centro de distribuição desde o dia 28/12.", author: "João S.", city: "São Paulo - SP", time: "Há 1 hora", status: "respondida", category: "Produto não recebido", reactions: { up: 12, down: 2 }, response: { text: "Olá, João! Sentimos muito pelo transtorno. Identificamos que houve um atraso logístico no centro de distribuição.", time: "Há 30 minutos" } },
  "2": { id: "2", title: "Site em loop impede a geração do código de pré-envio para devolução.", desc: "O site está em loop...", fullText: "O site está em loop, toda vez que abro a parte de devolução ele não encaminha para geração de código do pré-envio. Já tentei por diferentes navegadores e dispositivos.", author: "Maria C.", city: "Rio de Janeiro - RJ", time: "Há 2 horas", status: "respondida", category: "Problemas com o site", reactions: { up: 8, down: 1 }, response: { text: "Olá, Maria! Pedimos desculpas pelo inconveniente. Estamos cientes do problema técnico.", time: "Há 1 hora" } },
  "3": { id: "3", title: "Cobrança indevida no cartão após cancelamento de pedido", desc: "Cancelei um pedido...", fullText: "Cancelei um pedido no dia 10/01 e até agora não recebi o estorno no meu cartão de crédito. O valor de R$ 459,90 continua aparecendo na fatura.", author: "Carlos R.", city: "Belo Horizonte - MG", time: "Há 3 horas", status: "nao_respondida", category: "Cobrança indevida", reactions: { up: 25, down: 3 } },
  "4": { id: "4", title: "Produto chegou danificado e empresa não aceita troca", desc: "Comprei um monitor...", fullText: "Comprei um monitor e chegou com a tela trincada. Ao solicitar troca, a empresa alega que o prazo de 7 dias já passou.", author: "Ana P.", city: "Curitiba - PR", time: "Há 5 horas", status: "avaliada", category: "Produto com defeito", reactions: { up: 42, down: 5 }, rating: 8, response: { text: "Olá, Ana! Lamentamos muito pelo ocorrido. Já autorizamos a troca do seu monitor.", time: "Há 4 horas" } },
  "5": { id: "5", title: "Reembolso prometido há 30 dias e nunca realizado", desc: "A Amazon prometeu reembolso...", fullText: "A Amazon prometeu reembolso de R$ 1.200 após devolução de produto. Já se passaram 30 dias e nenhum valor foi creditado.", author: "Pedro L.", city: "Brasília - DF", time: "Há 6 horas", status: "nao_respondida", category: "Reembolso", reactions: { up: 56, down: 8 } },
};

const STATUS_MAP = {
  respondida: { label: "Respondida", emoji: "😊", bg: "#38A169" },
  nao_respondida: { label: "Não respondida", emoji: "😕", bg: "#E53E3E" },
  avaliada: { label: "Avaliada", emoji: "⭐", bg: "#2B6CB0" },
};

const Header = () => (
  <header className="bg-background border-b border-border">
    <div className="max-w-[1286px] mx-auto flex items-center justify-between px-4 md:px-6 py-2">
      <Link to="/" className="flex items-center gap-2">
        <img src="/images/logo-25-anos.svg" alt="ReclameAQUI 25 anos" className="h-7 md:h-9 w-auto" />
      </Link>
      <div className="flex items-center gap-2 md:gap-3">
        <button className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold border border-primary rounded-full text-primary hover:bg-primary/5">Entrar</button>
        <button className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90">Criar conta</button>
      </div>
    </div>
  </header>
);

function formatTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `Há ${diffMin} minutos`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Há ${diffH} hora${diffH > 1 ? 's' : ''}`;
  const diffD = Math.floor(diffH / 24);
  return `Há ${diffD} dia${diffD > 1 ? 's' : ''}`;
}

const Reclamacao = () => {
  const { id } = useParams<{ id: string }>();

  // Check if it's a UUID (DB review) or numeric (mock)
  const isUuid = id && id.length > 10;
  const { data: dbReview, isLoading } = useReview(isUuid ? id : undefined);

  // Try mock data for short IDs
  const mockComplaint = !isUuid && id ? MOCK_COMPLAINTS[id] : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Header />
        <div className="max-w-[900px] mx-auto px-4 py-20 text-center">
          <p className="text-sm" style={{ color: '#8A9BAE' }}>Carregando...</p>
        </div>
      </div>
    );
  }

  // Normalize data
  const complaint = dbReview
    ? {
        title: dbReview.title,
        fullText: dbReview.full_text || dbReview.description,
        author: dbReview.author_name,
        city: dbReview.author_city,
        time: formatTimeAgo(dbReview.created_at),
        status: dbReview.status as "respondida" | "nao_respondida" | "avaliada",
        category: dbReview.category,
        reactions: { up: dbReview.reactions_up, down: dbReview.reactions_down },
        rating: dbReview.rating,
        product: dbReview.product,
        response: dbReview.response_text
          ? { text: dbReview.response_text, time: dbReview.response_time || "" }
          : undefined,
      }
    : mockComplaint
    ? {
        title: mockComplaint.title,
        fullText: mockComplaint.fullText,
        author: mockComplaint.author,
        city: mockComplaint.city,
        time: mockComplaint.time,
        status: mockComplaint.status,
        category: mockComplaint.category,
        reactions: mockComplaint.reactions,
        rating: mockComplaint.rating,
        product: undefined as string | undefined,
        response: mockComplaint.response,
      }
    : null;

  if (!complaint) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Header />
        <div className="max-w-[900px] mx-auto px-4 py-20 text-center">
          <h1 className="text-xl font-bold mb-2" style={{ color: '#1A2B3D' }}>Reclamação não encontrada</h1>
          <Link to="/reclamacoes" className="text-sm font-semibold" style={{ color: '#2B6CB0' }}>← Voltar às reclamações</Link>
        </div>
      </div>
    );
  }

  const status = STATUS_MAP[complaint.status];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <div className="bg-background border-b" style={{ borderColor: '#E8ECF0' }}>
        <div className="max-w-[900px] mx-auto px-4 md:px-6 py-3 flex items-center gap-2 text-xs" style={{ color: '#8A9BAE' }}>
          <Link to="/" className="hover:underline" style={{ color: '#2B6CB0' }}>Amazon</Link>
          <span>›</span>
          <Link to="/reclamacoes" className="hover:underline" style={{ color: '#2B6CB0' }}>Reclamações</Link>
          <span>›</span>
          <span className="truncate max-w-[200px]">{complaint.title}</span>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-6">
        <div className="bg-background rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
          <div className="px-5 md:px-8 pt-6 pb-4">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: status.bg }}>
                {status.emoji} {status.label}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: '#F0F4F8', color: '#5A6872' }}>{complaint.category}</span>
              {complaint.product && (
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: '#E5EEFB', color: '#2B6CB0' }}>📦 {complaint.product}</span>
              )}
              {complaint.status === "avaliada" && complaint.rating != null && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#E5EEFB', color: '#2B6CB0' }}>
                  Nota do consumidor: {complaint.rating}/10
                </span>
              )}
              <span className="text-xs ml-auto" style={{ color: '#8A9BAE' }}>{complaint.time}</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#1A2B3D' }}>{complaint.title}</h1>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#8A9BAE' }}>
              <span className="font-medium" style={{ color: '#5A6872' }}>{complaint.author}</span>
              <span>·</span>
              <span>{complaint.city}</span>
            </div>
          </div>

          <div className="px-5 md:px-8 pb-5">
            <p className="text-sm leading-relaxed" style={{ color: '#3D4F5F' }}>{complaint.fullText}</p>
          </div>

          <div className="px-5 md:px-8 pb-5">
            <div className="flex items-center gap-4 py-3 border-t border-b" style={{ borderColor: '#E8ECF0' }}>
              <span className="text-xs font-medium" style={{ color: '#8A9BAE' }}>Esta reclamação foi útil?</span>
              <button className="flex items-center gap-1.5 text-sm hover:opacity-80">
                👍 <span className="text-xs" style={{ color: '#5A6872' }}>{complaint.reactions.up}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm hover:opacity-80">
                👎 <span className="text-xs" style={{ color: '#5A6872' }}>{complaint.reactions.down}</span>
              </button>
            </div>
          </div>

          {complaint.response && (
            <div className="mx-5 md:mx-8 mb-6 rounded-xl p-5" style={{ backgroundColor: '#F7F9FB', border: '1px solid #E8ECF0' }}>
              <div className="flex items-center gap-3 mb-3">
                <img src="/images/amazon-logo.jpg" alt="Amazon" className="w-10 h-10 rounded-full object-cover border border-border" />
                <div>
                  <p className="text-sm font-bold" style={{ color: '#1A2B3D' }}>Resposta da Amazon</p>
                  <p className="text-xs" style={{ color: '#8A9BAE' }}>{complaint.response.time}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#3D4F5F' }}>{complaint.response.text}</p>
            </div>
          )}

          {!complaint.response && (
            <div className="mx-5 md:mx-8 mb-6 rounded-xl p-5 text-center" style={{ backgroundColor: '#FFF5F5', border: '1px solid #FED7D7' }}>
              <p className="text-sm font-semibold" style={{ color: '#E53E3E' }}>😕 Aguardando resposta da empresa</p>
              <p className="text-xs mt-1" style={{ color: '#8A9BAE' }}>A empresa ainda não respondeu esta reclamação.</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/reclamacoes" className="text-sm font-semibold" style={{ color: '#2B6CB0' }}>← Voltar às reclamações</Link>
        </div>
      </div>
    </div>
  );
};

export default Reclamacao;
