-- Create reviews table for AI-generated and manual reviews
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  full_text text NOT NULL DEFAULT '',
  author_name text NOT NULL,
  author_city text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'nao_respondida',
  category text NOT NULL DEFAULT '',
  product text NOT NULL DEFAULT '',
  rating integer,
  reactions_up integer NOT NULL DEFAULT 0,
  reactions_down integer NOT NULL DEFAULT 0,
  response_text text,
  response_time text,
  is_ai_generated boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews (public page)
CREATE POLICY "Anyone can read reviews"
ON public.reviews FOR SELECT
USING (true);

-- Only admins can manage reviews
CREATE POLICY "Admins can manage reviews"
ON public.reviews FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();