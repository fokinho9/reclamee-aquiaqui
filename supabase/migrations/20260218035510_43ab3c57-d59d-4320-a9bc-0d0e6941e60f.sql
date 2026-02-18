INSERT INTO site_content (content_key, content_value, content_type, label, section, sort_order) VALUES
('contact_phone', '', 'text', 'Telefone', 'sidebar', 30),
('contact_email', '', 'text', 'E-mail', 'sidebar', 31),
('social_facebook', '', 'text', 'Facebook URL', 'sidebar', 32),
('social_instagram', '', 'text', 'Instagram URL', 'sidebar', 33),
('social_twitter', '', 'text', 'Twitter/X URL', 'sidebar', 34),
('company_brands', '', 'text', 'Marcas (separadas por vírgula)', 'sidebar', 40)
ON CONFLICT (content_key) DO NOTHING;