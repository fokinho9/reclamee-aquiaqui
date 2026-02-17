const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'FIRECRAWL_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { url } = await req.json();
    const targetUrl = url || 'https://www.reclameaqui.com.br/empresa/amazon/';

    console.log('Scraping:', targetUrl);

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: targetUrl,
        formats: ['rawHtml', 'markdown', 'links', 'screenshot'],
        onlyMainContent: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || `Status ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract image URLs from rawHtml
    const rawHtml = data?.data?.rawHtml || '';
    const imageUrls = new Set<string>();

    // img src
    const imgSrcRegex = /<img[^>]*?\bsrc\s*=\s*['"]([^'"]+)['"]/gi;
    let match;
    while ((match = imgSrcRegex.exec(rawHtml)) !== null) {
      const u = match[1].trim();
      if (u && !u.startsWith('data:') && !u.startsWith('javascript:')) {
        imageUrls.add(u.startsWith('http') ? u : new URL(u, targetUrl).href);
      }
    }

    // srcset
    const srcsetRegex = /\bsrcset\s*=\s*['"]([^'"]+)['"]/gi;
    while ((match = srcsetRegex.exec(rawHtml)) !== null) {
      for (const part of match[1].split(',')) {
        const u = part.trim().split(/\s+/)[0];
        if (u && !u.startsWith('data:')) {
          imageUrls.add(u.startsWith('http') ? u : new URL(u, targetUrl).href);
        }
      }
    }

    // url() in inline styles
    const urlRegex = /url\(\s*['"]?([^'"\)]+)['"]?\s*\)/gi;
    while ((match = urlRegex.exec(rawHtml)) !== null) {
      const u = match[1].trim();
      if (u && !u.startsWith('data:') && !u.startsWith('javascript:')) {
        imageUrls.add(u.startsWith('http') ? u : new URL(u, targetUrl).href);
      }
    }

    // Filter to image extensions
    const imageExts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico', '.avif'];
    const filteredImages = [...imageUrls].filter(u => {
      const path = new URL(u).pathname.toLowerCase();
      return imageExts.some(ext => path.endsWith(ext));
    }).sort();

    console.log(`Found ${filteredImages.length} images`);

    return new Response(
      JSON.stringify({
        success: true,
        images: filteredImages,
        imageCount: filteredImages.length,
        markdown: data?.data?.markdown || '',
        screenshot: data?.data?.screenshot || null,
        metadata: data?.data?.metadata || {},
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
