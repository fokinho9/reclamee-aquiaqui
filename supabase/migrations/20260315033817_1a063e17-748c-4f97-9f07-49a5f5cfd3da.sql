-- Delete garbage review with markdown artifacts in description
DELETE FROM reviews WHERE id = 'c55c470b-d109-45d2-b111-6d8edb730b11';

-- Update 10 respondida reviews to avaliada with ratings and response_text
UPDATE reviews SET 
  status = 'avaliada', 
  rating = 8,
  response_text = 'Prezado(a), agradecemos o contato. Verificamos sua solicitação e já providenciamos a resolução. Pedimos desculpas pelo transtorno.'
WHERE id = '951adbcb-2ad6-47a8-ac5d-1e868d66cdf1';

UPDATE reviews SET 
  status = 'avaliada', 
  rating = 6,
  response_text = 'Olá! Lamentamos o ocorrido. Já estamos atuando internamente para resolver a situação o mais rápido possível.'
WHERE id = '903a75b5-0f84-41c1-92a0-5f52e9847753';

UPDATE reviews SET 
  status = 'avaliada', 
  rating = 9,
  response_text = 'Prezado(a) cliente, sua reclamação foi tratada com prioridade. O reenvio já foi solicitado e será entregue em até 3 dias úteis.'
WHERE id = '3b4ebb37-2843-4e16-94e6-1ff57c25fb6e';

UPDATE reviews SET 
  status = 'avaliada', 
  rating = 7,
  response_text = 'Olá! Identificamos o problema e já tomamos as providências. Agradecemos pela paciência.'
WHERE id = '10c7f893-e67e-4689-9e86-42af4ea4e968';

UPDATE reviews SET 
  status = 'avaliada', 
  rating = 5,
  response_text = 'Prezado(a), lamentamos o inconveniente. Encaminhamos seu caso ao setor responsável para análise imediata.'
WHERE id = '0a348fa6-e049-417a-bbe1-d3092d70ce9b';

UPDATE reviews SET 
  status = 'avaliada', 
  rating = 10,
  response_text = 'Olá! Pedimos sinceras desculpas. O produto foi reenviado e a entrega está prevista para os próximos dias.'
WHERE id = 'd0a682e6-eebd-4767-8ae7-bdb6596f50d4';

UPDATE reviews SET 
  status = 'avaliada', 
  rating = 4,
  response_text = 'Prezado(a), verificamos internamente e já providenciamos a solução. Nosso compromisso é garantir sua satisfação.'
WHERE id = '53f60de4-9ed7-48f6-9cdf-ea173f684662';

UPDATE reviews SET 
  status = 'avaliada', 
  rating = 8,
  response_text = 'Olá! Agradecemos o feedback. Nosso time já está atuando para que isso não se repita. A entrega foi reprogramada.'
WHERE id = '4f6cc78b-4a94-471b-b487-75d2a66afb9e';

UPDATE reviews SET 
  status = 'avaliada', 
  rating = 7,
  response_text = 'Prezado(a) cliente, recebemos sua reclamação e lamentamos o ocorrido. Já entramos em contato com a transportadora.'
WHERE id = '06d70102-07cf-42f8-80f2-65c6c88e960b';

UPDATE reviews SET 
  status = 'avaliada', 
  rating = 6,
  response_text = 'Olá! Sentimos muito pelo transtorno. Nosso setor de logística já está cuidando do seu caso com urgência.'
WHERE id = 'c81f4de9-8962-40a4-93d0-b0616a46864a';