
-- Create Agro Brasil store
INSERT INTO public.stores (name, description, category, logo_url, website_url, sort_order)
VALUES (
  'Agro Brasil',
  'A Agro Brasil oferece milhares de ofertas e produtos em diversas categorias, que incluem itens vendidos e entregues pela Agro Brasil ou por vendedores parceiros.',
  'Varejo - Marketplaces',
  'https://rqzejkvwwxyzmzjnhcmm.supabase.co/storage/v1/object/public/site-assets/uploads/1771450732688.png',
  'https://www.agro-brasil.site',
  0
);

-- Associate all orphan reviews (store_id IS NULL) to the new Agro Brasil store
UPDATE public.reviews
SET store_id = (SELECT id FROM public.stores WHERE name = 'Agro Brasil' ORDER BY created_at DESC LIMIT 1)
WHERE store_id IS NULL;
