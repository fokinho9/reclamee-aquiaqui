
-- Enum para roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Tabela de roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function para checar role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Policies para user_roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Tabela de conteúdo do site
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key TEXT NOT NULL UNIQUE,
  content_value TEXT NOT NULL DEFAULT '',
  content_type TEXT NOT NULL DEFAULT 'text' CHECK (content_type IN ('text', 'image', 'html')),
  label TEXT NOT NULL DEFAULT '',
  section TEXT NOT NULL DEFAULT 'geral',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Qualquer um pode ler o conteúdo (site público)
CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT
  TO anon, authenticated
  USING (true);

-- Apenas admins podem editar
CREATE POLICY "Admins can manage site content"
  ON public.site_content FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir conteúdo inicial do site
INSERT INTO public.site_content (content_key, content_value, content_type, label, section, sort_order) VALUES
  ('company_name', 'Amazon', 'text', 'Nome da empresa', 'hero', 1),
  ('company_logo', '/images/amazon-logo.jpg', 'image', 'Logo da empresa', 'hero', 2),
  ('company_banner', '/images/amazon-banner.jpg', 'image', 'Banner desktop', 'hero', 3),
  ('company_banner_mobile', '/images/amazon-banner-mobile.jpg', 'image', 'Banner mobile', 'hero', 4),
  ('company_category', 'Varejo - Marketplaces', 'text', 'Categoria', 'hero', 5),
  ('company_views', '+ 2.4 milhões de visualizações', 'text', 'Visualizações', 'hero', 6),
  ('reputation_label', 'ÓTIMO', 'text', 'Reputação', 'reputation', 1),
  ('reputation_score', '8.2', 'text', 'Nota média', 'reputation', 2),
  ('reputation_description', 'O consumidor avaliou o atendimento dessa empresa como ÓTIMO. A nota média nos últimos 6 meses é <strong>8.2/10.</strong>', 'html', 'Descrição reputação', 'reputation', 3),
  ('trust_description', 'Essa empresa é verificada e possui o selo de confiança do Reclame AQUI.', 'text', 'Descrição confiança', 'trust', 1),
  ('about_text', 'A Amazon.com.br oferece milhares de ofertas e produtos em diversas categorias, que incluem itens vendidos e entregues pela Amazon ou por vendedores parceiros.', 'text', 'Sobre a empresa', 'sidebar', 1),
  ('cnpj', '15.436.940/0001-03', 'text', 'CNPJ', 'sidebar', 2),
  ('website_url', 'https://www.amazon.com.br', 'text', 'URL do site', 'sidebar', 3),
  ('company_position', '12º', 'text', 'Posição no ranking', 'sidebar', 4),
  ('company_position_label', 'Melhor empresa', 'text', 'Label do ranking', 'sidebar', 5),
  ('company_position_category', 'na lista de melhores em Marketplaces', 'text', 'Categoria do ranking', 'sidebar', 6),
  ('stat_reclamacoes', '106194', 'text', 'Total reclamações', 'performance', 1),
  ('stat_respondidas_pct', '88.4%', 'text', '% respondidas', 'performance', 2),
  ('stat_aguardando', '10690', 'text', 'Aguardando resposta', 'performance', 3),
  ('stat_avaliadas', '46196', 'text', 'Reclamações avaliadas', 'performance', 4),
  ('stat_nota_media', '7.36', 'text', 'Nota média consumidores', 'performance', 5),
  ('stat_voltariam_pct', '80%', 'text', '% voltariam a negociar', 'performance', 6),
  ('stat_resolvidas_pct', '88%', 'text', '% resolvidas', 'performance', 7),
  ('stat_tempo_resposta', '19 dias e 13 horas', 'text', 'Tempo médio resposta', 'performance', 8),
  ('youtube_url', 'https://www.youtube.com/embed/MVaaQ8Qu7Iw', 'text', 'URL do vídeo YouTube', 'content', 1),
  ('banner_bg_color', '#EF6509', 'text', 'Cor de fundo do banner', 'hero', 7);

-- Storage bucket para uploads de imagens do admin
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

CREATE POLICY "Anyone can view site assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');

CREATE POLICY "Admins can upload site assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
