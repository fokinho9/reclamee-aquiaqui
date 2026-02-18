import "https://esm.sh/@supabase/supabase-js@2";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function cleanText(text: string): string {
  return text
    .replace(/\u200C/g, '') // remove zero-width non-joiner
    .replace(/\s+s\b/g, '') // remove trailing " s" artifacts
    .replace(/‌/g, '') // remove hidden chars
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
      !title.toLowerCase().includes('saiba mais')
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
    if (/respondida/i.test(afterText) && !/não respondida/i.test(afterText)) status = 'respondida';
    if (/não respondida/i.test(afterText)) status = 'nao_respondida';
    if (/avaliada/i.test(afterText)) status = 'avaliada';

    let timeAgo = '';
    const timeMatch = afterText.match(/Há\s+\d+\s+(?:hora|horas|minuto|minutos|dia|dias)/i);
    if (timeMatch) timeAgo = timeMatch[0];

    description = description.substring(0, 300).replace(/\s+/g, ' ').trim();
    description = description.replace(/(?:Não\s+)?respondida/gi, '').replace(/avaliada/gi, '').replace(/Há\s+\d+\s+(?:hora|horas|minuto|minutos|dia|dias)/gi, '').trim();

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

    // Get config
    const { data: configs } = await supabase.from('import_config').select('*');
    const configMap: Record<string, string> = {};
    for (const c of configs || []) configMap[c.config_key] = c.config_value;

    const enabled = configMap['auto_import_enabled'] === 'true';
    const url = configMap['auto_import_url'];

    if (!enabled || !url) {
      return new Response(
        JSON.stringify({ success: true, message: 'Auto-import disabled or no URL configured', imported: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Auto-import: scraping', url);

    // Scrape
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
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
    console.log('Parsed complaints:', parsedComplaints.length);

    if (parsedComplaints.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'No complaints found', imported: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get existing titles to deduplicate
    const { data: existingReviews } = await supabase
      .from('reviews')
      .select('title');
    const existingTitles = new Set((existingReviews || []).map(r => r.title.toLowerCase().trim()));

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

    // Filter out duplicates and build new reviews
    const newReviews = parsedComplaints
      .filter(c => {
        const cleanTitle = applyReplacements(cleanText(c.title), activeReplacements).toLowerCase().trim();
        return !existingTitles.has(cleanTitle);
      })
      .map(c => ({
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
      }));

    console.log(`Auto-import: ${newReviews.length} new (${parsedComplaints.length - newReviews.length} duplicates skipped)`);

    if (newReviews.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'All complaints already imported', imported: 0, duplicatesSkipped: parsedComplaints.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: inserted, error: insertError } = await supabase
      .from('reviews')
      .insert(newReviews)
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(
        JSON.stringify({ success: false, error: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Auto-import: successfully imported ${inserted?.length || 0} reviews`);

    return new Response(
      JSON.stringify({
        success: true,
        imported: inserted?.length || 0,
        duplicatesSkipped: parsedComplaints.length - newReviews.length,
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
