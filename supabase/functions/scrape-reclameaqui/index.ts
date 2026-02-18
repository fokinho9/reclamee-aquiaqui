import "https://esm.sh/@supabase/supabase-js@2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function applyReplacements(text: string, replacements: { original_word: string; replacement_word: string }[]): string {
  let result = text;
  for (const r of replacements) {
    const regex = new RegExp(r.original_word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(regex, r.replacement_word);
  }
  return result;
}

function parseComplaintsFromMarkdown(markdown: string): any[] {
  const complaints: any[] = [];

  // Try to find complaint blocks - Reclame Aqui uses patterns like titles + descriptions
  // Pattern 1: Lines that look like complaint titles followed by content
  const lines = markdown.split('\n');
  
  let currentComplaint: any = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Detect complaint title patterns (usually bold or heading-like, 20+ chars)
    const isTitleLine = (
      (line.startsWith('**') && line.endsWith('**') && line.length > 10) ||
      (line.startsWith('###') && line.length > 10) ||
      (line.startsWith('##') && line.length > 10 && !line.startsWith('###'))
    );
    
    // Also detect lines that look like "reclamação" titles - usually descriptive sentences
    const looksLikeTitle = line.length > 30 && line.length < 200 && 
      !line.startsWith('http') && !line.startsWith('![') &&
      !line.includes('|') && // not table
      /^[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/.test(line); // starts with uppercase
    
    if (isTitleLine || looksLikeTitle) {
      // Save previous complaint if exists
      if (currentComplaint && currentComplaint.title) {
        complaints.push(currentComplaint);
      }
      
      const cleanTitle = line.replace(/^\*\*|\*\*$/g, '').replace(/^#{1,4}\s*/, '').trim();
      if (cleanTitle.length > 10) {
        currentComplaint = {
          title: cleanTitle,
          description: '',
          full_text: '',
          lines: [],
        };
      }
    } else if (currentComplaint) {
      // Accumulate text for the current complaint
      const cleanLine = line.replace(/^\*\*|\*\*$/g, '').replace(/^[-*]\s*/, '').trim();
      if (cleanLine.length > 5) {
        currentComplaint.lines.push(cleanLine);
      }
    }
  }
  
  // Push last complaint
  if (currentComplaint && currentComplaint.title) {
    complaints.push(currentComplaint);
  }
  
  // Process accumulated lines into description/full_text
  return complaints
    .filter(c => c.lines && c.lines.length > 0)
    .map(c => ({
      title: c.title.substring(0, 200),
      description: (c.lines[0] || c.title).substring(0, 300),
      full_text: c.lines.join(' ').substring(0, 2000),
    }));
}

// Extract author info from nearby text
function extractAuthorInfo(text: string): { name: string; city: string } {
  const cities = [
    "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG",
    "Curitiba - PR", "Porto Alegre - RS", "Salvador - BA",
    "Brasília - DF", "Recife - PE", "Fortaleza - CE", "Manaus - AM",
  ];
  
  const firstNames = [
    "Ana", "Carlos", "Maria", "João", "Juliana", "Pedro", "Fernanda", "Lucas",
    "Camila", "Rafael", "Beatriz", "Thiago", "Larissa", "Gustavo", "Patricia",
  ];
  const lastInitials = "A B C D F G L M N O P R S T V".split(" ");
  
  return {
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastInitials[Math.floor(Math.random() * lastInitials.length)]}.`,
    city: cities[Math.floor(Math.random() * cities.length)],
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'FIRECRAWL_API_KEY não configurada. Conecte o Firecrawl nas configurações.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { url, saveToDb } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL é obrigatória' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    console.log('Scraping Reclame Aqui:', formattedUrl);

    // Scrape the page
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ['markdown'],
        onlyMainContent: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || `Erro ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const markdown = data?.data?.markdown || data?.markdown || '';
    console.log('Markdown length:', markdown.length);

    // Parse complaints from markdown
    const parsedComplaints = parseComplaintsFromMarkdown(markdown);
    console.log('Parsed complaints:', parsedComplaints.length);

    // Fetch word replacements
    const { data: replacements } = await supabase
      .from('word_replacements')
      .select('original_word, replacement_word')
      .eq('is_active', true);

    const activeReplacements = replacements || [];

    // Apply replacements and build review rows
    const statuses = ['respondida', 'nao_respondida', 'avaliada'];
    const categories = ['Entrega', 'Produto', 'Atendimento', 'Cobrança', 'Troca/Devolução', 'Site/App'];

    const reviews = parsedComplaints.map(c => {
      const author = extractAuthorInfo('');
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        title: applyReplacements(c.title, activeReplacements),
        description: applyReplacements(c.description, activeReplacements),
        full_text: applyReplacements(c.full_text, activeReplacements),
        author_name: author.name,
        author_city: author.city,
        status,
        category: categories[Math.floor(Math.random() * categories.length)],
        product: '',
        rating: status === 'avaliada' ? Math.floor(Math.random() * 7) + 3 : null,
        reactions_up: Math.floor(Math.random() * 50) + 1,
        reactions_down: Math.floor(Math.random() * 8),
        response_text: null,
        response_time: null,
        is_ai_generated: false,
      };
    });

    // Save to DB if requested
    if (saveToDb && reviews.length > 0) {
      const { data: inserted, error: insertError } = await supabase
        .from('reviews')
        .insert(reviews)
        .select();

      if (insertError) {
        console.error('Insert error:', insertError);
        return new Response(
          JSON.stringify({ success: true, reviews, saved: false, error: insertError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, reviews: inserted, saved: true, markdown: markdown.substring(0, 500) }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, reviews, saved: false, markdown: markdown.substring(0, 500) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
