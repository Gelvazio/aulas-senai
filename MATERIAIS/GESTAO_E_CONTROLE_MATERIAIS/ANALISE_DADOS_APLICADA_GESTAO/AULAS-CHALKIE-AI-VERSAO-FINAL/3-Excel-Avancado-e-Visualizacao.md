# 3 Excel Avançado e Visualização de Dados

**Origem:** 3-Excel-Avançado-e-Visualização-de-Dados.pptx

---

## Slide 1

Excel Avançado e Visualização de Dados

Domine buscas, lógica condicional, tabelas dinâmicas e gráficos estratégicos.

---

## Slide 2

O Desafio dos Dados Ocultos

Imagine procurar um código em 50 mil linhas manualmente. Você gastaria dias inteiros! Como analistas fazem isso em menos de um segundo?

---

## Slide 3

Objetivos da Nossa Aula

METAS DE APRENDIZAGEM

Nesta aula de análise aplicada, você irá desenvolver competências essenciais:
Automatizar buscas utilizando PROCV, PROCH e a dupla ÍNDICE e CORRESPONDÊNCIA.
Estruturar lógicas avançadas com funções condicionais aninhadas, SOMASE, CONT.SE e SEERRO.
Sintetizar relatórios gerenciais construindo Tabelas Dinâmicas, segmentadores e gráficos ideais.

---

## Slide 4

Vocabulário Essencial da Aula

PROCV - Busca vertical de valores em colunas específicas.

Aninhamento - Técnica de inserir uma função dentro de outra.

Tabela Dinâmica - Ferramenta para resumo e análise multidimensional.

Segmentação - Filtro visual interativo para relatórios dinâmicos.

---

## Slide 5

Revisão: Fundamentos do Excel

RECAPITULAÇÃO

Na aula anterior, aprendemos como operar com referências relativas (A1) e referências absolutas ($A$1), fundamentais para travar células ao arrastar fórmulas. Também estruturamos listas com validação de dados para evitar erros de digitação.

🧠

Lembre-se
O cifrão trava linha e coluna, garantindo consistência matemática nas fórmulas.

---

## Slide 6

Quiz Rápido de Aquecimento

Pergunta 1:
Qual caractere transforma uma referência de célula relativa em absoluta?

Pergunta 2:
Qual recurso impede que usuários digitem dados inválidos em uma célula?

Pergunta 3:
Para que serve a função SE básica aprendida na aula anterior?

---

## Slide 7

Quiz Rápido de Aquecimento

Resposta 1:
O símbolo de cifrão ($).

Resposta 2:
Validação de dados.

Resposta 3:
Avaliar uma condição lógica e retornar valores para verdadeiro ou falso.

✅

---

## Slide 8

Busca Vertical com PROCV

FUNÇÕES DE PROCURA

A função PROCV procura um código na primeira coluna à esquerda de uma matriz e retorna o conteúdo correspondente de outra coluna da mesma linha.
Sua sintaxe padrão é: .

🔑

Ponto-chave
Use SEMPRE FALSO ou 0 no quarto argumento para obter busca exata.

---

## Slide 9

PROCV em Operação Prática

Estrutura da Fórmula
Ao cadastrar o produto Cod-102, buscamos seu valor unitário na tabela :
O número 3 indica que o preço está na terceira coluna da matriz selecionada.

⚠️

Atenção
A chave procurada DEVE estar obrigatoriamente na PRIMEIRA coluna da matriz selecionada, senão a busca falhará.

Se a tabela mudar de lugar, utilize referências absolutas com  para manter a pesquisa estável.

---

## Slide 10

Busca Horizontal com PROCH

FUNÇÕES DE PROCURA

Quando a base está disposta horizontalmente em linhas, usamos o PROCH.
Ele localiza a chave na primeira linha da matriz e extrai a informação da linha correspondente indicada pelo índice.

🔍

Exemplo
=PROCH("Meta"; A1:Z4; 2; FALSO) retorna o valor situado na linha 2.

---

## Slide 11

Dupla Flexível: ÍNDICE e CORRESPONDÊNCIA

A Limitação do PROCV
O PROCV só enxerga colunas à direita da chave. Se a chave estiver à direita do resultado, o PROCV não funciona.

A Combinação Perfeita
CORRESPONDÊNCIA: descobre o número da linha.
ÍNDICE: busca o dado em qualquer coluna.
Fórmula combinada:

🔑

Ponto-chave
ÍNDICE e CORRESPONDÊNCIA buscam em qualquer direção, inclusive para a esquerda.

---

## Slide 12

Verificando Funções de Procura

Qual é a principal vantagem de usar ÍNDICE com CORRESPONDÊNCIA em vez de PROCV?

1.

Executa cálculos matemáticos de soma automaticamente.

2.

Só funciona com tabelas formatadas em ordem alfabética estrita.

3.

Permite retornar dados situados à esquerda da coluna de pesquisa.

4.

Dispensa a necessidade de indicar qualquer matriz de busca.

---

## Slide 13

Verificando Funções de Procura

Qual é a principal vantagem de usar ÍNDICE com CORRESPONDÊNCIA em vez de PROCV?

1.

Executa cálculos matemáticos de soma automaticamente.

2.

Só funciona com tabelas formatadas em ordem alfabética estrita.

3.

Permite retornar dados situados à esquerda da coluna de pesquisa.

4.

Dispensa a necessidade de indicar qualquer matriz de busca.

✅

✓

---

## Slide 14

Lógica Condicional com SE Aninhado

ESTRUTURAS CONDICIONAIS

Quando um teste lógico simples não basta, inserimos uma nova função SE dentro do argumento falso de outra. Essa técnica é o aninhamento.
Permite classificar múltiplas faixas de notas, faixas etárias ou comissões de vendas.

🔍

Exemplo
=SE(B2>=90; "Excelente"; SE(B2>=70; "Bom"; "Reforço"))

---

## Slide 15

Contagem e Soma com Critérios

CONT.SE
Conta quantas células atendem a um critério específico no intervalo.
Ideal para contar estoques críticos ou pedidos concluídos.

SOMASE
Soma os valores que correspondem ao filtro estipulado.
Soma os valores de B2:B50 apenas onde a região em A2:A50 for 'Sul'.

---

## Slide 16

Tratamento de Erros com SEERRO

ESTRUTURAS CONDICIONAIS

Quando o PROCV não encontra uma correspondência, exibe erros desagradáveis como  ou .
A função SEERRO intercepta essas falhas e exibe uma mensagem amigável ou o número zero.

🔑

Ponto-chave
=SEERRO(PROCV(A2; D:E; 2; FALSO); "Não localizado")

---

## Slide 17

Checando o Tratamento de Erros

A função SEERRO impede que uma planilha apresente o erro #N/D ao realizar buscas sem correspondência.

👍 VERDADEIRO

👎 FALSO

🤔 Prepare-se para explicar o seu raciocínio.

---

## Slide 18

Checando o Tratamento de Erros

A função SEERRO impede que uma planilha apresente o erro #N/D ao realizar buscas sem correspondência.

👍 VERDADEIRO

👎 FALSO

✅

🔑

Por que é isso?
O SEERRO captura o erro e permite exibir um texto amigável ou valor padrão definido.

✓

---

## Slide 19

Filtragem Automática e Avançada

EXPLORAÇÃO DE BASES

Os filtros automáticos adicionam menus nos cabeçalhos para isolar segmentos rapidamente.
Já o Filtro Avançado permite aplicar critérios lógicos múltiplos (E / OU) configurados em intervalos externos, além de extrair listas sem repetição.

🧠

Lembre-se
Critérios na mesma linha operam como 'E'; em linhas diferentes operam como 'OU'.

---

## Slide 20

Introdução às Tabelas Dinâmicas

A Tabela Dinâmica é o recurso mais poderoso do Excel para sintetizar milhões de dados sem escrever fórmulas complexas.

Linhas e Colunas
Definem os eixos de agrupamento e categorias, como Departamentos, Vendedores ou Cidades.

Valores e Filtros
O campo Valores aplica cálculos automáticos (soma, média, contagem), enquanto Filtros recortam a análise.

🤯

Curiosidade
Você pode alterar uma análise inteira em segundos apenas arrastando campos com o mouse!

---

## Slide 21

Construindo uma Tabela Dinâmica

Selecione qualquer célula do banco de dados contínuo.

Acesse Inserir e clique em Tabela Dinâmica.

Arraste as categorias desejadas para Linhas e Colunas.

Arraste a métrica numérica para o quadrante Valores.

---

## Slide 22

Agrupamento em Tabelas Dinâmicas

EXPLORAÇÃO DE BASES

Bases operacionais contêm milhares de datas pontuais. A Tabela Dinâmica permite agrupar datas automaticamente em meses, trimestres e anos.
Também é possível agrupar faixas numéricas de salários ou faturamentos para criar histogramas gerenciais com precisão.

🔑

Ponto-chave
O agrupamento temporal revela tendências sazonais imediatas para a tomada de decisão.

---

## Slide 23

Segmentação de Dados Interativa

EXPLORAÇÃO DE BASES

A Segmentação de Dados substitui os menus suspensos tradicionais por botões clicáveis elegantes e interativos.
Permite que qualquer gestor filtre a tabela dinâmica instantaneamente, observando o comportamento dos indicadores em tempo real.

🧠

Lembre-se
Uma única segmentação pode ser conectada a várias tabelas dinâmicas ao mesmo tempo.

---

## Slide 24

Ordem de Criação de Dinâmicas

Ordene os passos para criar uma Tabela Dinâmica com segmentação interativa:

Adicionar a Segmentação de Dados para filtragem visual interativa.

Distribuir os campos nos quadrantes de Linhas, Colunas e Valores.

Garantir cabeçalhos claros e selecionar o intervalo da base de dados.

Inserir a Tabela Dinâmica em uma nova planilha de relatório.

---

## Slide 25

Ordem de Criação de Dinâmicas

Ordene os passos para criar uma Tabela Dinâmica com segmentação interativa:

Adicionar a Segmentação de Dados para filtragem visual interativa.

Distribuir os campos nos quadrantes de Linhas, Colunas e Valores.

Garantir cabeçalhos claros e selecionar o intervalo da base de dados.

Inserir a Tabela Dinâmica em uma nova planilha de relatório.

✅

1

2

3

4

---

## Slide 26

A Arte da Visualização de Dados

VISUALIZAÇÃO DE DADOS

Um gráfico não é apenas um desenho bonito: ele é uma ferramenta de comunicação matemática.
Escolher o tipo errado de gráfico confunde o leitor e pode induzir gestores a decisões desastrosas. Cada padrão de dados exige um tipo visual específico.

---

## Slide 27

O Gráfico Certo para Cada Pergunta

Colunas ou Barras
Perfeitos para comparar quantidades discretas entre categorias distintas (produtos, filiais, funcionários).

Linhas Contínuas
Ideais para ilustrar evolução contínua no tempo: séries históricas, faturamento mensal e tendências.

---

## Slide 28

Setores e Dispersão em Análise

Setores (Pizza)
Mostram a composição de partes de um todo (100%). Use apenas para no máximo 4 ou 5 fatias evidentes.

Gráfico de Dispersão
Revela a correlação matemática entre duas variáveis numéricas contínuas (ex: preço versus volume vendido).

---

## Slide 29

Gráficos Combinados e Eixo Duplo

VISUALIZAÇÃO DE DADOS

Como comparar métricas de grandezas diferentes, como Faturamento em Reais (milhões) e Margem de Lucro (percentual)?
Criamos um gráfico combinado utilizando colunas para o faturamento e uma linha com eixo secundário para o percentual.

🔑

Ponto-chave
O eixo secundário evita que valores pequenos fiquem invisíveis rente à linha zero.

---

## Slide 30

Formatação Limpa de Relatórios

VISUALIZAÇÃO DE DADOS

Em análise executiva, menos é mais:
Elimine linhas de grade desnecessárias e bordas pesadas.
Adicione rótulos de dados diretos nas barras.
Use títulos informativos que explicam a conclusão do gráfico, e não apenas o tema.

⚠️

Atenção
Evite gráficos 3D: eles distorcem ângulos geométricos e dificultam a leitura.

---

## Slide 31

Escolha do Gráfico Correto

Qual é o tipo de gráfico mais recomendado para exibir a evolução das despesas de uma empresa ao longo dos 12 meses do ano?

1.

Gráfico de Linhas.

2.

Gráfico de Dispersão sem linhas.

3.

Gráfico de Setores (Pizza).

4.

Gráfico de Radar.

---

## Slide 32

Escolha do Gráfico Correto

Qual é o tipo de gráfico mais recomendado para exibir a evolução das despesas de uma empresa ao longo dos 12 meses do ano?

1.

Gráfico de Linhas.

2.

Gráfico de Dispersão sem linhas.

3.

Gráfico de Setores (Pizza).

4.

Gráfico de Radar.

✅

✓

---

## Slide 33

Segurança e Proteção de Células

SEGURANÇA E INTEGRIDADE

Após criar fórmulas, proteja a planilha para evitar que usuários apaguem seu trabalho. Por padrão, todas as células vêm 'Bloqueadas', mas essa trava só atua ao ativar a Proteção da Planilha.

🧠

Lembre-se
Desbloqueie células de entrada de dados antes de ativar a proteção.

---

## Slide 34

Fluxo Seguro de Bloqueio

Selecione as células que o usuário PODE editar livremente.

Abra Formatar Células > Proteção e desmarque 'Bloqueadas'.

Acesse a guia Revisão e clique em Proteger Planilha.

Defina uma senha e trave a estrutura de fórmulas.

---

## Slide 35

Protegendo Pastas de Trabalho

SEGURANÇA E INTEGRIDADE

Além de proteger as células, podemos aplicar a Proteção da Pasta de Trabalho.
Esse recurso impede que terceiros excluam, renomeiem, ocultem ou insiram novas abas na planilha, preservando o modelo de gestão contra adulterações acidentais.

🔑

Ponto-chave
Garante que a navegação do seu relatório permaneça intacta.

---

## Slide 36

Cruzando Dados: Vendas, RH e Estoque

Em empresas reais, as informações ficam espalhadas em diferentes setores. Um bom analista cruza essas pontas para gerar inteligência.

Vendas e Estoque
Cruzamos o ID do produto vendido com a tabela de estoque via PROCV para descontar unidades e alertar reposição mínima.

Vendas e RH
Buscamos o nome do vendedor e sua filial com ÍNDICE/CORRESPONDÊNCIA para calcular comissões escalonadas usando SE aninhado.

---

## Slide 37

Debate: Integridade e Tomada de Decisão

Se um erro de PROCV resultar em #N/D em 10% dos pedidos de uma empresa e o analista ignorar a mensagem, que impactos financeiros e operacionais isso causará na reposição de estoque e pagamento de comissões?

---

## Slide 38

Debate: Integridade e Tomada de Decisão

Você poderia ter dito...
O cálculo de estoque ficará defasado, causando falta de produtos.
Vendedores receberão menos, gerando conflitos trabalhistas.
Relatórios apresentarão faturamento subestimado, prejudicando decisões.

✅

---

## Slide 39

Exercício Prático Integrado

Use PROCV ou ÍNDICE/CORRESPONDÊNCIA para unir dados de Vendas, Produtos e RH.
Calcule comissão com SE aninhado: 5% (meta), 8% (superou 20%) ou 2% (falha).
Use SEERRO para tratar códigos inexistentes nas buscas.
Crie Tabela Dinâmica do faturamento por vendedor e um Gráfico de Colunas.

---

## Slide 40

Atividade Avaliativa 3: Estudo de Caso

Um analista precisa calcular o bônus dos supervisores de loja. O bônus depende da cidade da filial (Coluna A) e do faturamento (Coluna B). Caso o código da loja não seja encontrado na matriz de filiais, o sistema deve registrar 'Loja Não Cadastrada'. Qual conjunto de ferramentas do Excel resolve esse desafio perfeitamente?

1.

Apenas formatação condicional com cores graduais sem fórmulas adicionais.

2.

Gráfico de setores 3D aplicado diretamente sobre os dados brutos sem tratamento.

3.

PROCV envolvido por SEERRO para localizar a filial, combinado com SE aninhado para faixas de bônus.

4.

Filtro automático simples com exclusão manual de linhas com erros.

---

## Slide 41

Atividade Avaliativa 3: Estudo de Caso

Um analista precisa calcular o bônus dos supervisores de loja. O bônus depende da cidade da filial (Coluna A) e do faturamento (Coluna B). Caso o código da loja não seja encontrado na matriz de filiais, o sistema deve registrar 'Loja Não Cadastrada'. Qual conjunto de ferramentas do Excel resolve esse desafio perfeitamente?

1.

Apenas formatação condicional com cores graduais sem fórmulas adicionais.

2.

Gráfico de setores 3D aplicado diretamente sobre os dados brutos sem tratamento.

3.

PROCV envolvido por SEERRO para localizar a filial, combinado com SE aninhado para faixas de bônus.

4.

Filtro automático simples com exclusão manual de linhas com erros.

✅

✓

---

## Slide 42

Síntese e Próxima Aula

REVISÃO FINAL

Hoje você dominou buscas dinâmicas, fórmulas lógicas com tratamento de falhas, tabelas dinâmicas e visualização executiva.
Na próxima aula, integraremos todos esses conhecimentos no nosso grande desafio: a construção de Dashboards Executivos Interativos.

🧠

Lembre-se
Dados bem tratados e visualmente claros transformam informações operacionais em decisões estratégicas.

---

