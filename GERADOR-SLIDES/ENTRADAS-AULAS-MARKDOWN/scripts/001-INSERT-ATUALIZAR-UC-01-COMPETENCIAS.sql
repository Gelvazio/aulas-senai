-- UC 1: COMPETÊNCIAS SOCIOEMOCIONAIS E EMPREENDEDORISMO
-- Rio do Sul Mais Tech - SENAI
-- Data: 2026-09-07

-- Inserir ou atualizar ementa da UC 1
INSERT INTO public.ementas (materia_id, conteudo, criado_em)
SELECT
  m.id,
  'COMPETÊNCIAS SOCIOEMOCIONAIS E EMPREENDEDORISMO (36h)

OBJETIVO GERAL:
Proporcionar aos alunos uma formação integral que os capacite não apenas tecnicamente, mas também emocionalmente, para atuar com mais segurança e assertividade no mercado de trabalho ou na criação de seus próprios projetos empreendedores.

CAPACIDADES A DESENVOLVER:
- Identificar os tipos de negócios existentes em nossa economia e reconhecer os pontos críticos de uma negociação
- Identificar e compreender o perfil das pessoas empreendedoras
- Adotar comportamento ético no exercício das atividades frente ao mercado
- Reconhecer as virtudes essenciais para empreendedores de sucesso
- Aplicar conceitos de sustentabilidade e responsabilidade ambiental

CONTEÚDOS PROGRAMÁTICOS:
- SUSTENTABILIDADE: 5R''s da economia circular; Coleta seletiva; Ciclo da água; Agenda ambiental de administração pública; Legislação brasileira
- EMPREENDEDORISMO: Conceito de empreendedor; Empreendimentos e oportunidades; Plano de negócios; Micro e pequenas empresas; Planejamento estratégico; Intraempreendedorismo
- ÉTICA E VALORES: Comportamento ético; Negociação consciente; Virtudes profissionais; Responsabilidade social

ESTRATÉGIAS DE ENSINO:
- Aulas expositivas com casos de sucesso de empreendedores locais
- Atividades práticas de elaboração de plano de negócios
- Dinâmicas de grupo sobre ética profissional
- Visitação a pequenas empresas/empreendimentos da região

AVALIAÇÃO:
- Participação em aulas (40%)
- Elaboração de plano de negócios (40%)
- Apresentação de projeto (20%)',
  NOW()
FROM public.materia m
WHERE LOWER(m.nome) LIKE ''%competencia%'' OR LOWER(m.nome) LIKE ''%empreendedorismo%''
  AND NOT EXISTS (
    SELECT 1 FROM public.ementas e
    WHERE e.materia_id = m.id
  )
ON CONFLICT (materia_id) DO UPDATE
SET conteudo = EXCLUDED.conteudo, atualizado_em = NOW();
