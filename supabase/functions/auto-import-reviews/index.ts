import "https://esm.sh/@supabase/supabase-js@2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function cleanText(text: string): string {
  return text
    .replace(/\u200C/g, '')
    .replace(/\s+s\b/g, '')
    .replace(/‌/g, '')
    .replace(/\.\.\./g, '…')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

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
}

function parseComplaintsFromMarkdown(markdown: string): ParsedComplaint[] {
  const complaints: ParsedComplaint[] = [];
  const complaintRegex = /\[\*\*([^*]+)\*\*\]\(https:\/\/www\.reclameaqui\.com\.br\/[^)]+\)/g;
  let match;
  const matches: { title: string; index: number }[] = [];

  while ((match = complaintRegex.exec(markdown)) !== null) {
    const title = match[1].trim();
    if (
      title.length > 15 &&
      !title.includes('RA Ads') &&
      !title.includes('Icone') &&
      !title.includes('selo') &&
      !title.toLowerCase().includes('reclamar') &&
      !title.toLowerCase().includes('saiba mais') &&
      !title.toLowerCase().includes('reputação') &&
      !title.toLowerCase().includes('indicadores') &&
      !/^https?:\/\//i.test(title) &&
      !title.includes('](')
    ) {
      matches.push({ title, index: match.index + match[0].length });
    }
  }

  for (let i = 0; i < matches.length; i++) {
    const { title, index } = matches[i];
    const endIndex = i + 1 < matches.length ? matches[i + 1].index - 200 : index + 500;
    const afterText = markdown.substring(index, Math.min(endIndex, index + 500)).trim();

    let description = afterText
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\*\*/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    let status = 'nao_respondida';
    // Check status - order matters: most specific first
    if (/avaliada|Avaliado pelo consumidor/i.test(afterText)) {
      status = 'avaliada';
    } else if (/não\s*respondida|Nao respondida|Aguardando/i.test(afterText)) {
      status = 'nao_respondida';
    } else if (/respondida|Respondido/i.test(afterText)) {
      status = 'respondida';
    }

    let timeAgo = '';
    const timeMatch = afterText.match(/Há\s+\d+\s+(?:hora|horas|minuto|minutos|dia|dias|semana|semanas|mês|meses|ano|anos)/i);
    if (timeMatch) timeAgo = timeMatch[0];

    description = description.substring(0, 300).replace(/\s+/g, ' ').trim();
    description = description
      .replace(/(?:Não\s+)?respondida/gi, '')
      .replace(/avaliada/gi, '')
      .replace(/Há\s+\d+\s+(?:hora|horas|minuto|minutos|dia|dias?|semana|semanas|mês|meses|ano|anos)/gi, '')
      .replace(/\d+\s*reações?\s*/gi, '')
      .replace(/Clique\s+para\s+ver\s+todas\s+as\s+reações\s+nesta\s+reclamação\.?\s*/gi, '')
      .replace(/deixe\s+sua\s+reação\s*/gi, '')
      .replace(/Não\s+resolvido\s*/gi, '')
      .replace(/Resolvido\s*/gi, '')
      .replace(/Clique\s*/gi, '')
      .replace(/\u200C/g, '')
      .replace(/‌/g, '')
      .replace(/\s*\[.*$/g, '')
      .replace(/\s+s\s*$/g, '')
      .replace(/\.\.\.\s*$/g, '…')
      .replace(/\d+\s+de\s+\d+\s*###.*$/gi, '')
      .replace(/###.*$/gi, '')
      .replace(/Filtrar\s+reclamações.*$/gi, '')
      .replace(/Limpar.*$/gi, '')
      .replace(/Filtros\s+especiais.*$/gi, '')
      .replace(/Blackfriday.*$/gi, '')
      .replace(/Covid-19.*$/gi, '')
      .replace(/\*\s*\*\s*\*/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (title.length > 15) {
      complaints.push({
        title: cleanText(title.substring(0, 200)),
        description: cleanText(description.substring(0, 300) || title),
        status,
        timeAgo,
      });
    }
  }

  return complaints;
}

function parseTimeAgoToDate(timeAgo: string): string {
  const now = new Date();
  const match = timeAgo.match(/(\d+)\s+(minuto|hora|dia|semana|mês|meses|ano)/i);
  if (!match) return now.toISOString();
  const amount = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  if (unit === 'minuto') now.setMinutes(now.getMinutes() - amount);
  else if (unit === 'hora') now.setHours(now.getHours() - amount);
  else if (unit === 'dia') now.setDate(now.getDate() - amount);
  else if (unit === 'semana') now.setDate(now.getDate() - amount * 7);
  else if (unit === 'mês' || unit === 'meses') now.setMonth(now.getMonth() - amount);
  else if (unit === 'ano') now.setFullYear(now.getFullYear() - amount);
  return now.toISOString();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'FIRECRAWL_API_KEY não configurada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body for page and url parameters
    let requestedPage: number | null = null;
    let requestedUrl: string | null = null;
    let requestedStoreId: string | null = null;
    try {
      const body = await req.json();
      if (body?.page) requestedPage = parseInt(body.page);
      if (body?.url) requestedUrl = body.url;
      if (body?.storeId) requestedStoreId = body.storeId;
    } catch { /* no body, use config */ }

    // Get config
    const { data: configs } = await supabase.from('import_config').select('*');
    const configMap: Record<string, string> = {};
    for (const c of configs || []) configMap[c.config_key] = c.config_value;

    // Use provided URL or fall back to config
    let url = requestedUrl || configMap['auto_import_url'];
    const enabled = requestedUrl ? true : configMap['auto_import_enabled'] === 'true';

    if (!enabled || !url) {
      return new Response(
        JSON.stringify({ success: true, message: 'Auto-import disabled or no URL configured', imported: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Add pagination to URL
    const page = requestedPage || 1;
    const separator = url.includes('?') ? '&' : '?';
    const paginatedUrl = page > 1 ? `${url}${separator}pagina=${page}` : url;

    console.log(`Auto-import: scraping page ${page} - ${paginatedUrl}`);

    // Scrape
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: paginatedUrl, formats: ['markdown'], onlyMainContent: true }),
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
    const parsedComplaints = parseComplaintsFromMarkdown(markdown);
    console.log(`Page ${page}: Parsed ${parsedComplaints.length} complaints`);

    if (parsedComplaints.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'No complaints found on this page', imported: 0, page, hasMore: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get existing titles to deduplicate
    const { data: existingReviews } = await supabase
      .from('reviews')
      .select('title');
    const existingTitles = new Set((existingReviews || []).map((r: any) => r.title.toLowerCase().trim()));

    // Get word replacements
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

    // Filter out duplicates and build new reviews - insert ONE BY ONE for real-time feedback
    const newComplaints = parsedComplaints.filter(c => {
      const cleanTitle = applyReplacements(cleanText(c.title), activeReplacements).toLowerCase().trim();
      return !existingTitles.has(cleanTitle);
    });

    console.log(`Page ${page}: ${newComplaints.length} new (${parsedComplaints.length - newComplaints.length} duplicates skipped)`);

    let importedCount = 0;
    for (const c of newComplaints) {
      const review: Record<string, any> = {
        title: applyReplacements(cleanText(c.title), activeReplacements),
        description: applyReplacements(cleanText(c.description || c.title), activeReplacements),
        full_text: applyReplacements(cleanText(c.description || c.title), activeReplacements),
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
        created_at: c.timeAgo ? parseTimeAgoToDate(c.timeAgo) : new Date().toISOString(),
      };
      if (requestedStoreId) review.store_id = requestedStoreId;

      const { error: insertError } = await supabase.from('reviews').insert(review);
      if (insertError) {
        console.error('Insert error for:', review.title, insertError.message);
      } else {
        importedCount++;
      }
    }

    console.log(`Page ${page}: successfully imported ${importedCount} reviews`);

    return new Response(
      JSON.stringify({
        success: true,
        imported: importedCount,
        duplicatesSkipped: parsedComplaints.length - newComplaints.length,
        page,
        hasMore: parsedComplaints.length >= 5,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Auto-import error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
