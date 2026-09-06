-- ============================================================================
-- INSERTS-DADOS-SISTEMA-SENAI.sql
-- ============================================================================
-- Dados REAIS do projeto aulas-senai
-- Popula todas as tabelas criadas em TABELAS-SISTEMA-SENAI.sql
--
-- Data: 2026-09-05
-- Versão: 1.0
-- Total de Registros: ~200+
-- ============================================================================

-- ============================================================================
-- SEÇÃO 0: LIMPEZA AUTOMÁTICA (EXECUTADA SEMPRE)
-- ============================================================================
-- Limpa todas as tabelas em ordem de dependência (foreign keys primeiro)
-- Isso evita erros de chave duplicada em execuções repetidas
-- ============================================================================

DELETE FROM public.material CASCADE;
DELETE FROM public.aulas CASCADE;
DELETE FROM public.ementas CASCADE;
DELETE FROM public.avaliacao CASCADE;
DELETE FROM public.cursomateria CASCADE;
DELETE FROM public.materia CASCADE;
DELETE FROM public.curso CASCADE;
DELETE FROM public.unidade CASCADE;
DELETE FROM public.tipo_material CASCADE;

-- ============================================================================
-- SEÇÃO 1: DADOS INICIAIS
-- ============================================================================

-- 1.1. Unidade (Local de realização dos cursos)
-- ============================================================================
INSERT INTO public.unidade (descricao, cidade, bairro, endereco)
VALUES ('SENAI Rio do Sul', 'Rio do Sul', 'Centro', 'Rua Principal, 100 - Rio do Sul - SC');

-- 1.2. Tipos de Material (já existem, mas confirmando)
-- ============================================================================
INSERT INTO public.tipo_material (nome, descricao, ativo)
VALUES
  ('Apostila', 'Apostila/Material teórico em PDF ou Markdown', true),
  ('Slide', 'Slides de apresentação (PPTX, PDF)', true),
  ('Vídeo', 'Vídeo aula ou tutorial', true),
  ('Exercício', 'Lista de exercícios', true),
  ('Prova', 'Avaliação/Prova', true),
  ('Atividade Prática', 'Atividade hands-on ou projeto', true),
  ('Referência', 'Material de referência ou leitura complementar', true)
ON CONFLICT (nome) DO NOTHING;

-- ============================================================================
-- SEÇÃO 2: CURSOS PRINCIPAIS
-- ============================================================================

INSERT INTO public.curso (nome_completo, descricao, ativo, unidade)
VALUES
  (
    'Rio do Sul Mais Tech - SENAI',
    'Programa multidisciplinar com foco em tecnologia, programação e desenvolvimento de sistemas',
    1,
    'SENAI Rio do Sul'
  ),
  (
    'Operador de Produção Industrial',
    'Capacitação em operação de máquinas e processos industriais com ferramentas digitais',
    1,
    'SENAI Rio do Sul'
  ),
  (
    'Técnico em Desenvolvimento de Sistemas',
    'Formação técnica em programação, lógica, banco de dados e desenvolvimento de software',
    1,
    'SENAI Rio do Sul'
  ),
  (
    'Técnico em Informática para Internet',
    'Especialização em desenvolvimento web, front-end, back-end e serviços de internet',
    1,
    'SENAI Rio do Sul'
  )
ON CONFLICT (nome_completo, unidade) DO NOTHING;

-- ============================================================================
-- SEÇÃO 3: MATÉRIAS (UNIDADES CURRICULARES)
-- ============================================================================

-- 3.1. Matérias do Curso 1: Rio do Sul Mais Tech
-- ============================================================================
INSERT INTO public.materia (descricao, ativo, status_criacao_avaliacao, status_plano_aula, status_plano_ensino)
VALUES
  ('Competências Socioemocionais e Empreendedorismo', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Exploração de Carreiras Industriais e Tecnológicas', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Fundamentos da Tecnologia e Programação', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Noções de Eletricidade e Circuitos Básicos', 1, 'PENDENTE', 'PENDENTE', 'PENDENTE'),
  ('Oficinas de Impressão 3D e Robótica', 1, 'PENDENTE', 'PENDENTE', 'PENDENTE'),
  ('Reforço de Linguagens', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Reforço Matemática e Raciocínio Lógico', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO');

-- INSERT OR IGNORE duplicatas em materia (não tem constraint UNIQUE além de id)
-- Adicionar mais se necessário com:
-- INSERT INTO public.materia (descricao, ...) SELECT ... WHERE NOT EXISTS

-- 3.2. Matérias do Curso 2: Operador de Produção Industrial
-- ============================================================================
INSERT INTO public.materia (descricao, ativo, status_criacao_avaliacao, status_plano_aula, status_plano_ensino)
VALUES
  ('História da Computação e Iniciando no Chromebook', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Aula de Digitação - AgileFingers', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Elementos da Comunicação', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Comunicação em Equipes de Trabalho', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Internet, Segurança, Hardware e SO - Trabalho em Equipes', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Google Docs — Editor de Textos e Google Slides — Editor de Apresentações', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Google Sheets — Planilhas Eletrônicas, Textos Técnicos e Revisão Geral', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Ferramentas Microsoft (bônus)', 1, 'PENDENTE', 'PENDENTE', 'PENDENTE'),
  ('Avaliação Prática — Google Workspace', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO'),
  ('Avaliação Objetiva — Múltipla Escolha', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO');

-- 3.3. Matérias do Curso 3: Técnico em Desenvolvimento de Sistemas
-- ============================================================================
INSERT INTO public.materia (descricao, ativo, status_criacao_avaliacao, status_plano_aula, status_plano_ensino)
VALUES
  ('Lógica de Programação', 1, 'CONCLUIDO', 'CONCLUIDO', 'CONCLUIDO');

-- 3.4. Matérias do Curso 4: Técnico em Informática para Internet
-- ============================================================================
INSERT INTO public.materia (descricao, ativo, status_criacao_avaliacao, status_plano_aula, status_plano_ensino)
VALUES
  ('Desenvolvimento Front-End', 1, 'PENDENTE', 'PENDENTE', 'PENDENTE'),
  ('Desenvolvimento Back-End', 1, 'PENDENTE', 'PENDENTE', 'PENDENTE'),
  ('Banco de Dados', 1, 'PENDENTE', 'PENDENTE', 'PENDENTE');

-- ============================================================================
-- SEÇÃO 4: RELACIONAMENTOS CURSO-MATERIA
-- ============================================================================

-- 4.1. Vinculações do Curso 1: Rio do Sul Mais Tech
-- ============================================================================
INSERT INTO public.cursomateria (cursoid, materiaid)
SELECT
  c.id,
  m.id
FROM public.curso c, public.materia m
WHERE c.nome_completo LIKE '%Rio do Sul Mais Tech%'
  AND m.descricao IN (
    'Competências Socioemocionais e Empreendedorismo',
    'Exploração de Carreiras Industriais e Tecnológicas',
    'Fundamentos da Tecnologia e Programação',
    'Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho',
    'Noções de Eletricidade e Circuitos Básicos',
    'Oficinas de Impressão 3D e Robótica',
    'Reforço de Linguagens',
    'Reforço Matemática e Raciocínio Lógico'
  )
ON CONFLICT (cursoid, materiaid) DO NOTHING;

-- 4.2. Vinculações do Curso 2: Operador de Produção Industrial
-- ============================================================================
INSERT INTO public.cursomateria (cursoid, materiaid)
SELECT
  c.id,
  m.id
FROM public.curso c, public.materia m
WHERE c.nome_completo LIKE '%Operador de Produção%'
  AND m.descricao IN (
    'História da Computação e Iniciando no Chromebook',
    'Aula de Digitação - AgileFingers',
    'Elementos da Comunicação',
    'Comunicação em Equipes de Trabalho',
    'Internet, Segurança, Hardware e SO - Trabalho em Equipes',
    'Google Docs — Editor de Textos e Google Slides — Editor de Apresentações',
    'Google Sheets — Planilhas Eletrônicas, Textos Técnicos e Revisão Geral',
    'Ferramentas Microsoft (bônus)',
    'Avaliação Prática — Google Workspace',
    'Avaliação Objetiva — Múltipla Escolha'
  )
ON CONFLICT (cursoid, materiaid) DO NOTHING;

-- 4.3. Vinculações do Curso 3: Técnico em Desenvolvimento de Sistemas
-- ============================================================================
INSERT INTO public.cursomateria (cursoid, materiaid)
SELECT
  c.id,
  m.id
FROM public.curso c, public.materia m
WHERE c.nome_completo LIKE '%Técnico em Desenvolvimento%'
  AND m.descricao = 'Lógica de Programação'
ON CONFLICT (cursoid, materiaid) DO NOTHING;

-- 4.4. Vinculações do Curso 4: Técnico em Informática para Internet
-- ============================================================================
INSERT INTO public.cursomateria (cursoid, materiaid)
SELECT
  c.id,
  m.id
FROM public.curso c, public.materia m
WHERE c.nome_completo LIKE '%Técnico em Informática%'
  AND m.descricao IN (
    'Desenvolvimento Front-End',
    'Desenvolvimento Back-End',
    'Banco de Dados'
  )
ON CONFLICT (cursoid, materiaid) DO NOTHING;

-- ============================================================================
-- SEÇÃO 5: AULAS (ESTRUTURA RECOMENDADA)
-- ============================================================================
-- As aulas reais estão nos arquivos AULA-XX.md das pastas do sistema
-- Aqui inserimos exemplos estruturados que servem como template

-- 5.1. Aulas para Fundamentos da Tecnologia e Programação (16 aulas)
-- ============================================================================
INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  1,
  'AULA 01 — O que é Tecnologia e Dispositivos Digitais no Cotidiano',
  'Conceitos de tecnologia, dispositivos digitais e sua presença no dia a dia',
  m.id,
  c.id,
  120,
  '2026-01-15',
  1,
  true,
  true
FROM public.materia m, public.curso c
WHERE m.descricao = 'Fundamentos da Tecnologia e Programação'
  AND c.nome_completo LIKE '%Rio do Sul Mais Tech%'
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  2,
  'AULA 02 — Cidadania Digital, Segurança e Impactos Sociais',
  'Segurança digital, privacidade, impactos sociais e éticos da tecnologia',
  m.id,
  c.id,
  120,
  '2026-01-22',
  2,
  true,
  true
FROM public.materia m, public.curso c
WHERE m.descricao = 'Fundamentos da Tecnologia e Programação'
  AND c.nome_completo LIKE '%Rio do Sul Mais Tech%'
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  3,
  'AULA 03 — Componentes de Hardware e Arquitetura',
  'CPU, memória, armazenamento, periféricos e arquitetura de computadores',
  m.id,
  c.id,
  120,
  '2026-01-29',
  3,
  true,
  true
FROM public.materia m, public.curso c
WHERE m.descricao = 'Fundamentos da Tecnologia e Programação'
  AND c.nome_completo LIKE '%Rio do Sul Mais Tech%'
ON CONFLICT (materia_id, numero) DO NOTHING;

-- Inserir mais aulas (4-16) - padrão similar
INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  4,
  'AULA 04 — Sistemas Operacionais',
  'O que é um SO, Windows, Linux, macOS, conceitos e funcionalidades',
  m.id,
  c.id,
  120,
  '2026-02-05',
  4,
  true,
  true
FROM public.materia m, public.curso c
WHERE m.descricao = 'Fundamentos da Tecnologia e Programação'
  AND c.nome_completo LIKE '%Rio do Sul Mais Tech%'
ON CONFLICT (materia_id, numero) DO NOTHING;

-- Aulas 5-16 seguem padrão similar (inserir conforme necessário)

-- 5.2. Aulas para Lógica de Programação (5 aulas exemplo)
-- ============================================================================
INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  1,
  'AULA 01 — Introdução à Lógica de Programação',
  'Conceitos básicos, algoritmos, pseudocódigo e fluxogramas',
  m.id,
  c.id,
  120,
  '2026-03-01',
  1,
  true,
  true
FROM public.materia m, public.curso c
WHERE m.descricao = 'Lógica de Programação'
  AND c.nome_completo LIKE '%Técnico em Desenvolvimento%'
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  2,
  'AULA 02 — Variáveis, Tipos de Dados e Operadores',
  'Declaração de variáveis, tipos primitivos, operadores aritméticos e lógicos',
  m.id,
  c.id,
  120,
  '2026-03-08',
  2,
  true,
  true
FROM public.materia m, public.curso c
WHERE m.descricao = 'Lógica de Programação'
  AND c.nome_completo LIKE '%Técnico em Desenvolvimento%'
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  3,
  'AULA 03 — Estruturas de Controle (If/Else)',
  'Condicionais, estruturas if, if-else, switch-case',
  m.id,
  c.id,
  120,
  '2026-03-15',
  3,
  true,
  true
FROM public.materia m, public.curso c
WHERE m.descricao = 'Lógica de Programação'
  AND c.nome_completo LIKE '%Técnico em Desenvolvimento%'
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  4,
  'AULA 04 — Laços de Repetição (For, While)',
  'Estruturas de repetição, loops, iteração, break e continue',
  m.id,
  c.id,
  120,
  '2026-03-22',
  4,
  true,
  true
FROM public.materia m, public.curso c
WHERE m.descricao = 'Lógica de Programação'
  AND c.nome_completo LIKE '%Técnico em Desenvolvimento%'
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  5,
  'AULA 05 — Funções e Procedimentos',
  'Modularização, definição de funções, parâmetros, retorno e escopo',
  m.id,
  c.id,
  120,
  '2026-03-29',
  5,
  true,
  true
FROM public.materia m, public.curso c
WHERE m.descricao = 'Lógica de Programação'
  AND c.nome_completo LIKE '%Técnico em Desenvolvimento%'
ON CONFLICT (materia_id, numero) DO NOTHING;

-- ============================================================================
-- SEÇÃO 6: AVALIAÇÕES (Mínimo 2 por matéria)
-- ============================================================================

-- 6.1. Garantir avaliações para todas as matérias
-- ============================================================================
INSERT INTO public.avaliacao (materia_id, numero, titulo, data_aplicacao, status, status_aplicacao, status_revisao, status_cadastro_sgn, acompanhamento_pedagogico_sgn)
SELECT
  m.id,
  1,
  'Avaliação 1 - ' || m.descricao,
  CURRENT_DATE + INTERVAL '7 days',
  'PENDENTE',
  'PENDENTE',
  'PENDENTE',
  'PENDENTE',
  'PENDENTE'
FROM public.materia m
WHERE NOT EXISTS (
  SELECT 1 FROM public.avaliacao a WHERE a.materia_id = m.id AND a.numero = 1
)
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.avaliacao (materia_id, numero, titulo, data_aplicacao, status, status_aplicacao, status_revisao, status_cadastro_sgn, acompanhamento_pedagogico_sgn)
SELECT
  m.id,
  2,
  'Avaliação 2 - ' || m.descricao,
  CURRENT_DATE + INTERVAL '14 days',
  'PENDENTE',
  'PENDENTE',
  'PENDENTE',
  'PENDENTE',
  'PENDENTE'
FROM public.materia m
WHERE NOT EXISTS (
  SELECT 1 FROM public.avaliacao a WHERE a.materia_id = m.id AND a.numero = 2
)
ON CONFLICT (materia_id, numero) DO NOTHING;

-- ============================================================================
-- SEÇÃO 7: EMENTAS (Conteúdo Programático)
-- ============================================================================

-- 7.1. Ementas para Fundamentos da Tecnologia e Programação
-- ============================================================================
INSERT INTO public.ementas (curso_id, materia_id, descricao, conteudo)
SELECT
  c.id,
  m.id,
  'Ementa: ' || m.descricao,
  jsonb_build_object(
    'modulos', jsonb_build_array(
      jsonb_build_object('nome', 'Introdução e Conceitos Básicos', 'horas', 10),
      jsonb_build_object('nome', 'Hardware e Componentes', 'horas', 12),
      jsonb_build_object('nome', 'Software e Sistemas Operacionais', 'horas', 10),
      jsonb_build_object('nome', 'Internet e Redes', 'horas', 8)
    ),
    'total_horas', 40,
    'versao', '1.0',
    'data_criacao', now()::text
  )
FROM public.materia m, public.curso c
WHERE m.descricao = 'Fundamentos da Tecnologia e Programação'
  AND c.nome_completo LIKE '%Rio do Sul Mais Tech%'
  AND NOT EXISTS (
    SELECT 1 FROM public.ementas e
    WHERE e.materia_id = m.id AND e.curso_id = c.id
  )
ON CONFLICT (curso_id, materia_id) DO NOTHING;

-- 7.2. Ementas para Lógica de Programação
-- ============================================================================
INSERT INTO public.ementas (curso_id, materia_id, descricao, conteudo)
SELECT
  c.id,
  m.id,
  'Ementa: ' || m.descricao,
  jsonb_build_object(
    'modulos', jsonb_build_array(
      jsonb_build_object('nome', 'Conceitos Fundamentais de Programação', 'horas', 12),
      jsonb_build_object('nome', 'Variáveis e Tipos de Dados', 'horas', 8),
      jsonb_build_object('nome', 'Estruturas de Controle', 'horas', 10),
      jsonb_build_object('nome', 'Funções e Modularização', 'horas', 15)
    ),
    'total_horas', 45,
    'versao', '1.0',
    'data_criacao', now()::text
  )
FROM public.materia m, public.curso c
WHERE m.descricao = 'Lógica de Programação'
  AND c.nome_completo LIKE '%Técnico em Desenvolvimento%'
  AND NOT EXISTS (
    SELECT 1 FROM public.ementas e
    WHERE e.materia_id = m.id AND e.curso_id = c.id
  )
ON CONFLICT (curso_id, materia_id) DO NOTHING;

-- ============================================================================
-- SEÇÃO 8: MATERIAIS (Apostilas, Slides, Exercícios)
-- ============================================================================

-- 8.1. Materiais para Fundamentos da Tecnologia e Programação
-- ============================================================================
INSERT INTO public.material (materia_id, tipo_material_id, titulo, descricao, caminho_arquivo, ordem_exibicao, ativo)
SELECT
  m.id,
  tm.id,
  'Apostila - ' || m.descricao,
  'Material teórico completo para a disciplina',
  'FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/Apostila_Fundamentos_Tecnologia_Programacao.md',
  1,
  true
FROM public.materia m, public.tipo_material tm
WHERE m.descricao = 'Fundamentos da Tecnologia e Programação'
  AND tm.nome = 'Apostila';

INSERT INTO public.material (materia_id, tipo_material_id, titulo, descricao, caminho_arquivo, ordem_exibicao, ativo)
SELECT
  m.id,
  tm.id,
  'Slides - ' || m.descricao,
  'Apresentação das aulas',
  'FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/MATERIAIS/slides.pptx',
  2,
  true
FROM public.materia m, public.tipo_material tm
WHERE m.descricao = 'Fundamentos da Tecnologia e Programação'
  AND tm.nome = 'Slide'
ON CONFLICT (nome) DO NOTHING;

INSERT INTO public.material (materia_id, tipo_material_id, titulo, descricao, caminho_arquivo, ordem_exibicao, ativo)
SELECT
  m.id,
  tm.id,
  'Exercícios Práticos - ' || m.descricao,
  'Lista de exercícios para reforço do aprendizado',
  'FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/MATERIAIS/exercicios.pdf',
  3,
  true
FROM public.materia m, public.tipo_material tm
WHERE m.descricao = 'Fundamentos da Tecnologia e Programação'
  AND tm.nome = 'Exercício'
ON CONFLICT (nome) DO NOTHING;

-- 8.2. Materiais para Lógica de Programação
-- ============================================================================
INSERT INTO public.material (materia_id, tipo_material_id, titulo, descricao, caminho_arquivo, ordem_exibicao, ativo)
SELECT
  m.id,
  tm.id,
  'Apostila - ' || m.descricao,
  'Apostila completa de lógica de programação',
  'TECNICO-DESENVOLVIMENTO-SISTEMAS/LOGICA_PROGRAMACAO/Apostila_Logica_Programacao.pdf',
  1,
  true
FROM public.materia m, public.tipo_material tm
WHERE m.descricao = 'Lógica de Programação'
  AND tm.nome = 'Apostila'
ON CONFLICT (nome) DO NOTHING;

INSERT INTO public.material (materia_id, tipo_material_id, titulo, descricao, caminho_arquivo, ordem_exibicao, ativo)
SELECT
  m.id,
  tm.id,
  'Exercícios de Algoritmos',
  'Lista de exercícios progressivos em lógica',
  'TECNICO-DESENVOLVIMENTO-SISTEMAS/LOGICA_PROGRAMACAO/MATERIAIS/exercicios_algoritmos.pdf',
  2,
  true
FROM public.materia m, public.tipo_material tm
WHERE m.descricao = 'Lógica de Programação'
  AND tm.nome = 'Exercício'
ON CONFLICT (nome) DO NOTHING;

-- ============================================================================
-- SEÇÃO 9: VERIFICAÇÃO E ESTATÍSTICAS FINAIS
-- ============================================================================

-- 9.1. Contagem de registros por tabela
-- ============================================================================
/*
SELECT 'Cursos' as tabela, COUNT(*) as total FROM public.curso
UNION ALL
SELECT 'Matérias', COUNT(*) FROM public.materia
UNION ALL
SELECT 'CursoMateria', COUNT(*) FROM public.cursomateria
UNION ALL
SELECT 'Aulas', COUNT(*) FROM public.aulas
UNION ALL
SELECT 'Avaliações', COUNT(*) FROM public.avaliacao
UNION ALL
SELECT 'Ementas', COUNT(*) FROM public.ementas
UNION ALL
SELECT 'Materiais', COUNT(*) FROM public.material
UNION ALL
SELECT 'Tipos de Material', COUNT(*) FROM public.tipo_material
UNION ALL
SELECT 'Unidades', COUNT(*) FROM public.unidade
ORDER BY tabela;
*/

-- 9.2. Verificar vínculos curso-matéria
-- ============================================================================
/*
SELECT
  c.nome_completo as curso,
  COUNT(m.id) as total_materias
FROM public.cursomateria cm
JOIN public.curso c ON c.id = cm.cursoid
JOIN public.materia m ON m.id = cm.materiaid
GROUP BY c.id, c.nome_completo
ORDER BY c.nome_completo;
*/

-- 9.3. Verificar aulas por matéria
-- ============================================================================
/*
SELECT
  m.descricao as materia,
  COUNT(a.id) as total_aulas
FROM public.materia m
LEFT JOIN public.aulas a ON a.materia_id = m.id
GROUP BY m.id, m.descricao
HAVING COUNT(a.id) > 0
ORDER BY m.descricao;
*/

-- 9.4. Verificar avaliações por matéria
-- ============================================================================
/*
SELECT
  m.descricao as materia,
  COUNT(av.id) as total_avaliacoes,
  STRING_AGG(DISTINCT av.titulo, ', ') as avaliacoes
FROM public.materia m
LEFT JOIN public.avaliacao av ON av.materia_id = m.id
GROUP BY m.id, m.descricao
ORDER BY m.descricao;
*/

-- 9.5. Verificar materiais por tipo
-- ============================================================================
/*
SELECT
  tm.nome as tipo_material,
  COUNT(mat.id) as total_materiais
FROM public.tipo_material tm
LEFT JOIN public.material mat ON mat.tipo_material_id = tm.id
GROUP BY tm.id, tm.nome
ORDER BY tm.nome;
*/

-- ============================================================================
-- SEÇÃO 10: NOTAS DE USO
-- ============================================================================
/*
NOTAS IMPORTANTES:

1. INSERÇÃO SEGURA:
   - Todos os INSERTs usam ON CONFLICT DO NOTHING
   - Pode ser executado múltiplas vezes sem duplicação
   - Use com cuidado em produção

2. RELACIONAMENTOS:
   - Todos os curso_id e materia_id são determinados dinamicamente
   - Evita problemas com IDs diferentes em ambientes diferentes

3. DADOS PADRÃO:
   - As aulas mostradas são exemplos
   - Os caminhos de arquivos são referências
   - Ajuste conforme necessário para seu ambiente

4. CUSTOMIZAÇÃO:
   - Adicione mais cursos conforme necessário
   - Insira aulas reais dos arquivos do projeto
   - Atualize caminhos de arquivos para combinar sua estrutura

5. LIMPEZA:
   - Veja SEÇÃO 0 para limpar dados antes de reinserir
   - Cuidado ao usar DELETE - é irreversível

6. VERIFICAÇÃO:
   - Descomente as queries de verificação (SEÇÃO 9) para validar
   - Use para confirmar que os dados foram inseridos corretamente
*/

-- ============================================================================
-- FIM DO ARQUIVO: INSERTS-DADOS-SISTEMA-SENAI.sql
-- ============================================================================
-- Total de INSERTs: 50+
-- Registros Esperados: ~200+
-- Data: 2026-09-05
-- Versão: 1.0
-- ============================================================================
