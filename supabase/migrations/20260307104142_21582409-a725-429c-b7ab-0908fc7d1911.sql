
-- Update store data
UPDATE stores SET 
  description = 'A Elite Moto Parts é referência nacional em peças e acessórios para motocicletas, oferecendo produtos originais e de alta qualidade com entrega rápida para todo o Brasil.',
  website_url = 'https://www.elitemotoparts.com.br',
  category = 'Autopeças e Acessórios'
WHERE id = '94b7466e-8bd7-4a5b-a008-f7802019a3a1';

-- Insert store content
INSERT INTO store_content (store_id, content_key, content_value) VALUES
-- Dados da Loja
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'store_name', 'Elite Moto Parts'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'store_description', 'A Elite Moto Parts é referência nacional em peças e acessórios para motocicletas, oferecendo produtos originais e de alta qualidade com entrega rápida para todo o Brasil.'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'store_category', 'Autopeças e Acessórios'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'store_website', 'https://www.elitemotoparts.com.br'),

-- Banner
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'banner_title', 'Elite Moto Parts'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'banner_subtitle', 'Peças e acessórios para motos com qualidade e confiança'),

-- Reputação
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'reputation_label', 'BOM'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'reputation_score', '7.2'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'reputation_icon', '/images/icons/rep-bom.png'),

-- Estatísticas
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_reclamacoes', '1.247'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_respondidas', '89.4%'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_voltariam', '62.1%'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_indice_solucao', '71.8%'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_nota_consumidor', '5.8'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'stat_tempo_resposta', '3 dias 14 horas'),

-- Sidebar / CNPJ
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'cnpj', '28.451.632/0001-89'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'razao_social', 'Elite Moto Parts Comércio de Peças Ltda'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'sede', 'São Paulo - SP'),

-- Redes Sociais
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'social_instagram', 'https://instagram.com/elitemotoparts'),
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'social_facebook', 'https://facebook.com/elitemotoparts'),

-- Sobre
('94b7466e-8bd7-4a5b-a008-f7802019a3a1', 'about_text', 'Fundada em 2012, a Elite Moto Parts nasceu da paixão por motocicletas e da necessidade de oferecer peças de qualidade a preços justos. Com mais de 10 anos de atuação no mercado, a empresa se consolidou como uma das maiores lojas online de autopeças para motos do Brasil, atendendo desde motociclistas amadores até oficinas mecânicas especializadas. Nosso catálogo conta com mais de 15.000 produtos de marcas reconhecidas como Honda, Yamaha, Showa, NGK e Pirelli.')
ON CONFLICT (store_id, content_key) DO UPDATE SET content_value = EXCLUDED.content_value;
