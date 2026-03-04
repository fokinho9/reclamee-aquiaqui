INSERT INTO store_content (store_id, content_key, content_value)
SELECT '47ba169f-021e-4fc9-a006-5be25523f95f', content_key, content_value
FROM site_content
WHERE content_value IS NOT NULL AND content_value != ''
ON CONFLICT (store_id, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;