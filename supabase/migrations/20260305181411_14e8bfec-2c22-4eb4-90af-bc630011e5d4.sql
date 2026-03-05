
-- Fix ALL RLS policies to be PERMISSIVE (they are all RESTRICTIVE which blocks writes)

-- store_content
DROP POLICY IF EXISTS "Admins can manage store content" ON public.store_content;
CREATE POLICY "Admins can manage store content" ON public.store_content FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can read store content" ON public.store_content;
CREATE POLICY "Anyone can read store content" ON public.store_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Store managers can manage own store content" ON public.store_content;
CREATE POLICY "Store managers can manage own store content" ON public.store_content FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = store_content.store_id AND su.user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = store_content.store_id AND su.user_id = auth.uid()));

-- stores
DROP POLICY IF EXISTS "Admins can delete stores" ON public.stores;
CREATE POLICY "Admins can delete stores" ON public.stores FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can insert stores" ON public.stores;
CREATE POLICY "Admins can insert stores" ON public.stores FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update stores" ON public.stores;
CREATE POLICY "Admins can update stores" ON public.stores FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can read stores" ON public.stores;
CREATE POLICY "Anyone can read stores" ON public.stores FOR SELECT USING (true);

-- reviews
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
CREATE POLICY "Admins can manage reviews" ON public.reviews FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Store managers can manage own store reviews" ON public.reviews;
CREATE POLICY "Store managers can manage own store reviews" ON public.reviews FOR ALL TO authenticated USING (store_id IS NOT NULL AND EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = reviews.store_id AND su.user_id = auth.uid())) WITH CHECK (store_id IS NOT NULL AND EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = reviews.store_id AND su.user_id = auth.uid()));

-- coupons
DROP POLICY IF EXISTS "Admins can manage coupons" ON public.coupons;
CREATE POLICY "Admins can manage coupons" ON public.coupons FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can read active coupons" ON public.coupons;
CREATE POLICY "Anyone can read active coupons" ON public.coupons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Store managers can manage own store coupons" ON public.coupons;
CREATE POLICY "Store managers can manage own store coupons" ON public.coupons FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = coupons.store_id AND su.user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = coupons.store_id AND su.user_id = auth.uid()));

-- site_content
DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content;
CREATE POLICY "Admins can manage site content" ON public.site_content FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can read site content" ON public.site_content;
CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT USING (true);

-- import_config
DROP POLICY IF EXISTS "Admins can manage import config" ON public.import_config;
CREATE POLICY "Admins can manage import config" ON public.import_config FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can read import config" ON public.import_config;
CREATE POLICY "Anyone can read import config" ON public.import_config FOR SELECT USING (true);

-- word_replacements
DROP POLICY IF EXISTS "Admins can manage word replacements" ON public.word_replacements;
CREATE POLICY "Admins can manage word replacements" ON public.word_replacements FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can read word replacements" ON public.word_replacements;
CREATE POLICY "Anyone can read word replacements" ON public.word_replacements FOR SELECT USING (true);

-- user_roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- store_users
DROP POLICY IF EXISTS "Admins can manage store_users" ON public.store_users;
CREATE POLICY "Admins can manage store_users" ON public.store_users FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Users can view own store assignments" ON public.store_users;
CREATE POLICY "Users can view own store assignments" ON public.store_users FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Pre-populate store_content for Câmeras Prime (47135a98-b66b-48e3-bd4d-dc04255a1e09)
INSERT INTO public.store_content (store_id, content_key, content_value) VALUES
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'company_logo', ''),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'company_banner', ''),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'company_banner_mobile', ''),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'banner_bg_color', '#1A2B3D'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'company_views', '+ 5.2 mil por dia'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'reputation_label', 'Ótimo'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'reputation_score', '8.5'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'reputation_description', 'O consumidor avaliou o atendimento dessa empresa como ÓTIMO. A nota média nos últimos 6 meses é <strong>8.5/10.</strong>'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'trust_description', 'Essa empresa é verificada e possui o selo de confiança do Reclame AQUI.'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'stat_reclamacoes', '342'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'stat_respondidas_pct', '92%'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'stat_aguardando', '28'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'stat_avaliadas', '180'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'stat_nota_media', '8.5'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'stat_voltariam_pct', '85%'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'stat_resolvidas_pct', '90%'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'stat_tempo_resposta', '1 dia e 8 horas'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'about_text', 'A Cameras Prime atua no mercado de equipamentos fotográficos oferecendo câmeras, lentes e acessórios das principais marcas. Trabalhamos com foco em qualidade, entrega segura e atendimento transparente ao cliente.'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'cnpj', '00.000.000/0001-00'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'company_registration_time', 'Cadastrada há 2 anos'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'company_brands', 'Canon, Nikon, Sony'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'company_name', 'Câmeras Prime'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'company_position', '45º'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'company_position_label', 'Melhor empresa'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'company_position_category', 'na lista de melhores em E-commerce'),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'youtube_url', ''),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'contact_phone', ''),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'contact_email', ''),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'social_facebook', ''),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'social_instagram', ''),
  ('47135a98-b66b-48e3-bd4d-dc04255a1e09', 'social_twitter', '')
ON CONFLICT DO NOTHING;
