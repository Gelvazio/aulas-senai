-- SCRIPT: Inserir/Atualizar Todas as Ementas - Rio do Sul Mais Tech
-- Data: 2026-09-07
-- Programa: Rio do Sul Mais Tech - SENAI
-- Descrição: Script consolidado para atualizar as 8 ementas das UCs no banco de dados

-- ============================================================
-- UC 1: COMPETÊNCIAS SOCIOEMOCIONAIS E EMPREENDEDORISMO (36h)
-- ============================================================
INSERT INTO public.ementas (materia_id, conteudo, criado_em, atualizado_em)
VALUES (
  (SELECT id FROM public.materia WHERE LOWER(nome) LIKE '%competencia%socioemocionais%' LIMIT 1),
  'COMPETÊNCIAS SOCIOEMOCIONAIS E EMPREENDEDORISMO (36h)

OBJETIVO GERAL:
Proporcionar aos alunos uma formação integral que os capacite não apenas tecnicamente, mas também emocionalmente, para atuar com mais segurança e assertividade no mercado de trabalho ou na criação de seus próprios projetos empreendedores.

CAPACIDADES A DESENVOLVER:
- Identificar os tipos de negócios existentes em nossa economia
- Identificar e compreender o perfil das pessoas empreendedoras
- Adotar comportamento ético no exercício das atividades profissionais
- Reconhecer virtudes essenciais para empreendedores de sucesso
- Aplicar conceitos de sustentabilidade e responsabilidade ambiental

CONTEÚDOS: Sustentabilidade (5Rs, coleta seletiva, ciclo da água), Empreendedorismo (conceito, oportunidades, plano de negócios), Ética e Valores

AVALIAÇÃO: Participação (40%), Plano de negócios (40%), Apresentação (20%)',
  NOW(),
  NOW()
)
ON CONFLICT (materia_id) DO UPDATE
SET conteudo = EXCLUDED.conteudo, atualizado_em = NOW();

-- ============================================================
-- UC 2: FUNDAMENTOS DA TECNOLOGIA E PROGRAMAÇÃO (33h)
-- ============================================================
INSERT INTO public.ementas (materia_id, conteudo, criado_em, atualizado_em)
VALUES (
  (SELECT id FROM public.materia WHERE LOWER(nome) LIKE '%fundamentos%tecnologia%' LIMIT 1),
  'FUNDAMENTOS DA TECNOLOGIA E PROGRAMAÇÃO (33h)

OBJETIVO GERAL:
Desenvolver competências tecnológicas e computacionais, compreendendo os fundamentos da informática e da programação com foco no uso consciente da tecnologia e resolução de problemas.

CAPACIDADES A DESENVOLVER:
- Compreender funcionamento de computadores e sistemas operacionais
- Desenvolver pensamento lógico e estruturado para resolver problemas
- Aprender a desenvolver e entender algoritmos simples
- Interagir com usuários através de entrada e saída de dados
- Pensar criativamente sobre soluções usando tecnologia
- Refletir sobre implicações éticas e sociais das tecnologias

CONTEÚDOS: Fundamentos de TI, Segurança Digital, Hardware/Software, Operações Básicas, Aplicativos, Pensamento Computacional, Programação em Blocos (Scratch)

AVALIAÇÃO: Participação prática (30%), Projetos Scratch (50%), Avaliação conceitual (20%)',
  NOW(),
  NOW()
)
ON CONFLICT (materia_id) DO UPDATE
SET conteudo = EXCLUDED.conteudo, atualizado_em = NOW();

-- ============================================================
-- UC 3: NOÇÕES DE ELETRICIDADE E CIRCUITOS BÁSICOS (36h)
-- ============================================================
INSERT INTO public.ementas (materia_id, conteudo, criado_em, atualizado_em)
VALUES (
  (SELECT id FROM public.materia WHERE LOWER(nome) LIKE '%eletricidade%circuitos%' LIMIT 1),
  'NOÇÕES DE ELETRICIDADE E CIRCUITOS BÁSICOS (36h)

OBJETIVO GERAL:
Proporcionar conhecimento fundamental sobre princípios da eletricidade e conceitos essenciais para compreensão, análise e construção de circuitos elétricos simples com segurança.

CAPACIDADES A DESENVOLVER:
- Aplicar normas técnicas e segurança no trabalho com eletricidade
- Identificar características de instrumentos de medidas elétricas
- Identificar componentes e equipamentos em circuitos elétricos
- Interpretar diagramas elétricos básicos
- Utilizar instrumentos de medidas (voltímetro, amperímetro)
- Construir circuitos simples com segurança

CONTEÚDOS: Eletricidade Básica, Instalações Elétricas, Circuitos (série/paralelo), Diagnóstico e Manutenção, Segurança (NR 10)

AVALIAÇÃO: Testes práticos (40%), Avaliação teórica (30%), Participação e segurança (30%)',
  NOW(),
  NOW()
)
ON CONFLICT (materia_id) DO UPDATE
SET conteudo = EXCLUDED.conteudo, atualizado_em = NOW();

-- ============================================================
-- UC 4: OFICINAS DE IMPRESSÃO 3D E ROBÓTICA (36h)
-- ============================================================
INSERT INTO public.ementas (materia_id, conteudo, criado_em, atualizado_em)
VALUES (
  (SELECT id FROM public.materia WHERE LOWER(nome) LIKE '%impressao%3d%' OR LOWER(nome) LIKE '%robotica%' LIMIT 1),
  'OFICINAS DE IMPRESSÃO 3D E ROBÓTICA (36h)

OBJETIVO GERAL:
Proporcionar formação prática e interdisciplinar que combina conceitos de design, engenharia, programação e tecnologia através da construção de protótipos e robôs.

CAPACIDADES A DESENVOLVER:
- Entender diferenças entre tecnologias de impressão 3D (FDM, SLA, SLS)
- Compreender funcionamento das impressoras 3D
- Usar programas de modelagem 3D (Tinkercad, Fusion 360)
- Entender princípios de design para impressão 3D
- Compreender componentes fundamentais de um robô
- Programar e controlar robôs simples

CONTEÚDOS: Impressão 3D, Modelagem 3D, Robótica, Programação de Robôs

AVALIAÇÃO: Projetos de modelagem (40%), Funcionamento de robôs (40%), Apresentação final (20%)',
  NOW(),
  NOW()
)
ON CONFLICT (materia_id) DO UPDATE
SET conteudo = EXCLUDED.conteudo, atualizado_em = NOW();

-- ============================================================
-- UC 5: COMUNICAÇÃO ORAL E ESCRITA PARA O MUNDO DO TRABALHO (33h)
-- ============================================================
INSERT INTO public.ementas (materia_id, conteudo, criado_em, atualizado_em)
VALUES (
  (SELECT id FROM public.materia WHERE LOWER(nome) LIKE '%comunicacao%' LIMIT 1),
  'INTRODUÇÃO À COMUNICAÇÃO ORAL E ESCRITA PARA O MUNDO DO TRABALHO (33h)

OBJETIVO GERAL:
Desenvolver habilidades de comunicação oral e escrita essenciais para atuar de forma eficiente e profissional no ambiente corporativo.

CAPACIDADES A DESENVOLVER:
- Comunicar-se de forma clara, objetiva e respeitosa em contextos profissionais
- Produzir textos técnicos alinhados às exigências do mundo do trabalho
- Aplicar técnicas de comunicação interpessoal
- Apresentar-se profissionalmente em entrevistas e reuniões
- Utilizar ferramentas digitais para comunicação
- Compreender importância da comunicação não-verbal

CONTEÚDOS: Fundamentos de Comunicação, Comunicação Oral, Comunicação Escrita, Redação Técnica, Ferramentas Digitais, Comunicação Não-Verbal

AVALIAÇÃO: Apresentações orais (40%), Produção de textos (40%), Participação (20%)',
  NOW(),
  NOW()
)
ON CONFLICT (materia_id) DO UPDATE
SET conteudo = EXCLUDED.conteudo, atualizado_em = NOW();

-- ============================================================
-- UC 6: EXPLORAÇÃO DE CARREIRAS INDUSTRIAIS E TECNOLÓGICAS (36h)
-- ============================================================
INSERT INTO public.ementas (materia_id, conteudo, criado_em, atualizado_em)
VALUES (
  (SELECT id FROM public.materia WHERE LOWER(nome) LIKE '%carreira%' LIMIT 1),
  'EXPLORAÇÃO DE CARREIRAS INDUSTRIAIS E TECNOLÓGICAS (36h)

OBJETIVO GERAL:
Capacitar alunos a identificar e explorar oportunidades de carreira nas áreas industriais e tecnológicas, preparando-os para decisões informadas sobre seu futuro profissional.

CAPACIDADES A DESENVOLVER:
- Identificar perfis de carreira nas áreas industrial e tecnológica
- Planejar trajetórias profissionais de acordo com habilidades
- Compreender demandas do mercado de trabalho
- Reconhecer tendências tecnológicas emergentes (Indústria 4.0)
- Aplicar estratégias de pesquisa e networking
- Preparar currículo e marketing pessoal

CONTEÚDOS: Mercado de Trabalho, Funções e Cargos, Planejamento de Carreira, Busca de Oportunidades, Marketing Pessoal

AVALIAÇÃO: Pesquisa sobre carreira (30%), Currículo e portfólio (40%), Apresentação (30%)',
  NOW(),
  NOW()
)
ON CONFLICT (materia_id) DO UPDATE
SET conteudo = EXCLUDED.conteudo, atualizado_em = NOW();

-- ============================================================
-- UC 7: REFORÇO DE LINGUAGENS (63h)
-- ============================================================
INSERT INTO public.ementas (materia_id, conteudo, criado_em, atualizado_em)
VALUES (
  (SELECT id FROM public.materia WHERE LOWER(nome) LIKE '%linguagem%' LIMIT 1),
  'REFORÇO DE LINGUAGENS (63h)

OBJETIVO GERAL:
Desenvolver e aprimorar competências de leitura, escrita, interpretação e comunicação oral, fortalecendo base linguística para vida acadêmica, profissional e social.

CAPACIDADES A DESENVOLVER:
- Organizar informações de forma clara e coerente
- Desenvolver autonomia de estudo com estratégias de leitura e escrita
- Aplicar pensamento crítico na análise de textos
- Trabalhar em grupo em atividades de produção textual
- Comunicar-se de forma assertiva respeitando diferentes contextos
- Compreender e produzir diversos tipos de textos
- Dominar aspectos gramaticais e ortográficos

CONTEÚDOS: Leitura e Interpretação, Produção Textual, Gramática, Oralidade, Diversidade Textual

AVALIAÇÃO: Leituras (25%), Produções textuais (40%), Participação oral (20%), Testes de gramática (15%)',
  NOW(),
  NOW()
)
ON CONFLICT (materia_id) DO UPDATE
SET conteudo = EXCLUDED.conteudo, atualizado_em = NOW();

-- ============================================================
-- UC 8: REFORÇO MATEMÁTICA E RACIOCÍNIO LÓGICO (63h)
-- ============================================================
INSERT INTO public.ementas (materia_id, conteudo, criado_em, atualizado_em)
VALUES (
  (SELECT id FROM public.materia WHERE LOWER(nome) LIKE '%matematica%' OR LOWER(nome) LIKE '%raciocinio%' LIMIT 1),
  'REFORÇO MATEMÁTICA E RACIOCÍNIO LÓGICO (63h)

OBJETIVO GERAL:
Fortalecer conhecimentos matemáticos essenciais para vida acadêmica, profissional e cotidiana, desenvolvendo raciocínio lógico e capacidade de resolução de problemas.

CAPACIDADES A DESENVOLVER:
- Organizar informações numéricas e simbólicas de forma clara
- Desenvolver autonomia de estudo com estratégias para resolver problemas
- Aplicar pensamento crítico e lógico analisando situações
- Trabalhar em grupo resolvendo desafios matemáticos
- Comunicar raciocínios justificando procedimentos
- Persistir na resolução de problemas desenvolvendo resiliência
- Aplicar conceitos matemáticos em contextos reais

CONTEÚDOS: Operações Básicas, Frações/Decimais/Porcentagem, Proporcionalidade, Medidas e Grandezas, Raciocínio Lógico, Introdução à Álgebra, Tratamento da Informação

AVALIAÇÃO: Resolução de problemas (40%), Testes e provas (40%), Participação (20%)',
  NOW(),
  NOW()
)
ON CONFLICT (materia_id) DO UPDATE
SET conteudo = EXCLUDED.conteudo, atualizado_em = NOW();

-- ============================================================
-- Log de execução
-- ============================================================
-- Script executado com sucesso
-- 8 ementas foram inseridas ou atualizadas no banco de dados
-- Data: 2026-09-07
-- Programa: Rio do Sul Mais Tech - SENAI
