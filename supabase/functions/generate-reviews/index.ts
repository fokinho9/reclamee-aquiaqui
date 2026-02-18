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

    const { companyName, companyCategory, quantity } = await req.json();
    const count = Math.min(quantity || 5, 10);

    const systemPrompt = `Você é um gerador de avaliações realistas para o site Reclame AQUI. 
Gere avaliações que pareçam reais, escritas por consumidores brasileiros, com linguagem natural e variada.
Cada avaliação deve ter: título, texto da reclamação, nome do consumidor (fictício), nota (1-5), data recente, status (respondida/não respondida/avaliada), e se foi resolvida ou não.
Responda APENAS com JSON válido, sem markdown.`;

    const userPrompt = `Gere ${count} avaliações/reclamações realistas para a empresa "${companyName}" do segmento "${companyCategory}".
Inclua reclamações sobre produtos e serviços típicos desse segmento.
Retorne um array JSON com objetos no formato:
[{
  "title": "título da reclamação",
  "text": "texto completo da reclamação",
  "author": "Nome do Consumidor",
  "rating": 3,
  "date": "2025-01-15",
  "status": "respondida",
  "resolved": true,
  "product": "nome do produto relacionado"
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

    // Parse the JSON from AI response
    let reviews;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      reviews = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      console.error('Failed to parse AI response:', content);
      reviews = [];
    }

    return new Response(
      JSON.stringify({ success: true, reviews }),
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
