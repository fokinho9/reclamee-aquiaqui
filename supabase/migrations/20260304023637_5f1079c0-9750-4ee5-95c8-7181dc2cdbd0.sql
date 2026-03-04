
CREATE TABLE public.store_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  content_key text NOT NULL,
  content_value text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (store_id, content_key)
);

ALTER TABLE public.store_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read store content"
  ON public.store_content FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage store content"
  ON public.store_content FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Store managers can manage own store content"
  ON public.store_content FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = store_content.store_id AND su.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM store_users su WHERE su.store_id = store_content.store_id AND su.user_id = auth.uid()));

CREATE TRIGGER update_store_content_updated_at
  BEFORE UPDATE ON public.store_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
