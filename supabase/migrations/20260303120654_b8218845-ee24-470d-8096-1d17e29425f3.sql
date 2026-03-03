INSERT INTO public.stores (name, sort_order, is_active, description, category)
VALUES ('Agro Shop', 2, true, 'Loja de produtos agropecuários', 'Agro')
ON CONFLICT DO NOTHING;