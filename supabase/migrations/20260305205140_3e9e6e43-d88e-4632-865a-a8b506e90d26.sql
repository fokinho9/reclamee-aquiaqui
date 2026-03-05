
-- Drop ALL existing policies and recreate as PERMISSIVE

-- word_replacements
DROP POLICY IF EXISTS "Admins can manage word replacements" ON public.word_replacements;
DROP POLICY IF EXISTS "Anyone can read word replacements" ON public.word_replacements;
CREATE POLICY "Public read word_replacements" ON public.word_replacements FOR SELECT USING (true);
CREATE POLICY "Admins manage word_replacements" ON public.word_replacements FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- store_content
DROP POLICY IF EXISTS "Admins can manage store content" ON public.store_content;
DROP POLICY IF EXISTS "Anyone can read store content" ON public.store_content;
DROP POLICY IF EXISTS "Store managers can manage own store content" ON public.store_content;
CREATE POLICY "Public read store_content" ON public.store_content FOR SELECT USING (true);
CREATE POLICY "Admins manage store_content" ON public.store_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Store managers manage own store_content" ON public.store_content FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = store_content.store_id AND su.user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = store_content.store_id AND su.user_id = auth.uid()));

-- stores
DROP POLICY IF EXISTS "Admins can manage stores" ON public.stores;
DROP POLICY IF EXISTS "Anyone can read stores" ON public.stores;
CREATE POLICY "Public read stores" ON public.stores FOR SELECT USING (true);
CREATE POLICY "Admins manage stores" ON public.stores FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- reviews
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Store managers can manage own store reviews" ON public.reviews;
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Admins manage reviews" ON public.reviews FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Store managers manage own store reviews" ON public.reviews FOR ALL TO authenticated USING (store_id IS NOT NULL AND EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = reviews.store_id AND su.user_id = auth.uid())) WITH CHECK (store_id IS NOT NULL AND EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = reviews.store_id AND su.user_id = auth.uid()));

-- coupons
DROP POLICY IF EXISTS "Admins can manage coupons" ON public.coupons;
DROP POLICY IF EXISTS "Anyone can read active coupons" ON public.coupons;
DROP POLICY IF EXISTS "Store managers can manage own store coupons" ON public.coupons;
CREATE POLICY "Public read coupons" ON public.coupons FOR SELECT USING (true);
CREATE POLICY "Admins manage coupons" ON public.coupons FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Store managers manage own store coupons" ON public.coupons FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = coupons.store_id AND su.user_id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = coupons.store_id AND su.user_id = auth.uid()));

-- site_content
DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content;
DROP POLICY IF EXISTS "Anyone can read site content" ON public.site_content;
CREATE POLICY "Public read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins manage site_content" ON public.site_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- import_config
DROP POLICY IF EXISTS "Admins can manage import config" ON public.import_config;
DROP POLICY IF EXISTS "Anyone can read import config" ON public.import_config;
CREATE POLICY "Public read import_config" ON public.import_config FOR SELECT USING (true);
CREATE POLICY "Admins manage import_config" ON public.import_config FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- user_roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- store_users
DROP POLICY IF EXISTS "Admins can manage store_users" ON public.store_users;
DROP POLICY IF EXISTS "Users can view own store assignments" ON public.store_users;
CREATE POLICY "Users read own store_users" ON public.store_users FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins manage store_users" ON public.store_users FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
