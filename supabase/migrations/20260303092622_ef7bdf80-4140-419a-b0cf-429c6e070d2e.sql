
INSERT INTO public.stores (name, category, website_url, description, is_active, sort_order)
VALUES (
  'Câmeras Prime',
  'E-commerce',
  'https://camerasprime.vercel.app',
  'A Cameras Prime atua no mercado de equipamentos fotográficos oferecendo câmeras, lentes e acessórios das principais marcas. Trabalhamos com foco em qualidade, entrega segura e atendimento transparente ao cliente. Nosso compromisso é garantir uma experiência de compra confiável e suporte eficiente no pós-venda.',
  true,
  2
);

-- Also fix RLS policies to be truly PERMISSIVE so admin UI works
DROP POLICY IF EXISTS "Admins can manage stores" ON public.stores;
DROP POLICY IF EXISTS "Anyone can read active stores" ON public.stores;

CREATE POLICY "Anyone can read active stores"
ON public.stores
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert stores"
ON public.stores
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update stores"
ON public.stores
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete stores"
ON public.stores
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
