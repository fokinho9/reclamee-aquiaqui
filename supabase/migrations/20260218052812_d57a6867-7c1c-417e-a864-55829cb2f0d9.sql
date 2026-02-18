-- Clean zero-width non-joiner and artifacts from descriptions
UPDATE public.reviews 
SET 
  description = regexp_replace(
    regexp_replace(
      regexp_replace(
        regexp_replace(description, E'\u200C', '', 'g'),
        E'‌', '', 'g'
      ),
      E'\\s+s\\s*$', '', 'g'
    ),
    E'\\s*\\[.*$', '', 'g'
  ),
  title = regexp_replace(
    regexp_replace(title, E'\u200C', '', 'g'),
    E'‌', '', 'g'
  ),
  full_text = regexp_replace(
    regexp_replace(
      regexp_replace(
        regexp_replace(full_text, E'\u200C', '', 'g'),
        E'‌', '', 'g'
      ),
      E'\\s+s\\s*$', '', 'g'
    ),
    E'\\s*\\[.*$', '', 'g'
  );