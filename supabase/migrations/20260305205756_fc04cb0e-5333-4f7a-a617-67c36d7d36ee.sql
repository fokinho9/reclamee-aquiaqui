
-- Fix orphan reviews: assign Fujifilm reviews to Câmeras Prime store, and botas review to Agro Brasil
UPDATE public.reviews SET store_id = '47135a98-b66b-48e3-bd4d-dc04255a1e09' WHERE store_id IS NULL AND title NOT ILIKE '%bota%';
UPDATE public.reviews SET store_id = '47ba169f-021e-4fc9-a006-5be25523f95f' WHERE store_id IS NULL AND title ILIKE '%bota%';
