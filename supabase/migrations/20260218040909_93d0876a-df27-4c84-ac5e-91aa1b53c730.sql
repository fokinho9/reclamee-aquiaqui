
-- Tabela para substituição de palavras nas reclamações importadas
CREATE TABLE public.word_replacements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  original_word TEXT NOT NULL,
  replacement_word TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.word_replacements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read word replacements"
  ON public.word_replacements FOR SELECT USING (true);

CREATE POLICY "Admins can manage word replacements"
  ON public.word_replacements FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
