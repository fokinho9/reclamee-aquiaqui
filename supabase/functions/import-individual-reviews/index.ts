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

async function scrapeUrl(apiKey: string, url: string): Promise<string> {
  const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `Erro ${response.status}`);
  return data?.data?.markdown || data?.markdown || '';
}

// Extract individual complaint URLs from a listing page markdown
function extractComplaintUrls(markdown: string, baseUrl: string): string[] {
  const urls: string[] = [];
  // Match links to individual complaints on reclameaqui
  const linkRegex = /\(https:\/\/www\.reclameaqui\.com\.br\/([^/]+)\/([^/)]+_[A-Za-z0-9]+)\/?[^)]*\)/g;
  let match;
  const seen = new Set<string>();

  while ((match = linkRegex.exec(markdown)) !== null) {
    const fullUrl = `https://www.reclameaqui.com.br/${match[1]}/${match[2]}/`;
    if (!seen.has(fullUrl)) {
      seen.add(fullUrl);
      urls.push(fullUrl);
    }
  }

  return urls;
}

// Parse a single complaint page markdown for full details
function parseComplaintPage(markdown: string): {
  title: string;
  description: string;
  responseText: string | null;
  responseDate: string | null;
  finalConsideration: string | null;
  status: string;
  rating: number | null;
  city: string;
  date: string;
  dealAgain: string | null;
} {
  const lines = markdown.split('\n');

  // Title: usually the main heading (# or ## with complaint text)
  let title = '';
  for (const line of lines) {
    const titleMatch = line.match(/^#+\s+(.{20,})/);
    if (titleMatch && !title) {
      const t = titleMatch[1].trim();
      if (!t.includes('Resposta da empresa') && !t.includes('Consideração final') && !t.includes('Veja também')) {
        title = t;
      }
    }
  }

  // Description: look for the main complaint text block
  let description = '';
  const descStart = markdown.indexOf(title);
  if (descStart > -1) {
    const afterTitle = markdown.substring(descStart + title.length);
    // Find the block between title and "Resposta da empresa" or "reação"
    const endMarkers = ['Resposta da empresa', 'Compartilhe', 'reação', 'reações'];
    let endIdx = afterTitle.length;
    for (const marker of endMarkers) {
      const idx = afterTitle.indexOf(marker);
      if (idx > 0 && idx < endIdx) endIdx = idx;
    }
    description = afterTitle.substring(0, endIdx)
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\*\*/g, '')
      .replace(/#+/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Response from company
  let responseText: string | null = null;
  let responseDate: string | null = null;
  const respIdx = markdown.indexOf('Resposta da empresa');
  if (respIdx > -1) {
    const afterResp = markdown.substring(respIdx);
    // Date
    const dateMatch = afterResp.match(/(\d{2}\/\d{2}\/\d{4}\s+às\s+\d{2}:\d{2})/);
    if (dateMatch) responseDate = dateMatch[1];

    // Text between date and next section
    const endMarkers = ['Consideração final', 'Compartilhe', '---', 'RA Ads'];
    let respText = afterResp.substring(afterResp.indexOf('\n') + 1);
    let endIdx = respText.length;
    for (const marker of endMarkers) {
      const idx = respText.indexOf(marker);
      if (idx > 0 && idx < endIdx) endIdx = idx;
    }
    responseText = respText.substring(0, endIdx)
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\*\*/g, '')
      .replace(/#+/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\d{2}\/\d{2}\/\d{4}\s+às\s+\d{2}:\d{2}/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (responseText && responseText.length < 5) responseText = null;
  }

  // Final consideration
  let finalConsideration: string | null = null;
  const considIdx = markdown.indexOf('Consideração final');
  if (considIdx > -1) {
    const afterConsid = markdown.substring(considIdx);
    const endMarkers = ['O problema foi resolvido', 'Voltaria a fazer', 'Nota do atendimento', 'RA Ads', '---'];
    let considText = afterConsid.substring(afterConsid.indexOf('\n') + 1);
    let endIdx = considText.length;
    for (const marker of endMarkers) {
      const idx = considText.indexOf(marker);
      if (idx > 0 && idx < endIdx) endIdx = idx;
    }
    finalConsideration = considText.substring(0, endIdx)
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\*\*/g, '')
      .replace(/#+/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\d{2}\/\d{2}\/\d{4}\s+às\s+\d{2}:\d{2}/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (finalConsideration && finalConsideration.length < 5) finalConsideration = null;
  }

  // Status: Resolvido, Não resolvido, Respondida, etc.
  let status = 'nao_respondida';
  if (/Resolvido/i.test(markdown) && !/Não\s+Resolvido/i.test(markdown)) status = 'avaliada';
  else if (/Não\s+Resolvido/i.test(markdown)) status = 'avaliada';
  else if (responseText) status = 'respondida';

  // Rating (Nota do atendimento)
  let rating: number | null = null;
  const ratingMatch = markdown.match(/Nota do atendimento[^\d]*(\d{1,2})/);
  if (ratingMatch) rating = parseInt(ratingMatch[1]);

  // Deal again
  let dealAgain: string | null = null;
  const dealMatch = markdown.match(/Voltaria a fazer negócio[^\n]*\n*[^\w]*(Sim|Não)/i);
  if (dealMatch) dealAgain = dealMatch[1];

  // City
  let city = '';
  const cityMatch = markdown.match(/([A-ZÀ-Ú][a-zà-ú]+(?:\s+[A-ZÀ-Ú][a-zà-ú]+)*)\s*[-–]\s*([A-Z]{2})/);
  if (cityMatch) city = `${cityMatch[1]} - ${cityMatch[2]}`;

  // Date
  let date = '';
  const mainDateMatch = markdown.match(/(\d{2}\/\d{2}\/\d{4})\s+às\s+(\d{2}:\d{2})/);
  if (mainDateMatch) {
    const [, d, t] = mainDateMatch;
    const [day, month, year] = d.split('/');
    date = new Date(`${year}-${month}-${day}T${t}:00`).toISOString();
  }

  return {
    title: cleanText(title.substring(0, 200)),
    description: cleanText(description.substring(0, 1000)),
    responseText: responseText ? cleanText(responseText.substring(0, 1000)) : null,
    responseDate,
    finalConsideration: finalConsideration ? cleanText(finalConsideration.substring(0, 500)) : null,
    status,
    rating,
    city,
    date: date || new Date().toISOString(),
    dealAgain,
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
        JSON.stringify({ success: false, error: 'FIRECRAWL_API_KEY não configurada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { mode, url, complaintUrl } = body;

    // Get word replacements
    const { data: replacements } = await supabase
      .from('word_replacements')
      .select('original_word, replacement_word')
      .eq('is_active', true);
    const activeReplacements = replacements || [];

    // MODE 1: Extract URLs from listing page
    if (mode === 'extract_urls') {
      if (!url) {
        return new Response(
          JSON.stringify({ success: false, error: 'URL é obrigatória' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`Extracting complaint URLs from: ${url}`);
      const markdown = await scrapeUrl(apiKey, url);
      const urls = extractComplaintUrls(markdown, url);
      console.log(`Found ${urls.length} complaint URLs`);

      return new Response(
        JSON.stringify({ success: true, urls, total: urls.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // MODE 2: Scrape single complaint page and save
    if (mode === 'import_single') {
      if (!complaintUrl) {
        return new Response(
          JSON.stringify({ success: false, error: 'complaintUrl é obrigatória' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`Scraping individual complaint: ${complaintUrl}`);
      const markdown = await scrapeUrl(apiKey, complaintUrl);
      const parsed = parseComplaintPage(markdown);

      if (!parsed.title || parsed.title.length < 10) {
        console.log('Could not parse complaint, title too short:', parsed.title);
        return new Response(
          JSON.stringify({ success: true, imported: false, reason: 'Título não encontrado ou muito curto' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check for duplicates
      const cleanTitle = applyReplacements(parsed.title, activeReplacements).toLowerCase().trim();
      const { data: existing } = await supabase
        .from('reviews')
        .select('id')
        .ilike('title', cleanTitle)
        .limit(1);

      if (existing && existing.length > 0) {
        console.log('Duplicate found, skipping:', parsed.title);
        return new Response(
          JSON.stringify({ success: true, imported: false, reason: 'Duplicada', title: parsed.title }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Build full text including response and consideration
      let fullText = applyReplacements(parsed.description, activeReplacements);
      if (parsed.responseText) {
        fullText += `\n\n--- Resposta da empresa ---\n${applyReplacements(parsed.responseText, activeReplacements)}`;
      }
      if (parsed.finalConsideration) {
        fullText += `\n\n--- Consideração final do consumidor ---\n${applyReplacements(parsed.finalConsideration, activeReplacements)}`;
      }

      const firstNames = [
        "Ana", "Carlos", "Maria", "João", "Juliana", "Pedro", "Fernanda", "Lucas",
        "Camila", "Rafael", "Beatriz", "Thiago", "Larissa", "Gustavo", "Patricia",
      ];
      const lastInitials = "A B C D F G L M N O P R S T V".split(" ");

      const review = {
        title: applyReplacements(parsed.title, activeReplacements),
        description: applyReplacements(parsed.description.substring(0, 300), activeReplacements),
        full_text: fullText,
        author_name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastInitials[Math.floor(Math.random() * lastInitials.length)]}.`,
        author_city: parsed.city || 'São Paulo - SP',
        status: parsed.status,
        category: '',
        product: '',
        rating: parsed.rating,
        reactions_up: Math.floor(Math.random() * 50) + 1,
        reactions_down: Math.floor(Math.random() * 8),
        response_text: parsed.responseText ? applyReplacements(parsed.responseText, activeReplacements) : null,
        response_time: parsed.responseDate || null,
        is_ai_generated: false,
        created_at: parsed.date,
      };

      const { data: inserted, error: insertError } = await supabase.from('reviews').insert(review).select('id, title').single();
      if (insertError) {
        console.error('Insert error:', insertError.message);
        return new Response(
          JSON.stringify({ success: false, error: insertError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`Imported: ${review.title}`);
      return new Response(
        JSON.stringify({ success: true, imported: true, review: inserted }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Mode inválido. Use "extract_urls" ou "import_single".' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
