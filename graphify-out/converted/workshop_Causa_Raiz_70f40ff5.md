<!-- converted from workshop_Causa_Raiz.docx -->



MATERIAL DE APOIO ATIVIDADE “WORKSHOP”
Prezados estudantes,
Após o "Tribunal de Bugs", já temos um consenso sobre qual é o nosso bug mais crítico. Gastamos nossa energia para provar o que está quebrado e qual o impacto disso para o negócio.
Agora, como profissionais de qualidade, nosso papel muda. Não basta apontar o incêndio; precisamos descobrir como ele começou, para evitar que aconteça novamente. Corrigir o sintoma (o bug) é tarefa do desenvolvedor. Identificar a causa raiz (o porquê do bug) é nossa responsabilidade como analistas de teste. É isso que garante a melhoria contínua do processo.
Para nos guiar nesta investigação, usaremos uma das ferramentas mais clássicas da Gestão da Qualidade: o Diagrama de Ishikawa, também conhecido como "Espinha de Peixe".
Vamos estruturar nosso workshop da seguinte forma:

### Estrutura do Workshop: Análise de Causa Raiz (RCA) com Diagrama de Ishikawa
Duração Estimada: 45-50 minutos
Objetivo: Identificar coletivamente as possíveis causas raízes de um bug complexo, utilizando o Diagrama de Ishikawa para organizar nosso brainstorming.

Etapa 1: Preparação do Diagrama (O "Saber") (10 minutos)
Definição do Problema (A "Cabeça do Peixe"):
Começarei desenhando a "cabeça" do peixe no quadro (ou em uma ferramenta digital).
Nossa "cabeça" é o problema que acabamos de priorizar no "Tribunal". Por exemplo: "Bug Crítico: Erro 500 ao aplicar cupom de desconto no checkout."
Definição das Categorias (As "Espinhas"):
Conforme nosso plano, usaremos as categorias clássicas da indústria, mas vou adaptá-las para o nosso contexto de Desenvolvimento de Sistemas:
Máquina: (Nosso "Ambiente") -> Refere-se à infraestrutura. Ex: Servidores, versões de banco de dados, redes, API de terceiros.
Método: (Nosso "Processo") -> Refere-se a como o trabalho foi feito. Ex: O requisito estava claro? O code review foi feito? O teste unitário foi escrito?
Mão de Obra: (Nossas "Pessoas") -> Fator humano. Ex: Falta de conhecimento na regra de negócio? Pressa? Cansaço? Má comunicação entre as equipes?
Material: (Nosso "Código/Dados") -> Os "insumos" do dev. Ex: Biblioteca desatualizada? Dados de teste (massa de dados) ruins ou inexistentes? Código legado?
Medição: (Nossos "Testes") -> Como medimos a qualidade? Ex: A cobertura de teste automatizado era baixa? O teste manual não previu esse cenário?
Etapa 2: Brainstorming Guiado (O "Saber Fazer" em Conjunto) (25 minutos)
Esta é a parte central da oficina. Como mediador, vou guiar a turma ("em conjunto") para preencher o diagrama.
Regra Principal: Nesta fase, não há ideias ruins. O objetivo é levantar o máximo de hipóteses possível.
O "Jogo dos 5 Porquês": Para cada hipótese, vou instigá-los a perguntar "Por quê?" até chegarmos a uma causa que não seja um sintoma.
Exemplo:
Hipótese: "O bug aconteceu porque o cupom era inválido."
Docente: "Por quê?"
Turma: "Porque o banco de dados disse que ele não existia."
Docente: "Por quê?"
Turma: "Porque o teste só usou cupons válidos, e o código não sabe lidar com um cupom nulo ou inválido." (CAUSA RAÍZ na espinha "Método" ou "Medição"!)
Mediação Categoria por Categoria:
"Ok, turma, vamos focar na espinha Máquina (Ambiente). O que em nosso ambiente poderia ter causado esse erro 500?" (Alunos podem sugerir: "A API do gateway de pagamento estava fora do ar", "O banco de dados de produção é diferente do de teste").
"Excelente. Agora, e sobre o Método (Processo)? Faltou alguma etapa no nosso desenvolvimento?" (Alunos: "O requisito não especificava o que fazer com cupons expirados", "Não teve revisão de código dessa funcionalidade").
(Continuaremos assim para todas as 5 categorias).
Etapa 3: Análise e Síntese (O "Saber Ser" e a "Tomada de Decisão") (10-15 minutos)
Análise Visual: Ao final, teremos um diagrama completo no quadro, cheio de hipóteses.
Votação e Priorização:
"Agora, olhem para o quadro. Onde vocês acham que estão as causas mais prováveis?"
Vou distribuir 3 "votos" (pontos com caneta) para cada equipe. As equipes devem votar nas causas que consideram as raízes reais do problema.
Definindo o Plano de Ação:
As 2 ou 3 causas mais votadas são nossas causas raízes prováveis.
Reflexão final (Docente): "Percebam que a correção do bug (ex: adicionar um if (cupom != null)) é simples. Mas o nosso Plano de Ação, baseado nesta análise, é muito maior. Ele agora inclui:
Ação Corretiva (Curto Prazo): Corrigir o código para tratar cupons nulos.
Ação Preventiva (Longo Prazo): Criar novos testes unitários que sempre validam cupons inválidos (para a espinha 'Medição').
Ação de Melhoria (Processo): Garantir que nenhuma funcionalidade de checkout suba sem um teste de cenário negativo (para a espinha 'Método')."
Com isso, saímos de uma simples "caça aos bugs" para uma verdadeira Análise de Qualidade, focada na prevenção e na melhoria contínua, que são pilares da nossa metodologia.

| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | ATIVIDADE | Desempenho |
| --- | --- | --- |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Data: |  |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Docente: |  |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Curso Técnico em Desenvolvimento de Sistemas |  |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Unidade Curricular: Testes de Sistemas |  |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Turma: |  |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Estudante: |  |