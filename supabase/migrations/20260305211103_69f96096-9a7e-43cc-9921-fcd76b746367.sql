
-- Update 40 respondidas to avaliadas with company responses and consumer final considerations
-- Using deterministic variety based on id hash

WITH review_ids AS (
  SELECT id, title, 
    ROW_NUMBER() OVER (ORDER BY created_at DESC) as rn
  FROM reviews 
  WHERE store_id = '47135a98-b66b-48e3-bd4d-dc04255a1e09' 
    AND status = 'respondida'
  ORDER BY created_at DESC
  LIMIT 40
)
UPDATE reviews r SET
  status = 'avaliada',
  rating = CASE 
    WHEN ri.rn % 10 = 0 THEN 10
    WHEN ri.rn % 10 = 1 THEN 8
    WHEN ri.rn % 10 = 2 THEN 9
    WHEN ri.rn % 10 = 3 THEN 7
    WHEN ri.rn % 10 = 4 THEN 6
    WHEN ri.rn % 10 = 5 THEN 10
    WHEN ri.rn % 10 = 6 THEN 5
    WHEN ri.rn % 10 = 7 THEN 8
    WHEN ri.rn % 10 = 8 THEN 3
    ELSE 7
  END,
  response_text = CASE
    WHEN ri.rn % 8 = 0 THEN 'Olá! Agradecemos o seu contato. Verificamos a sua solicitação e já encaminhamos para o setor responsável. Pedimos desculpas pelo transtorno e estamos trabalhando para resolver o mais breve possível. Qualquer dúvida, estamos à disposição pelo nosso canal de atendimento.'
    WHEN ri.rn % 8 = 1 THEN 'Prezado(a) cliente, sentimos muito pela experiência relatada. Nosso time técnico já está analisando o seu caso e entraremos em contato diretamente para oferecer a melhor solução. Agradecemos a paciência e compreensão.'
    WHEN ri.rn % 8 = 2 THEN 'Olá! Lamentamos o ocorrido. Identificamos a sua solicitação em nosso sistema e a equipe de pós-venda já está providenciando o atendimento necessário. Entraremos em contato em breve com uma solução definitiva.'
    WHEN ri.rn % 8 = 3 THEN 'Olá! Pedimos sinceras desculpas pelo inconveniente. Verificamos internamente e já tomamos as providências necessárias para resolver a situação. Nossa equipe entrará em contato para confirmar a resolução.'
    WHEN ri.rn % 8 = 4 THEN 'Prezado(a), agradecemos por nos informar sobre o problema. Já localizamos seu pedido e estamos providenciando a solução adequada. Nosso compromisso é garantir sua satisfação. Em breve teremos um retorno.'
    WHEN ri.rn % 8 = 5 THEN 'Olá! Sentimos muito pelo transtorno causado. Nosso setor de qualidade já foi acionado e estamos empenhados em resolver sua solicitação com a máxima urgência. Agradecemos pela compreensão.'
    WHEN ri.rn % 8 = 6 THEN 'Prezado(a) cliente, recebemos sua reclamação e já iniciamos o processo de análise. Pedimos desculpas pela situação e garantimos que estamos fazendo o possível para atendê-lo(a) da melhor forma.'
    ELSE 'Olá! Agradecemos o feedback. Verificamos o ocorrido e nossa equipe já está atuando para garantir que tudo seja resolvido satisfatoriamente. Qualquer necessidade adicional, conte conosco.'
  END,
  response_time = CASE
    WHEN ri.rn % 5 = 0 THEN 'Respondido em 2 horas'
    WHEN ri.rn % 5 = 1 THEN 'Respondido em 4 horas'
    WHEN ri.rn % 5 = 2 THEN 'Respondido em 1 dia'
    WHEN ri.rn % 5 = 3 THEN 'Respondido em 6 horas'
    ELSE 'Respondido em 3 horas'
  END,
  full_text = r.full_text || E'\n\n--- Resposta da empresa ---\n' ||
    CASE
      WHEN ri.rn % 8 = 0 THEN 'Olá! Agradecemos o seu contato. Verificamos a sua solicitação e já encaminhamos para o setor responsável. Pedimos desculpas pelo transtorno e estamos trabalhando para resolver o mais breve possível.'
      WHEN ri.rn % 8 = 1 THEN 'Prezado(a) cliente, sentimos muito pela experiência relatada. Nosso time técnico já está analisando o seu caso e entraremos em contato diretamente para oferecer a melhor solução.'
      WHEN ri.rn % 8 = 2 THEN 'Olá! Lamentamos o ocorrido. Identificamos a sua solicitação em nosso sistema e a equipe de pós-venda já está providenciando o atendimento necessário.'
      WHEN ri.rn % 8 = 3 THEN 'Olá! Pedimos sinceras desculpas pelo inconveniente. Verificamos internamente e já tomamos as providências necessárias para resolver a situação.'
      WHEN ri.rn % 8 = 4 THEN 'Prezado(a), agradecemos por nos informar sobre o problema. Já localizamos seu pedido e estamos providenciando a solução adequada.'
      WHEN ri.rn % 8 = 5 THEN 'Olá! Sentimos muito pelo transtorno causado. Nosso setor de qualidade já foi acionado e estamos empenhados em resolver sua solicitação com a máxima urgência.'
      WHEN ri.rn % 8 = 6 THEN 'Prezado(a) cliente, recebemos sua reclamação e já iniciamos o processo de análise. Pedimos desculpas pela situação.'
      ELSE 'Olá! Agradecemos o feedback. Verificamos o ocorrido e nossa equipe já está atuando para garantir que tudo seja resolvido satisfatoriamente.'
    END
    || E'\n\n--- Consideração final do consumidor ---\n' ||
    CASE
      WHEN ri.rn % 15 = 0 THEN 'A empresa resolveu meu problema de forma rápida e eficiente. Fiquei satisfeito(a) com o atendimento e a solução apresentada. Recomendo!'
      WHEN ri.rn % 15 = 1 THEN 'Depois de abrir a reclamação aqui, a empresa entrou em contato e resolveu a situação. O atendimento foi bom, porém demorou um pouco mais do que eu esperava.'
      WHEN ri.rn % 15 = 2 THEN 'Problema resolvido! A empresa se prontificou a trocar o produto e o novo chegou funcionando perfeitamente. Agradeço pela atenção.'
      WHEN ri.rn % 15 = 3 THEN 'Infelizmente a resolução demorou bastante, mas no final conseguiram resolver. O produto foi trocado e estou usando normalmente agora.'
      WHEN ri.rn % 15 = 4 THEN 'A empresa resolveu parcialmente. Consegui o reembolso, mas o processo foi demorado e desgastante. Poderia ter sido mais ágil.'
      WHEN ri.rn % 15 = 5 THEN 'Fui muito bem atendido(a) após a reclamação. A equipe foi atenciosa e resolveu tudo dentro do prazo prometido. Nota 10 para o pós-venda!'
      WHEN ri.rn % 15 = 6 THEN 'Resolveram a situação, mas só depois que registrei a reclamação aqui. Antes disso, não obtive nenhum retorno pelos canais normais da empresa.'
      WHEN ri.rn % 15 = 7 THEN 'O produto foi substituído e o novo está funcionando bem. Gostaria que o atendimento inicial tivesse sido mais rápido, mas no fim deu tudo certo.'
      WHEN ri.rn % 15 = 8 THEN 'Não fiquei totalmente satisfeito(a) com a resolução. A empresa ofereceu um desconto em vez da troca, mas aceitei para não prolongar mais o problema.'
      WHEN ri.rn % 15 = 9 THEN 'Excelente atendimento após a reclamação! A equipe foi muito prestativa e resolveu tudo rapidamente. Mudou completamente minha percepção sobre a empresa.'
      WHEN ri.rn % 15 = 10 THEN 'A empresa cumpriu o que prometeu. Recebi o produto novo em perfeitas condições. Agradeço pela resolução.'
      WHEN ri.rn % 15 = 11 THEN 'Demorou, mas resolveram. O reembolso foi processado e já recebi o valor. Esperava mais agilidade, porém pelo menos cumpriram.'
      WHEN ri.rn % 15 = 12 THEN 'Atendimento péssimo no início, mas depois da reclamação melhorou bastante. Consegui a troca do produto e o novo veio sem problemas.'
      WHEN ri.rn % 15 = 13 THEN 'A empresa entrou em contato prontamente e ofereceu a troca imediata. Fiquei impressionado(a) com a rapidez na resolução. Parabéns!'
      ELSE 'Situação resolvida. A empresa poderia melhorar o tempo de resposta nos canais de atendimento, mas no geral fiquei satisfeito(a) com o resultado final.'
    END
FROM review_ids ri
WHERE r.id = ri.id;
