
-- Fix ALL RLS policies: change from RESTRICTIVE to PERMISSIVE

-- ============ store_content ============
DROP POLICY IF EXISTS "Admins can manage store content" ON public.store_content;
DROP POLICY IF EXISTS "Anyone can read store content" ON public.store_content;
DROP POLICY IF EXISTS "Store managers can manage own store content" ON public.store_content;

CREATE POLICY "Admins can manage store content" ON public.store_content FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read store content" ON public.store_content FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Store managers can manage own store content" ON public.store_content FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = store_content.store_id AND su.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = store_content.store_id AND su.user_id = auth.uid()));

-- ============ stores ============
DROP POLICY IF EXISTS "Admins can delete stores" ON public.stores;
DROP POLICY IF EXISTS "Admins can insert stores" ON public.stores;
DROP POLICY IF EXISTS "Admins can update stores" ON public.stores;
DROP POLICY IF EXISTS "Anyone can read stores" ON public.stores;

CREATE POLICY "Admins can manage stores" ON public.stores FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read stores" ON public.stores FOR SELECT TO anon, authenticated
  USING (true);

-- ============ reviews ============
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Store managers can manage own store reviews" ON public.reviews;

CREATE POLICY "Admins can manage reviews" ON public.reviews FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Store managers can manage own store reviews" ON public.reviews FOR ALL TO authenticated
  USING (store_id IS NOT NULL AND EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = reviews.store_id AND su.user_id = auth.uid()))
  WITH CHECK (store_id IS NOT NULL AND EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = reviews.store_id AND su.user_id = auth.uid()));

-- ============ coupons ============
DROP POLICY IF EXISTS "Admins can manage coupons" ON public.coupons;
DROP POLICY IF EXISTS "Anyone can read active coupons" ON public.coupons;
DROP POLICY IF EXISTS "Store managers can manage own store coupons" ON public.coupons;

CREATE POLICY "Admins can manage coupons" ON public.coupons FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read active coupons" ON public.coupons FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Store managers can manage own store coupons" ON public.coupons FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = coupons.store_id AND su.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = coupons.store_id AND su.user_id = auth.uid()));

-- ============ site_content ============
DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content;
DROP POLICY IF EXISTS "Anyone can read site content" ON public.site_content;

CREATE POLICY "Admins can manage site content" ON public.site_content FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT TO anon, authenticated
  USING (true);

-- ============ import_config ============
DROP POLICY IF EXISTS "Admins can manage import config" ON public.import_config;
DROP POLICY IF EXISTS "Anyone can read import config" ON public.import_config;

CREATE POLICY "Admins can manage import config" ON public.import_config FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read import config" ON public.import_config FOR SELECT TO anon, authenticated
  USING (true);

-- ============ word_replacements ============
DROP POLICY IF EXISTS "Admins can manage word replacements" ON public.word_replacements;
DROP POLICY IF EXISTS "Anyone can read word replacements" ON public.word_replacements;

CREATE POLICY "Admins can manage word replacements" ON public.word_replacements FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read word replacements" ON public.word_replacements FOR SELECT TO anon, authenticated
  USING (true);

-- ============ user_roles ============
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ============ store_users ============
DROP POLICY IF EXISTS "Admins can manage store_users" ON public.store_users;
DROP POLICY IF EXISTS "Users can view own store assignments" ON public.store_users;

CREATE POLICY "Admins can manage store_users" ON public.store_users FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view own store assignments" ON public.store_users FOR SELECT TO authenticated
  USING (user_id = auth.uid());
