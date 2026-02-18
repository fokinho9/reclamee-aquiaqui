-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Add a table to store the auto-import URL configuration
CREATE TABLE IF NOT EXISTS public.import_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key text NOT NULL UNIQUE,
  config_value text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.import_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage import config"
  ON public.import_config FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can read import config"
  ON public.import_config FOR SELECT
  USING (true);

-- Insert default config
INSERT INTO public.import_config (config_key, config_value) VALUES 
  ('auto_import_url', 'https://www.reclameaqui.com.br/empresa/7m-boots/lista-reclamacoes/'),
  ('auto_import_enabled', 'true')
ON CONFLICT (config_key) DO NOTHING;