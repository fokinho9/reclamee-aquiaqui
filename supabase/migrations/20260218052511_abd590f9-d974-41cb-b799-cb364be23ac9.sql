SELECT cron.schedule(
  'auto-import-reviews-every-5min',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://rqzejkvwwxyzmzjnhcmm.supabase.co/functions/v1/auto-import-reviews',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxemVqa3Z3d3h5em16am5oY21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNTMwMjMsImV4cCI6MjA4NjkyOTAyM30.0CSRrOCZLbsBXmCYndUtYalE9TRRK1FccNltFv7HyrU"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);