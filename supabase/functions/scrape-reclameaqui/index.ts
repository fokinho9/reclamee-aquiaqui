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

interface ParsedComplaint {
  title: string;
  description: string;
  status: string;
  timeAgo: string;
  createdAt: string; // ISO date
}

function parseTimeAgoToDate(timeAgo: string): string {
  const now = new Date();
  const match = timeAgo.match(/(\d+)\s+(minuto|minutos|hora|horas|dia|dias|mês|meses|mes|ano|anos|semana|semanas)/i);
  if (!match) return now.toISOString();
  const amount = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  if (unit.startsWith('minuto')) now.setMinutes(now.getMinutes() - amount);
  else if (unit.startsWith('hora')) now.setHours(now.getHours() - amount);
  else if (unit.startsWith('dia')) now.setDate(now.getDate() - amount);
  else if (unit.startsWith('semana')) now.setDate(now.getDate() - amount * 7);
  else if (unit.startsWith('m')) now.setMonth(now.getMonth() - amount);
  else if (unit.startsWith('ano')) now.setFullYear(now.getFullYear() - amount);
  return now.toISOString();
}

function parseComplaintsFromMarkdown(markdown: string): ParsedComplaint[] {
  const complaints: ParsedComplaint[] = [];

  // Real complaints on Reclame Aqui appear as bold links like:
  // [**Title of complaint**](https://www.reclameaqui.com.br/company/slug_ID/)
  // Followed by description text and status info
  const complaintRegex = /\[\*\*([^*]+)\*\*\]\(https:\/\/www\.reclameaqui\.com\.br\/[^)]+\)/g;
  let match;
  const matches: { title: string; index: number }[] = [];

  while ((match = complaintRegex.exec(markdown)) !== null) {
    const title = match[1].trim();
    // Filter out non-complaint titles
    if (
      title.length > 15 &&
      !title.includes('RA Ads') &&
      !title.includes('Icone') &&
      !title.includes('selo') &&
      !title.toLowerCase().includes('reclamar') &&
      !title.toLowerCase().includes('saiba mais')
    ) {
      matches.push({ title, index: match.index + match[0].length });
    }
  }

  for (let i = 0; i < matches.length; i++) {
    const { title, index } = matches[i];
    // Get text between this match and the next one (or end)
    const endIndex = i + 1 < matches.length ? matches[i + 1].index - 200 : index + 500;
    const afterText = markdown.substring(index, Math.min(endIndex, index + 500)).trim();

    // Extract description: text before the next link or status marker
    let description = afterText
      .replace(/\[.*?\]\(.*?\)/g, '') // remove markdown links
      .replace(/!\[.*?\]\(.*?\)/g, '') // remove images
      .replace(/\*\*/g, '') // remove bold
      .replace(/\n+/g, ' ')
      .trim();

    // Extract status
    let status = 'nao_respondida';
    if (/respondida/i.test(afterText) && !/não respondida/i.test(afterText)) {
      status = 'respondida';
    }
    if (/não respondida/i.test(afterText) || /Não respondida/i.test(afterText)) {
      status = 'nao_respondida';
    }
    if (/avaliada/i.test(afterText)) {
      status = 'avaliada';
    }

    // Extract time
    let timeAgo = '';
    const timeMatch = afterText.match(/Há\s+\d+\s+(?:hora|horas|minuto|minutos|dia|dias|mês|meses|mes|ano|anos|semana|semanas)/i);
    if (timeMatch) {
      timeAgo = timeMatch[0];
    }

    // Clean description - take only meaningful text
    description = description.substring(0, 300).replace(/\s+/g, ' ').trim();
    // Remove status/time/UI artifacts from description
    description = description
      .replace(/(?:Não\s+)?respondida/gi, '')
      .replace(/avaliada/gi, '')
      .replace(/Há\s+\d+\s+(?:hora|horas|minuto|minutos|dia|dias?)/gi, '')
      .replace(/\d+\s*reações?\s*/gi, '')
      .replace(/Clique\s+para\s+ver\s+todas\s+as\s+reações\s+nesta\s+reclamação\.?\s*/gi, '')
      .replace(/deixe\s+sua\s+reação\s*/gi, '')
      .replace(/Não\s+resolvido\s*/gi, '')
      .replace(/Resolvido\s*/gi, '')
      .replace(/Clique\s*/gi, '')
      .replace(/\u200C/g, '')
      .replace(/‌/g, '')
      .replace(/\s*\[.*$/g, '') // remove trailing bracket artifacts
      .replace(/\s+s\s*$/g, '')
      .replace(/\.\.\.\s*$/g, '…')
      .replace(/\s+/g, ' ')
      .trim();

    if (title.length > 15) {
      complaints.push({
        title: title.substring(0, 200),
        description: description.substring(0, 300) || title,
        status,
        timeAgo,
        createdAt: parseTimeAgoToDate(timeAgo),
      });
    }
  }

  return complaints;
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

    const body = await req.json();
    const { url, saveToDb, deleteAll, deleteSearch, bulkReplace } = body;

    // Bulk replace: apply word replacements to all existing reviews (optionally filtered by storeId)
    if (bulkReplace) {
      const { data: replacements } = await supabase
        .from('word_replacements')
        .select('original_word, replacement_word')
        .eq('is_active', true);
      const activeReplacements = replacements || [];

      if (activeReplacements.length === 0) {
        return new Response(
          JSON.stringify({ success: true, updated: 0, message: 'No active word replacements found' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Build search pattern from all original words
      const searchTerms = activeReplacements.map(r => r.original_word);
      let query = supabase.from('reviews').select('id, title, description, full_text');
      if (bulkReplace.storeId) {
        query = query.eq('store_id', bulkReplace.storeId);
      }
      const { data: allReviews } = await query;
      
      let updatedCount = 0;
      for (const review of allReviews || []) {
        const newTitle = applyReplacements(review.title, activeReplacements);
        const newDesc = applyReplacements(review.description, activeReplacements);
        const newFull = applyReplacements(review.full_text || '', activeReplacements);
        
        if (newTitle !== review.title || newDesc !== review.description || newFull !== review.full_text) {
          await supabase.from('reviews').update({
            title: newTitle,
            description: newDesc,
            full_text: newFull,
          }).eq('id', review.id);
          updatedCount++;
        }
      }

      return new Response(
        JSON.stringify({ success: true, updated: updatedCount }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Delete reviews
    if (deleteAll || deleteSearch) {
      let query = supabase.from('reviews').delete();
      if (deleteSearch) {
        query = query.ilike('title', `%${deleteSearch}%`);
      } else {
        query = query.neq('id', '00000000-0000-0000-0000-000000000000'); // delete all
      }
      const { error: delError, count } = await query;
      if (delError) {
        return new Response(
          JSON.stringify({ success: false, error: delError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({ success: true, deleted: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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

    // Parse real complaints from markdown
    const parsedComplaints = parseComplaintsFromMarkdown(markdown);
    console.log('Parsed complaints:', parsedComplaints.length);

    // Fetch word replacements
    const { data: replacements } = await supabase
      .from('word_replacements')
      .select('original_word, replacement_word')
      .eq('is_active', true);

    const activeReplacements = replacements || [];

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

    const reviews = parsedComplaints.map(c => ({
      title: applyReplacements(c.title, activeReplacements),
      description: applyReplacements(c.description || c.title, activeReplacements),
      full_text: applyReplacements(c.description || c.title, activeReplacements),
      author_name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastInitials[Math.floor(Math.random() * lastInitials.length)]}.`,
      author_city: cities[Math.floor(Math.random() * cities.length)],
      status: c.status,
      category: '',
      product: '',
      rating: c.status === 'avaliada' ? Math.floor(Math.random() * 7) + 3 : null,
      reactions_up: Math.floor(Math.random() * 50) + 1,
      reactions_down: Math.floor(Math.random() * 8),
      response_text: null,
      response_time: c.timeAgo || null,
      is_ai_generated: false,
      created_at: c.createdAt,
    }));

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
        JSON.stringify({ success: true, reviews: inserted, saved: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, reviews, saved: false, markdownPreview: markdown.substring(0, 300) }),
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
