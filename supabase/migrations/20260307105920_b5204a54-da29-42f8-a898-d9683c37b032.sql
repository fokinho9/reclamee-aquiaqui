
INSERT INTO store_content (store_id, content_key, content_value) VALUES
-- Banner e Visual
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'company_logo', ''),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'company_banner', ''),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'company_banner_mobile', ''),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'banner_bg_color', '#1a1a2e'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'company_views', '45.832 visualizações'),

-- Reputação
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'reputation_description', '<p>A Elite Moto Parts possui reputação <strong>BOA</strong> no Reclame AQUI. Nos últimos 12 meses, a empresa recebeu 1.247 reclamações e respondeu 89,4% delas. Dos consumidores que reclamaram, 62,1% voltariam a fazer negócio com a empresa.</p>'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'trust_description', 'A Elite Moto Parts demonstra comprometimento com seus clientes ao responder a maioria das reclamações e manter um índice de solução acima de 70%. A empresa está cadastrada no Reclame AQUI há mais de 10 anos.'),

-- Estatísticas (chaves corretas do painel)
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_respondidas_pct', '89.4%'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_aguardando', '132'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_avaliadas', '847'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_nota_media', '5.8'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_voltariam_pct', '62.1%'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_resolvidas_pct', '71.8%'),

-- Sidebar / Sobre
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'company_registration_time', 'Cadastrada há 12 anos'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'company_brands', 'Honda, Yamaha, Showa, NGK, Pirelli, Lander'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'company_name', 'Elite Moto Parts'),

-- Posição / Ranking
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'company_position', '47º'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'company_position_label', 'no ranking de Autopeças'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'company_position_category', 'Autopeças e Acessórios'),

-- Mídia
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'youtube_url', ''),

-- Contato e Redes Sociais
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'contact_phone', '(11) 4002-8922'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'contact_email', 'contato@elitemotoparts.com.br'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'social_twitter', 'https://twitter.com/elitemotoparts')

ON CONFLICT (store_id, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;
