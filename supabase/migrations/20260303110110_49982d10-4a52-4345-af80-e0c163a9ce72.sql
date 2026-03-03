
-- 1. Add store_id to reviews (nullable to keep existing reviews working)
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS store_id uuid REFERENCES public.stores(id) ON DELETE SET NULL;

-- 2. Create store_users table (links users to stores they manage)
CREATE TABLE public.store_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'manager',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(store_id, user_id)
);

ALTER TABLE public.store_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage store_users"
  ON public.store_users FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own store assignments"
  ON public.store_users FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- 3. Create coupons table
CREATE TABLE public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  code text NOT NULL,
  description text NOT NULL DEFAULT '',
  discount_type text NOT NULL DEFAULT 'percentage',
  discount_value numeric NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active coupons"
  ON public.coupons FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage coupons"
  ON public.coupons FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Store managers can manage own store coupons"
  ON public.coupons FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.store_users su WHERE su.store_id = coupons.store_id AND su.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.store_users su WHERE su.store_id = coupons.store_id AND su.user_id = auth.uid()));

-- Also fix remaining RESTRICTIVE policies on other tables
-- reviews
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Admins can manage reviews" ON public.reviews FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- site_content
DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content;
DROP POLICY IF EXISTS "Anyone can read site content" ON public.site_content;
CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can manage site content" ON public.site_content FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- import_config
DROP POLICY IF EXISTS "Admins can manage import config" ON public.import_config;
DROP POLICY IF EXISTS "Anyone can read import config" ON public.import_config;
CREATE POLICY "Anyone can read import config" ON public.import_config FOR SELECT USING (true);
CREATE POLICY "Admins can manage import config" ON public.import_config FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- word_replacements
DROP POLICY IF EXISTS "Admins can manage word replacements" ON public.word_replacements;
DROP POLICY IF EXISTS "Anyone can read word replacements" ON public.word_replacements;
CREATE POLICY "Anyone can read word replacements" ON public.word_replacements FOR SELECT USING (true);
CREATE POLICY "Admins can manage word replacements" ON public.word_replacements FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix stores policies (still RESTRICTIVE from previous migration)
DROP POLICY IF EXISTS "Admins can delete stores" ON public.stores;
DROP POLICY IF EXISTS "Admins can insert stores" ON public.stores;
DROP POLICY IF EXISTS "Admins can update stores" ON public.stores;
DROP POLICY IF EXISTS "Anyone can read stores" ON public.stores;
CREATE POLICY "Anyone can read stores" ON public.stores FOR SELECT USING (true);
CREATE POLICY "Admins can insert stores" ON public.stores FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update stores" ON public.stores FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete stores" ON public.stores FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Store managers can manage reviews for their store
CREATE POLICY "Store managers can manage own store reviews"
  ON public.reviews FOR ALL TO authenticated
  USING (store_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.store_users su WHERE su.store_id = reviews.store_id AND su.user_id = auth.uid()))
  WITH CHECK (store_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.store_users su WHERE su.store_id = reviews.store_id AND su.user_id = auth.uid()));
