
-- Drop all existing RESTRICTIVE policies on stores
DROP POLICY IF EXISTS "Admins can delete stores" ON public.stores;
DROP POLICY IF EXISTS "Admins can insert stores" ON public.stores;
DROP POLICY IF EXISTS "Admins can update stores" ON public.stores;
DROP POLICY IF EXISTS "Anyone can read active stores" ON public.stores;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Anyone can read stores"
  ON public.stores FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert stores"
  ON public.stores FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update stores"
  ON public.stores FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete stores"
  ON public.stores FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
