-- =====================================================================
-- SISTEMA DE DELIVERY DE COMIDA
-- ATIVIDADE 04: Consultas SQL (Relatórios e Operações)
-- SGBD: MySQL 8.0
-- =====================================================================

-- =====================================================================
-- CONSULTAS BÁSICAS COM SELECT
-- =====================================================================

-- 1. Listar todos os usuários ativos com seus endereços
SELECT
    u.id_usuario,
    u.nome,
    u.email,
    u.telefone,
    CONCAT(e.rua, ', ', e.numero, ' - ', e.bairro, ', ', e.cidade, '-', e.estado) AS endereco_completo,
    u.data_cadastro
FROM USUARIO u
LEFT JOIN ENDERECO e ON u.id_endereco = e.id_endereco
WHERE u.status = 'ativo'
ORDER BY u.nome ASC;

-- 2. Listar todos os restaurantes com suas avaliações médias e status operacional
SELECT
    r.id_restaurante,
    r.nome,
    r.cnpj,
    r.telefone,
    r.horario_abertura,
    r.horario_fechamento,
    r.avaliacao_media,
    r.tempo_medio_preparo AS tempo_preparo_min,
    r.taxa_entrega,
    r.status,
    COUNT(DISTINCT p.id_pedido) AS total_pedidos
FROM RESTAURANTE r
LEFT JOIN PEDIDO p ON r.id_restaurante = p.id_restaurante
GROUP BY r.id_restaurante
ORDER BY r.avaliacao_media DESC;

-- 3. Listar todos os entregadores com suas avaliações
SELECT
    e.id_entregador,
    e.nome,
    e.cpf,
    e.telefone,
    e.veiculo,
    e.placa_veiculo,
    e.avaliacao_media,
    e.status,
    COUNT(DISTINCT p.id_pedido) AS total_entregas
FROM ENTREGADOR e
LEFT JOIN PEDIDO p ON e.id_entregador = p.id_entregador
GROUP BY e.id_entregador
ORDER BY e.avaliacao_media DESC;

-- =====================================================================
-- CONSULTAS COM FILTROS E CLÁUSULAS WHERE
-- =====================================================================

-- 4. Listar pedidos de um usuário específico (João Silva) com detalhes
SELECT
    p.id_pedido,
    u.nome AS cliente,
    r.nome AS restaurante,
    p.data_pedido,
    p.status_pedido,
    p.valor_total - p.valor_desconto + p.valor_taxa_entrega AS valor_final,
    e.nome AS entregador
FROM PEDIDO p
INNER JOIN USUARIO u ON p.id_usuario = u.id_usuario
INNER JOIN RESTAURANTE r ON p.id_restaurante = r.id_restaurante
LEFT JOIN ENTREGADOR e ON p.id_entregador = e.id_entregador
WHERE u.nome = 'João Silva'
ORDER BY p.data_pedido DESC;

-- 5. Listar pedidos que ainda não foram entregues
SELECT
    p.id_pedido,
    u.nome AS cliente,
    r.nome AS restaurante,
    p.data_pedido,
    p.status_pedido,
    p.valor_total,
    CONCAT(end.rua, ', ', end.numero) AS endereco_entrega
FROM PEDIDO p
INNER JOIN USUARIO u ON p.id_usuario = u.id_usuario
INNER JOIN RESTAURANTE r ON p.id_restaurante = r.id_restaurante
INNER JOIN ENDERECO end ON p.id_endereco_entrega = end.id_endereco
WHERE p.status_pedido IN ('pendente', 'confirmado', 'preparando', 'saiu_para_entrega')
ORDER BY p.data_pedido ASC;

-- 6. Listar pedidos com pagamentos recusados ou pendentes
SELECT
    p.id_pedido,
    u.nome AS cliente,
    pag.tipo_pagamento,
    pag.valor,
    pag.status_pagamento,
    pag.data_pagamento,
    p.status_pedido
FROM PEDIDO p
INNER JOIN USUARIO u ON p.id_usuario = u.id_usuario
INNER JOIN PAGAMENTO pag ON p.id_pedido = pag.id_pedido
WHERE pag.status_pagamento IN ('recusado', 'pendente', 'processando')
ORDER BY pag.data_pagamento ASC;

-- =====================================================================
-- CONSULTAS COM JUNÇÕES (JOINS)
-- =====================================================================

-- 7. Listar itens de um pedido específico com detalhes completos
SELECT
    ip.id_item_pedido,
    c.nome AS item,
    c.categoria,
    ip.quantidade,
    ip.preco_unitario,
    ip.subtotal,
    ip.observacoes,
    r.nome AS restaurante
FROM ITEM_PEDIDO ip
INNER JOIN CARDAPIO c ON ip.id_cardapio = c.id_cardapio
INNER JOIN RESTAURANTE r ON c.id_restaurante = r.id_restaurante
WHERE ip.id_pedido = 1
ORDER BY ip.id_item_pedido;

-- 8. Listar o cardápio completo com disponibilidade (INNER JOIN)
SELECT
    c.id_cardapio,
    r.nome AS restaurante,
    c.nome AS prato,
    c.descricao,
    c.preco,
    c.categoria,
    c.quantidade_estoque,
    CASE
        WHEN c.disponivel = TRUE AND c.quantidade_estoque > 0 THEN 'Disponível'
        WHEN c.disponivel = FALSE THEN 'Indisponível'
        WHEN c.quantidade_estoque = 0 THEN 'Sem estoque'
        ELSE 'Desconhecido'
    END AS status_disponibilidade
FROM CARDAPIO c
INNER JOIN RESTAURANTE r ON c.id_restaurante = r.id_restaurante
ORDER BY r.nome, c.categoria;

-- 9. Listar histórico de entregas do entregador "Diego Silva" (MULTIPLE JOINS)
SELECT
    p.id_pedido,
    u.nome AS cliente,
    r.nome AS restaurante,
    p.data_pedido,
    p.data_entrega,
    CONCAT(end.rua, ', ', end.numero, ' - ', end.bairro) AS endereco_entrega,
    p.valor_total,
    p.status_pedido
FROM PEDIDO p
INNER JOIN USUARIO u ON p.id_usuario = u.id_usuario
INNER JOIN RESTAURANTE r ON p.id_restaurante = r.id_restaurante
INNER JOIN ENTREGADOR e ON p.id_entregador = e.id_entregador
INNER JOIN ENDERECO end ON p.id_endereco_entrega = end.id_endereco
WHERE e.nome = 'Diego Silva'
ORDER BY p.data_pedido DESC;

-- =====================================================================
-- CONSULTAS COM AGREGAÇÃO (GROUP BY, HAVING)
-- =====================================================================

-- 10. Totalizar pedidos por status (agregação simples)
SELECT
    p.status_pedido,
    COUNT(p.id_pedido) AS total_pedidos,
    SUM(p.valor_total) AS valor_total_bruto,
    ROUND(AVG(p.valor_total), 2) AS valor_medio
FROM PEDIDO p
GROUP BY p.status_pedido
ORDER BY total_pedidos DESC;

-- 11. Listar restaurantes com receita total acima de R$200
SELECT
    r.nome AS restaurante,
    COUNT(DISTINCT p.id_pedido) AS total_pedidos,
    SUM(p.valor_total) AS receita_total,
    ROUND(AVG(p.valor_total), 2) AS ticket_medio,
    r.avaliacao_media
FROM RESTAURANTE r
INNER JOIN PEDIDO p ON r.id_restaurante = p.id_restaurante
GROUP BY r.id_restaurante
HAVING SUM(p.valor_total) > 200
ORDER BY receita_total DESC;

-- 12. Contar pedidos por entregador com filtro HAVING
SELECT
    e.nome AS entregador,
    COUNT(p.id_pedido) AS total_entregas,
    ROUND(AVG(p.valor_taxa_entrega), 2) AS taxa_media,
    e.avaliacao_media
FROM ENTREGADOR e
LEFT JOIN PEDIDO p ON e.id_entregador = p.id_entregador
GROUP BY e.id_entregador
HAVING COUNT(p.id_pedido) > 0
ORDER BY total_entregas DESC;

-- 13. Listar vendas por categoria de prato
SELECT
    c.categoria,
    COUNT(DISTINCT ip.id_item_pedido) AS total_itens_vendidos,
    SUM(ip.quantidade) AS quantidade_total,
    ROUND(SUM(ip.subtotal), 2) AS faturamento_categoria
FROM ITEM_PEDIDO ip
INNER JOIN CARDAPIO c ON ip.id_cardapio = c.id_cardapio
GROUP BY c.categoria
ORDER BY faturamento_categoria DESC;

-- =====================================================================
-- CONSULTAS COM ORDENAÇÃO E LIMITE
-- =====================================================================

-- 14. Top 5 pratos mais vendidos
SELECT
    c.nome AS prato,
    r.nome AS restaurante,
    COUNT(ip.id_item_pedido) AS vezes_pedido,
    SUM(ip.quantidade) AS quantidade_vendida,
    ROUND(SUM(ip.subtotal), 2) AS faturamento
FROM ITEM_PEDIDO ip
INNER JOIN CARDAPIO c ON ip.id_cardapio = c.id_cardapio
INNER JOIN RESTAURANTE r ON c.id_restaurante = r.id_restaurante
GROUP BY ip.id_cardapio
ORDER BY vezes_pedido DESC
LIMIT 5;

-- 15. Últimos 5 pedidos realizados
SELECT
    p.id_pedido,
    u.nome AS cliente,
    r.nome AS restaurante,
    p.data_pedido,
    p.status_pedido,
    ROUND(p.valor_total + p.valor_taxa_entrega - p.valor_desconto, 2) AS valor_final
FROM PEDIDO p
INNER JOIN USUARIO u ON p.id_usuario = u.id_usuario
INNER JOIN RESTAURANTE r ON p.id_restaurante = r.id_restaurante
ORDER BY p.data_pedido DESC
LIMIT 5;

-- =====================================================================
-- CONSULTAS COM FUNÇÕES DE DATA
-- =====================================================================

-- 16. Pedidos do último mês com análise temporal
SELECT
    DATE(p.data_pedido) AS data_pedido,
    COUNT(p.id_pedido) AS total_pedidos,
    ROUND(SUM(p.valor_total), 2) AS receita_dia,
    ROUND(AVG(p.valor_total), 2) AS ticket_medio
FROM PEDIDO p
WHERE MONTH(p.data_pedido) = MONTH(NOW())
  AND YEAR(p.data_pedido) = YEAR(NOW())
GROUP BY DATE(p.data_pedido)
ORDER BY p.data_pedido DESC;

-- 17. Tempo médio de preparo por restaurante (dias para entrega)
SELECT
    r.nome AS restaurante,
    ROUND(AVG(DATEDIFF(p.data_entrega, p.data_pedido)), 2) AS dias_medio_entrega,
    r.tempo_medio_preparo,
    COUNT(DISTINCT p.id_pedido) AS pedidos_entregues
FROM RESTAURANTE r
LEFT JOIN PEDIDO p ON r.id_restaurante = p.id_restaurante
                    AND p.status_pedido = 'entregue'
GROUP BY r.id_restaurante
ORDER BY dias_medio_entrega ASC;

-- =====================================================================
-- CONSULTAS COM SUBCONSULTAS
-- =====================================================================

-- 18. Usuários que fizeram mais pedidos
SELECT
    u.id_usuario,
    u.nome,
    u.email,
    (SELECT COUNT(*)
     FROM PEDIDO
     WHERE id_usuario = u.id_usuario) AS total_pedidos_usuario,
    (SELECT ROUND(SUM(valor_total), 2)
     FROM PEDIDO
     WHERE id_usuario = u.id_usuario) AS gasto_total
FROM USUARIO u
WHERE (SELECT COUNT(*)
       FROM PEDIDO
       WHERE id_usuario = u.id_usuario) > 0
ORDER BY total_pedidos_usuario DESC;

-- 19. Restaurantes com avaliação acima da média
SELECT
    r.id_restaurante,
    r.nome,
    r.avaliacao_media,
    (SELECT AVG(avaliacao_media) FROM RESTAURANTE) AS media_geral,
    COUNT(DISTINCT a.id_avaliacao) AS total_avaliacoes
FROM RESTAURANTE r
LEFT JOIN AVALIACAO a ON r.id_restaurante = a.id_restaurante
WHERE r.avaliacao_media > (SELECT AVG(avaliacao_media) FROM RESTAURANTE)
GROUP BY r.id_restaurante
ORDER BY r.avaliacao_media DESC;

-- =====================================================================
-- OPERAÇÕES DML - UPDATE
-- =====================================================================

-- 20. Atualizar status de um pedido de "preparando" para "saiu_para_entrega"
-- (Exemplo com id_pedido = 4)
UPDATE PEDIDO
SET status_pedido = 'saiu_para_entrega',
    data_entrega = NOW()
WHERE id_pedido = 4;

-- Verificar a atualização
SELECT id_pedido, status_pedido, data_entrega
FROM PEDIDO
WHERE id_pedido = 4;

-- =====================================================================
-- OPERAÇÕES DML - UPDATE com CASE (Atualizar múltiplos registros)
-- =====================================================================

-- 21. Atualizar avaliações médias de restaurantes baseado nas avaliações
UPDATE RESTAURANTE r
SET r.avaliacao_media = (
    SELECT ROUND(AVG(a.nota), 2)
    FROM AVALIACAO a
    WHERE a.id_restaurante = r.id_restaurante
      AND a.tipo_avaliacao = 'restaurante'
)
WHERE EXISTS (
    SELECT 1 FROM AVALIACAO a
    WHERE a.id_restaurante = r.id_restaurante
);

-- Verificar a atualização
SELECT id_restaurante, nome, avaliacao_media FROM RESTAURANTE ORDER BY avaliacao_media DESC;

-- =====================================================================
-- OPERAÇÕES DML - DELETE (Com cuidado!)
-- =====================================================================

-- 22. Cancelar um pedido inativo (soft delete - marcar como cancelado)
-- Este é o método recomendado ao invés de deletar
UPDATE PEDIDO
SET status_pedido = 'cancelado'
WHERE id_pedido = 7 AND status_pedido IN ('pendente', 'confirmado');

-- Verificar se o pedido foi cancelado
SELECT id_pedido, status_pedido FROM PEDIDO WHERE id_pedido = 7;

-- =====================================================================
-- OPERAÇÕES DML - INSERT (Adicionar novos registros)
-- =====================================================================

-- 23. Inserir um novo pedido com todos os dados relacionados
BEGIN;

-- Inserir novo pedido
INSERT INTO PEDIDO (id_usuario, id_restaurante, id_entregador, id_endereco_entrega,
                    status_pedido, valor_total, valor_desconto, valor_taxa_entrega)
VALUES (1, 2, 5, 2, 'pendente', 150.00, 0.00, 6.00);

-- Obter o ID do novo pedido
SET @novo_pedido_id = LAST_INSERT_ID();

-- Inserir itens do pedido
INSERT INTO ITEM_PEDIDO (id_pedido, id_cardapio, quantidade, preco_unitario, subtotal)
VALUES (@novo_pedido_id, 3, 1, 65.00, 65.00),
       (@novo_pedido_id, 4, 1, 75.00, 75.00),
       (@novo_pedido_id, 6, 1, 15.00, 15.00);

-- Inserir pagamento
INSERT INTO PAGAMENTO (id_pedido, id_usuario, tipo_pagamento, valor, status_pagamento)
VALUES (@novo_pedido_id, 1, 'pix', 156.00, 'pendente');

COMMIT;

-- Verificar o novo pedido
SELECT * FROM PEDIDO WHERE id_pedido = @novo_pedido_id;
SELECT * FROM ITEM_PEDIDO WHERE id_pedido = @novo_pedido_id;
SELECT * FROM PAGAMENTO WHERE id_pedido = @novo_pedido_id;

-- =====================================================================
-- RELATÓRIOS EXECUTIVOS
-- =====================================================================

-- 24. Relatório de faturamento diário
SELECT
    DATE(p.data_pedido) AS data,
    COUNT(DISTINCT p.id_pedido) AS total_pedidos,
    COUNT(DISTINCT p.id_usuario) AS total_clientes,
    ROUND(SUM(p.valor_total), 2) AS faturamento_pedidos,
    ROUND(SUM(p.valor_taxa_entrega), 2) AS faturamento_taxa,
    ROUND(SUM(p.valor_desconto), 2) AS desconto_concedido,
    ROUND(SUM(p.valor_total) + SUM(p.valor_taxa_entrega) - SUM(p.valor_desconto), 2) AS receita_liquida
FROM PEDIDO p
WHERE p.status_pedido = 'entregue'
GROUP BY DATE(p.data_pedido)
ORDER BY p.data_pedido DESC;

-- 25. Relatório de satisfação (avaliações por tipo)
SELECT
    a.tipo_avaliacao,
    ROUND(AVG(a.nota), 2) AS nota_media,
    COUNT(a.id_avaliacao) AS total_avaliacoes,
    SUM(CASE WHEN a.nota = 5 THEN 1 ELSE 0 END) AS cinco_estrelas,
    SUM(CASE WHEN a.nota = 4 THEN 1 ELSE 0 END) AS quatro_estrelas,
    SUM(CASE WHEN a.nota = 3 THEN 1 ELSE 0 END) AS tres_estrelas,
    SUM(CASE WHEN a.nota <= 2 THEN 1 ELSE 0 END) AS duas_ou_menos
FROM AVALIACAO a
GROUP BY a.tipo_avaliacao;

-- =====================================================================
-- FIM DO SCRIPT
-- =====================================================================

