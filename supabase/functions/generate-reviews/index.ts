import "https://esm.sh/@supabase/supabase-js@2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'LOVABLE_API_KEY is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get auth token from request
    const authHeader = req.headers.get('Authorization');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { companyName, companyCategory, quantity } = await req.json();
    const count = Math.min(quantity || 5, 10);

    const cities = [
      "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG",
      "Curitiba - PR", "Porto Alegre - RS", "Salvador - BA",
      "Brasília - DF", "Recife - PE", "Fortaleza - CE", "Manaus - AM"
    ];

    const systemPrompt = `Você é um gerador de avaliações realistas para o site Reclame AQUI. 
Gere avaliações que pareçam reais, escritas por consumidores brasileiros, com linguagem natural e variada.
Cada avaliação deve ter: título, texto da reclamação (detalhado, 3-5 frases), nome do consumidor (fictício brasileiro), nota (1-10), status (respondida/nao_respondida/avaliada), categoria do problema, e produto relacionado.
Para avaliações com status "respondida" ou "avaliada", inclua também uma resposta da empresa.
Responda APENAS com JSON válido, sem markdown.`;

    const userPrompt = `Gere ${count} avaliações/reclamações realistas para a empresa "${companyName}" do segmento "${companyCategory}".
Inclua reclamações sobre produtos e serviços típicos desse segmento.
Retorne um array JSON com objetos no formato:
[{
  "title": "título da reclamação",
  "description": "resumo curto (1 frase)",
  "full_text": "texto completo da reclamação (3-5 frases detalhadas)",
  "author_name": "Nome Completo S.",
  "author_city": "${cities[Math.floor(Math.random() * cities.length)]}",
  "status": "respondida",
  "category": "categoria do problema",
  "product": "nome do produto",
  "rating": 7,
  "response_text": "resposta da empresa (apenas se status for respondida ou avaliada, null caso contrário)",
  "response_time": "Há X horas"
}]`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit excedido. Tente novamente em alguns segundos.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Créditos insuficientes. Adicione créditos ao workspace.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const t = await response.text();
      console.error('AI gateway error:', response.status, t);
      return new Response(JSON.stringify({ error: 'Erro no gateway de IA' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '[]';

    let reviews: any[];
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      reviews = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      console.error('Failed to parse AI response:', content);
      reviews = [];
    }

    // Save to database
    const rowsToInsert = reviews.map((r: any) => ({
      title: r.title || 'Sem título',
      description: r.description || r.title || '',
      full_text: r.full_text || r.description || '',
      author_name: r.author_name || r.author || 'Consumidor',
      author_city: r.author_city || cities[Math.floor(Math.random() * cities.length)],
      status: r.status || 'nao_respondida',
      category: r.category || '',
      product: r.product || '',
      rating: r.rating || null,
      reactions_up: Math.floor(Math.random() * 50) + 1,
      reactions_down: Math.floor(Math.random() * 8),
      response_text: r.response_text || null,
      response_time: r.response_time || null,
      is_ai_generated: true,
    }));

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
