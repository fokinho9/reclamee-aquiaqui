
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can manage stores" ON public.stores;
DROP POLICY IF EXISTS "Anyone can read active stores" ON public.stores;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Anyone can read active stores"
ON public.stores
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage stores"
ON public.stores
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
