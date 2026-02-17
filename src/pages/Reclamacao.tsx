import { useParams, Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

/* ───────────── MOCK DATA (same as listing) ───────────── */
const COMPLAINTS: Record<string, {
  id: string; title: string; desc: string; fullText: string;
  author: string; city: string; time: string; status: "respondida" | "nao_respondida" | "avaliada";
  category: string; reactions: { up: number; down: number }; rating?: number;
  response?: { text: string; time: string };
}> = {
  "1": {
    id: "1",
    title: "Atraso na entrega de notebook comprado via pix na Amazon",
    desc: "Fiz a compra via pix de um notebook, na empresa amazon, no dia 23/12/2025, com prazo de entrega para o dia 05/01/2026.",
    fullText: "Fiz a compra via pix de um notebook, na empresa amazon, no dia 23/12/2025, com prazo de entrega para o dia 05/01/2026. Além de não ter sido entregue o produto, não consta em nenhum campo uma garantia de entrega. O rastreamento do pedido mostra que o produto está parado no centro de distribuição desde o dia 28/12. Já tentei contato pelo chat, telefone e e-mail, mas nenhum canal consegue me dar uma previsão concreta. Preciso do notebook para trabalho e estou tendo prejuízos por conta desse atraso absurdo.",
    author: "João S.",
    city: "São Paulo - SP",
    time: "Há 1 hora",
    status: "respondida",
    category: "Produto não recebido",
    reactions: { up: 12, down: 2 },
    response: {
      text: "Olá, João! Sentimos muito pelo transtorno. Identificamos que houve um atraso logístico no centro de distribuição e já estamos priorizando o envio do seu pedido. A previsão de entrega atualizada é até 12/01/2026. Caso não receba até essa data, entre em contato conosco para solicitar o reembolso integral. Agradecemos sua paciência.",
      time: "Há 30 minutos",
    },
  },
  "2": {
    id: "2",
    title: "Site em loop impede a geração do código de pré-envio para devolução.",
    desc: "O site está em loop, toda vez que abro a parte de devolução ele não encaminha para geração de código do pré-envio.",
    fullText: "O site está em loop, toda vez que abro a parte de devolução ele não encaminha para geração de código do pré-envio. Já tentei por diferentes navegadores (Chrome, Firefox, Edge) e dispositivos (celular e computador). Também limpei cache e cookies. O problema persiste há 3 dias e preciso devolver o produto dentro do prazo de 7 dias. Se eu perder o prazo por causa desse erro do site, vou considerar isso uma violação do meu direito como consumidor.",
    author: "Maria C.",
    city: "Rio de Janeiro - RJ",
    time: "Há 2 horas",
    status: "respondida",
    category: "Problemas com o site",
    reactions: { up: 8, down: 1 },
    response: {
      text: "Olá, Maria! Pedimos desculpas pelo inconveniente. Estamos cientes do problema técnico e nossa equipe já está trabalhando na correção. Enquanto isso, você pode solicitar o código de devolução diretamente pelo nosso chat de atendimento. Seu prazo de devolução será estendido automaticamente.",
      time: "Há 1 hora",
    },
  },
  "3": {
    id: "3",
    title: "Cobrança indevida no cartão após cancelamento de pedido",
    desc: "Cancelei um pedido no dia 10/01 e até agora não recebi o estorno no meu cartão de crédito.",
    fullText: "Cancelei um pedido no dia 10/01 e até agora não recebi o estorno no meu cartão de crédito. O valor de R$ 459,90 continua aparecendo na fatura. Já entrei em contato 2 vezes e me informaram que o estorno seria processado em até 7 dias úteis, mas já se passaram 15 dias úteis. Preciso desse valor de volta urgentemente pois já estou pagando juros na fatura do cartão.",
    author: "Carlos R.",
    city: "Belo Horizonte - MG",
    time: "Há 3 horas",
    status: "nao_respondida",
    category: "Cobrança indevida",
    reactions: { up: 25, down: 3 },
  },
  "4": {
    id: "4",
    title: "Produto chegou danificado e empresa não aceita troca",
    desc: "Comprei um monitor e chegou com a tela trincada.",
    fullText: "Comprei um monitor e chegou com a tela trincada. Ao solicitar troca, a empresa alega que o prazo de 7 dias já passou, porém fiz a solicitação no mesmo dia da entrega. Tenho prints e fotos que comprovam. A embalagem estava visivelmente amassada e o produto veio sem proteção adequada. Isso é claramente um problema de transporte e a empresa deveria assumir a responsabilidade.",
    author: "Ana P.",
    city: "Curitiba - PR",
    time: "Há 5 horas",
    status: "avaliada",
    category: "Produto com defeito",
    reactions: { up: 42, down: 5 },
    rating: 8,
    response: {
      text: "Olá, Ana! Lamentamos muito pelo ocorrido. Após análise, identificamos que houve um erro em nosso sistema sobre a data da solicitação. Já autorizamos a troca do seu monitor e um novo produto será enviado em até 3 dias úteis sem custo adicional. Também estamos melhorando nossas embalagens para evitar danos no transporte.",
      time: "Há 4 horas",
    },
  },
  "5": {
    id: "5",
    title: "Reembolso prometido há 30 dias e nunca realizado",
    desc: "A Amazon prometeu reembolso de R$ 1.200 após devolução de produto.",
    fullText: "A Amazon prometeu reembolso de R$ 1.200 após devolução de produto. Já se passaram 30 dias e nenhum valor foi creditado. Todos os atendentes dizem que vão resolver mas nada acontece. Tenho o protocolo de devolução, comprovante de postagem nos Correios e confirmação de recebimento do produto pelo centro de distribuição. Mesmo assim, o reembolso não é processado.",
    author: "Pedro L.",
    city: "Brasília - DF",
    time: "Há 6 horas",
    status: "nao_respondida",
    category: "Reembolso",
    reactions: { up: 56, down: 8 },
  },
  "6": {
    id: "6",
    title: "Assinatura Prime cobrada em duplicidade",
    desc: "Fui cobrado duas vezes pela assinatura Prime no mesmo mês.",
    fullText: "Fui cobrado duas vezes pela assinatura Prime no mesmo mês. Já entrei em contato 3 vezes e cada atendente dá uma informação diferente sobre o estorno. O primeiro disse que seria em 5 dias, o segundo em 15 dias e o terceiro disse que não havia cobrança em duplicidade. Tenho o extrato bancário que comprova as duas cobranças de R$ 14,90.",
    author: "Fernanda M.",
    city: "Porto Alegre - RS",
    time: "Há 8 horas",
    status: "respondida",
    category: "Cobrança indevida",
    reactions: { up: 18, down: 2 },
    response: {
      text: "Olá, Fernanda! Verificamos e de fato houve uma cobrança em duplicidade na sua assinatura Prime. O estorno de R$ 14,90 já foi solicitado e deve aparecer na sua fatura em até 2 faturas. Pedimos desculpas pelo inconveniente.",
      time: "Há 6 horas",
    },
  },
  "7": {
    id: "7",
    title: "Entrega feita no endereço errado",
    desc: "Meu pedido foi marcado como entregue, porém não recebi nada.",
    fullText: "Meu pedido foi marcado como entregue, porém não recebi nada. Ao verificar com o entregador, descobri que foi entregue em outro endereço. O endereço cadastrado no meu perfil está correto, mas a etiqueta do pacote tinha um endereço completamente diferente. Já abri chamado e me pediram para esperar 48 horas, mas já se passaram 5 dias.",
    author: "Lucas T.",
    city: "Recife - PE",
    time: "Há 12 horas",
    status: "avaliada",
    category: "Produto não recebido",
    reactions: { up: 33, down: 4 },
    rating: 2,
    response: {
      text: "Olá, Lucas! Lamentamos o ocorrido. Estamos investigando o problema com a transportadora. Um novo produto foi enviado para o endereço correto e deve chegar em 2 dias úteis.",
      time: "Há 10 horas",
    },
  },
  "8": {
    id: "8",
    title: "Produto diferente do anunciado na página",
    desc: "Comprei um fone de ouvido bluetooth modelo X e recebi o modelo Y.",
    fullText: "Comprei um fone de ouvido bluetooth modelo X e recebi o modelo Y, muito inferior. A foto e especificações do anúncio são completamente diferentes do produto recebido. O modelo anunciado tem cancelamento de ruído ativo e bateria de 30h, já o que recebi não tem cancelamento de ruído e a bateria dura apenas 8h. Isso é propaganda enganosa.",
    author: "Juliana F.",
    city: "Salvador - BA",
    time: "Há 1 dia",
    status: "respondida",
    category: "Propaganda enganosa",
    reactions: { up: 29, down: 3 },
    response: {
      text: "Olá, Juliana! Pedimos desculpas pelo erro. Verificamos que houve um engano na separação do produto no nosso estoque. Já autorizamos a devolução sem custo e o produto correto será enviado assim que recebermos o item devolvido. Também corrigimos o anúncio para evitar confusões futuras.",
      time: "Há 20 horas",
    },
  },
};

const STATUS_MAP = {
  respondida: { label: "Respondida", emoji: "😊", bg: "#38A169" },
  nao_respondida: { label: "Não respondida", emoji: "😕", bg: "#E53E3E" },
  avaliada: { label: "Avaliada", emoji: "⭐", bg: "#2B6CB0" },
};

/* ───────────── HEADER ───────────── */
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

/* ───────────── PAGE ───────────── */
const Reclamacao = () => {
  const { id } = useParams<{ id: string }>();
  const complaint = id ? COMPLAINTS[id] : undefined;

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

      {/* Breadcrumb */}
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
        {/* Complaint card */}
        <div className="bg-background rounded-xl overflow-hidden" style={{ border: '1px solid #E8ECF0' }}>
          {/* Header */}
          <div className="px-5 md:px-8 pt-6 pb-4">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: status.bg }}>
                {status.emoji} {status.label}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: '#F0F4F8', color: '#5A6872' }}>{complaint.category}</span>
              {complaint.status === "avaliada" && complaint.rating !== undefined && (
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

          {/* Body */}
          <div className="px-5 md:px-8 pb-5">
            <p className="text-sm leading-relaxed" style={{ color: '#3D4F5F' }}>{complaint.fullText}</p>
          </div>

          {/* Reactions */}
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

          {/* Company response */}
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

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link to="/reclamacoes" className="text-sm font-semibold" style={{ color: '#2B6CB0' }}>← Voltar às reclamações</Link>
        </div>
      </div>
    </div>
  );
};

export default Reclamacao;
