import "https://esm.sh/@supabase/supabase-js@2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const cities = [
  "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG",
  "Curitiba - PR", "Porto Alegre - RS", "Salvador - BA",
  "Brasília - DF", "Recife - PE", "Fortaleza - CE", "Manaus - AM",
  "Goiânia - GO", "Campinas - SP", "Florianópolis - SC", "Belém - PA",
];

const firstNames = [
  "Ana", "Carlos", "Maria", "João", "Juliana", "Pedro", "Fernanda", "Lucas",
  "Camila", "Rafael", "Beatriz", "Thiago", "Larissa", "Gustavo", "Patricia",
  "Marcos", "Aline", "Ricardo", "Bruna", "Felipe", "Daniela", "Roberto",
];

const lastInitials = "A B C D F G L M N O P R S T V".split(" ");

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Template {
  titles: string[];
  descriptions: string[];
  fullTexts: string[];
  categories: string[];
  products: string[];
  responses: string[];
}

const ecommerceTemplates: Template = {
  titles: [
    "Produto chegou com defeito",
    "Atraso na entrega do pedido",
    "Produto diferente do anunciado",
    "Não consigo rastrear meu pedido",
    "Cobrança duplicada no cartão",
    "Pedido cancelado sem aviso",
    "Produto veio sem embalagem adequada",
    "Reembolso não processado",
    "Atendimento ao cliente péssimo",
    "Produto de qualidade inferior",
    "Entrega realizada no endereço errado",
    "Cupom de desconto não funcionou",
    "Frete muito caro",
    "Site fora do ar durante a compra",
    "Garantia não honrada",
  ],
  descriptions: [
    "Recebi o produto com defeito e não consigo trocar.",
    "Meu pedido está atrasado há mais de uma semana.",
    "O produto que recebi é completamente diferente do anúncio.",
    "Não consigo rastrear meu pedido, código inválido.",
    "Fui cobrado duas vezes pelo mesmo pedido.",
    "Meu pedido foi cancelado sem nenhuma explicação.",
    "O produto veio sem proteção, todo amassado.",
    "Solicitei reembolso há 15 dias e nada.",
    "Tentei contato várias vezes e não obtive resposta.",
    "A qualidade do produto é muito inferior ao esperado.",
  ],
  fullTexts: [
    "Realizei a compra no dia {date} e o produto chegou com defeito visível na embalagem. Já tentei entrar em contato com o SAC por telefone e por e-mail, mas não obtive nenhuma resposta satisfatória. Preciso de uma solução urgente, pois o produto era um presente. Estou muito decepcionado com o atendimento desta empresa.",
    "Fiz meu pedido há mais de 10 dias e o status ainda aparece como 'em processamento'. O prazo informado era de 5 dias úteis. Já tentei contato pelo chat online e me disseram para aguardar, mas já passou muito do prazo. Gostaria que a empresa se posicionasse sobre quando vou receber meu produto.",
    "Comprei um {product} e quando abri a embalagem percebi que o produto era completamente diferente do que estava anunciado no site. As fotos mostravam um produto de alta qualidade mas o que recebi é visivelmente inferior. Me sinto enganado e quero meu dinheiro de volta.",
    "Tentei usar o cupom de desconto que recebi por e-mail e ele não funcionou. Entrei em contato com o suporte e me disseram que o cupom havia expirado, mas a data de validade ainda não tinha passado. Péssimo atendimento, propaganda enganosa.",
    "Fui cobrado duas vezes no meu cartão de crédito pelo mesmo pedido. Já enviei os comprovantes para o financeiro e até agora nada de estorno. Isso é um absurdo! Estou pagando juros por causa do erro da empresa. Preciso de uma resolução imediata.",
    "Meu pedido foi entregue no endereço errado mesmo eu tendo conferido o endereço no momento da compra. O entregador deixou o pacote em outro apartamento e agora ninguém sabe onde está. A empresa diz que a entrega foi realizada com sucesso mas eu não recebi nada.",
    "Comprei o produto na promoção Black Friday e até hoje não recebi. O prazo já expirou há semanas. Quando entro em contato, me pedem para aguardar mais. Isso é falta de respeito com o consumidor. Nunca mais compro nesta loja.",
    "Solicitei a troca do produto dentro do prazo de 7 dias mas a empresa alega que o produto foi usado. O produto veio com defeito de fábrica e eu apenas abri para verificar. Agora querem que eu pague o frete de devolução. Absurdo total.",
  ],
  categories: [
    "Entrega", "Produto", "Atendimento", "Cobrança", "Troca/Devolução",
    "Propaganda Enganosa", "Garantia", "Frete", "Site/App",
  ],
  products: [
    "Smartphone Samsung Galaxy", "Notebook Dell Inspiron", "Fone Bluetooth JBL",
    "Smart TV 50\" LG", "Tênis Nike Air Max", "Geladeira Electrolux",
    "Cafeteira Nespresso", "Aspirador Robô", "Monitor Gamer 27\"",
    "Tablet Apple iPad", "Air Fryer Philips", "Caixa de Som Portátil",
    "Relógio Smartwatch", "Câmera de Segurança Wi-Fi", "Console PlayStation 5",
  ],
  responses: [
    "Olá! Lamentamos pelo ocorrido. Já encaminhamos seu caso para a equipe responsável e entraremos em contato em até 48 horas com uma solução. Agradecemos sua paciência.",
    "Prezado(a) cliente, pedimos desculpas pelo transtorno. Estamos verificando seu pedido e em breve retornaremos com uma posição. Qualquer dúvida, estamos à disposição.",
    "Sentimos muito pela experiência negativa. Já abrimos um chamado interno para resolver sua situação o mais rápido possível. Fique tranquilo(a) que vamos resolver.",
    "Olá! Agradecemos por nos informar. Identificamos o problema e já estamos providenciando o envio de um novo produto. Você receberá o código de rastreio por e-mail.",
    "Prezado(a), lamentamos o inconveniente. O estorno já foi solicitado ao setor financeiro e deve aparecer na sua fatura em até 5 dias úteis. Pedimos desculpas.",
  ],
};

function generateReview(companyName: string) {
  const t = ecommerceTemplates;
  const status = pick(["respondida", "nao_respondida", "avaliada", "respondida", "respondida"]);
  const rating = status === "nao_respondida" ? randInt(1, 4) : randInt(3, 8);
  const product = pick(t.products);
  const date = `${randInt(1, 28)}/${randInt(1, 12)}/2025`;

  let fullText = pick(t.fullTexts)
    .replace("{date}", date)
    .replace("{product}", product);

  return {
    title: pick(t.titles),
    description: pick(t.descriptions),
    full_text: fullText,
    author_name: `${pick(firstNames)} ${pick(lastInitials)}.`,
    author_city: pick(cities),
    status,
    category: pick(t.categories),
    product,
    rating,
    reactions_up: randInt(1, 50),
    reactions_down: randInt(0, 8),
    response_text: (status === "respondida" || status === "avaliada") ? pick(t.responses) : null,
    response_time: (status === "respondida" || status === "avaliada") ? `Há ${randInt(1, 72)} horas` : null,
    is_ai_generated: true,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { companyName, quantity } = await req.json();
    const count = Math.min(quantity || 5, 10);

    const rowsToInsert = Array.from({ length: count }, () => generateReview(companyName || "Empresa"));

    const { data: inserted, error: insertError } = await supabase
      .from('reviews')
      .insert(rowsToInsert)
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(
        JSON.stringify({ success: true, reviews: rowsToInsert, saved: false, error: insertError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, reviews: inserted, saved: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
