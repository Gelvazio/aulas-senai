# AULA 08 — Software de Escritório: Planilhas Eletrônicas

**Programa:** Educação para o Trabalho — SENAI
**UC:** Introdução à Tecnologia da Informação e Comunicação
**Duração:** 4 horas presenciais
**Ambiente:** Laboratório de informática
**Data:** ___/___/______

---

## Objetivos de Aprendizagem

Ao final desta aula, o aluno será capaz de:
- Identificar as funções básicas de uma planilha eletrônica e suas finalidades no trabalho;
- Operar linhas, colunas, células e endereços, com referências relativas e absolutas;
- Aplicar formatação de células (número, moeda, data, percentual, texto) e formatação condicional;
- Inserir fórmulas e funções básicas (SOMA, MÉDIA, MÁXIMO, MÍNIMO, CONT.SE, SE);
- Classificar e filtrar dados para responder a perguntas do trabalho;
- Construir tabelas e gráficos adequados ao tipo de informação;
- Configurar a página e imprimir uma planilha de forma legível.

> **Cobertura da ementa:** item 4.5 integral — funções básicas e suas finalidades; linhas,
> colunas e endereços de células; formatação de células; configuração de páginas; inserção
> de fórmulas básicas; classificação e filtragem de dados; gráficos, quadros e tabelas;
> impressão.
> **Ferramenta:** utilizar a planilha disponível no laboratório (Microsoft Excel,
> LibreOffice Calc ou Google Planilhas) — as fórmulas apresentadas são compatíveis entre elas.

---

## Conteúdo Programático

### 1. Para que serve uma planilha (20 min)

**Definição:** software que organiza dados em uma grade de linhas e colunas, permitindo
cálculo automático, análise e apresentação de informações.

**Usos reais no trabalho:**
controle de estoque, registro de produção, controle de horas, orçamento, lista de presença,
plano de manutenção, controle de EPIs, acompanhamento de indicadores, cronograma.

**A grande vantagem:**
> Na planilha, o **cálculo é uma fórmula, não um número digitado**. Quando o dado muda,
> o resultado se atualiza sozinho — e o histórico de como se chegou ao número fica visível.

### 2. Estrutura: Linhas, Colunas, Células e Endereços (30 min)

- **Coluna:** identificada por letra (A, B, C… AA, AB);
- **Linha:** identificada por número (1, 2, 3…);
- **Célula:** o cruzamento — `B4` é a célula da coluna B, linha 4;
- **Intervalo:** `A1:A10` (contíguo) e `A1;C1;E1` (células separadas);
- **Planilha (aba):** cada guia inferior; um arquivo pode ter várias;
- **Caixa de nome:** mostra e permite ir a um endereço;
- **Barra de fórmulas:** mostra o **conteúdo real** da célula (a fórmula, não o resultado).

**Operações essenciais:**
inserir e excluir linhas/colunas; ajustar largura e altura (duplo clique na divisória ajusta
automaticamente); ocultar e reexibir; **congelar painéis** (manter o cabeçalho visível ao
rolar); alça de preenchimento (arrastar o canto inferior direito para copiar ou criar sequências).

#### Referências relativas × absolutas

| Tipo | Escrita | Comportamento ao copiar |
|---|---|---|
| **Relativa** | `A1` | Ajusta linha e coluna |
| **Absoluta** | `$A$1` | Não muda |
| **Mista** | `A$1` ou `$A1` | Trava só linha ou só coluna |

A tecla **F4** alterna entre esses modos durante a digitação da fórmula.

**Exemplo:** para multiplicar vários valores por uma mesma taxa que está em `E1`, use
`=B2*$E$1` — assim a taxa não "escorrega" ao copiar a fórmula para baixo.

### 3. Formatação de Células (30 min)

**Formatos de número:**
Geral, Número (casas decimais), Moeda (R$), Contábil, Data, Hora, Percentual, Fração,
Texto, Personalizado.

**Atenção:**
> O formato **muda a exibição**, não o valor. `0,5` exibido como `50%` continua valendo 0,5
> no cálculo. E um número armazenado como **texto** não entra em conta — é a causa mais
> comum de "a soma não funciona".

**Formatação visual:** fonte, negrito, cor, preenchimento, bordas, mesclar células
(usar com moderação — mesclagem atrapalha classificação e filtro), alinhamento, quebra de
texto automática.

**Formatação condicional:** aplica cor conforme regra — por exemplo, estoque abaixo do mínimo
em vermelho, meta atingida em verde, escala de cores para desempenho. É a forma mais rápida
de fazer um dado crítico "saltar aos olhos".

### 4. Fórmulas e Funções Básicas (55 min)

**Toda fórmula começa com `=`.**

#### Operadores
`+` soma, `-` subtração, `*` multiplicação, `/` divisão, `^` potência,
`%` percentual, `&` concatenação de texto.

#### Funções essenciais

| Função | Sintaxe | Para que serve |
|---|---|---|
| **SOMA** | `=SOMA(B2:B20)` | Soma um intervalo |
| **MÉDIA** | `=MÉDIA(B2:B20)` | Média aritmética |
| **MÁXIMO / MÍNIMO** | `=MÁXIMO(B2:B20)` | Maior e menor valor |
| **CONT.NÚM** | `=CONT.NÚM(B2:B20)` | Conta células com números |
| **CONT.VALORES** | `=CONT.VALORES(A2:A20)` | Conta células não vazias |
| **CONT.SE** | `=CONT.SE(C2:C20;"Concluído")` | Conta conforme um critério |
| **SOMASE** | `=SOMASE(A2:A20;"Estamparia";B2:B20)` | Soma conforme um critério |
| **SE** | `=SE(B2<10;"Repor";"OK")` | Decisão condicional |
| **HOJE** | `=HOJE()` | Data atual |
| **ARRED** | `=ARRED(B2;2)` | Arredonda casas decimais |

#### A função SE em detalhe

`=SE(condição; valor_se_verdadeiro; valor_se_falso)`

Exemplo de controle de estoque:
`=SE(C2<=D2;"REPOR";"NORMAL")` — se a quantidade atual (C2) for menor ou igual ao estoque
mínimo (D2), exibe "REPOR".

#### Erros comuns e o que significam

| Erro | Causa provável |
|---|---|
| `#####` | Coluna estreita demais (não é erro de cálculo) |
| `#DIV/0!` | Divisão por zero ou por célula vazia |
| `#VALOR!` | Operação matemática com texto |
| `#NOME?` | Nome da função digitado errado |
| `#REF!` | A célula referenciada foi excluída |
| `#N/D` | Valor procurado não encontrado |

**Boas práticas:**
1. Nunca digite o resultado — use fórmula;
2. Coloque parâmetros (taxa, meta, preço) em células próprias e referencie-as;
3. Cabeçalho em uma única linha, sem células mescladas;
4. Uma informação por coluna; nada de "12 kg" na mesma célula do número;
5. Sem linhas em branco no meio da base de dados.

### 5. Classificação e Filtragem (30 min)

**Classificar (ordenar):** crescente, decrescente, por múltiplos níveis
(ex.: setor A→Z e, dentro dele, valor do maior para o menor).
> ⚠️ Selecione a **tabela inteira** antes de ordenar. Ordenar uma coluna isolada
> **embaralha os dados** e corrompe o registro.

**Filtrar:** exibe apenas as linhas que atendem a um critério, sem excluir as demais.
- Filtro por valor (marcar itens da lista);
- Filtro de texto (contém, começa com);
- Filtro de número (maior que, entre, 10 maiores);
- Filtro de data (este mês, entre datas);
- Filtro por cor (combina com formatação condicional).

**Subtotal e contagem na barra de status:** ao selecionar um intervalo, a barra inferior já
mostra soma, média e contagem — útil para conferência rápida.

### 6. Tabelas, Quadros e Gráficos (35 min)

**Formatar como tabela:** transforma o intervalo em uma tabela com filtros automáticos,
faixas alternadas e expansão automática de fórmulas ao inserir linhas.

**Escolha do gráfico segundo a pergunta:**

| Pergunta | Gráfico adequado |
|---|---|
| Quanto cada categoria produziu? | Colunas ou barras |
| Como evoluiu ao longo do tempo? | Linhas |
| Qual a participação de cada parte no total? | Pizza (poucas fatias) |
| Há relação entre duas variáveis? | Dispersão |
| Comparação acumulada por categoria | Colunas empilhadas |

**Elementos obrigatórios de um gráfico profissional:**
título que informa a conclusão, rótulos dos eixos com unidade, legenda quando há mais de uma
série, fonte dos dados e escala que não distorce a leitura.

**Erros a evitar:** pizza com muitas fatias; eixo que não começa em zero em gráfico de
colunas; excesso de cores; efeito 3D que dificulta a comparação.

### 7. Configuração de Página e Impressão (20 min)

- **Área de impressão:** definir o intervalo que será impresso;
- **Orientação e escala:** "Ajustar todas as colunas em uma página" resolve a maioria dos casos;
- **Repetir linhas de título** em todas as páginas (equivalente ao cabeçalho da tabela);
- **Cabeçalho e rodapé:** título, data, número de página;
- **Linhas de grade:** decidir se serão impressas;
- **Quebras de página** e visualização de quebras;
- **Visualizar antes de imprimir** — obrigatório em planilha, que costuma "vazar" de página.

---

## Estratégias de Ensino

1. **Construção conjunta da planilha**, célula a célula, com o professor no projetor.
2. **Erro proposital** — o professor provoca um `#VALOR!` e a turma diagnostica.
3. **Pergunta antes da fórmula** — sempre partir de uma pergunta do trabalho.
4. **Duplas produtivas** — um digita, outro confere; troca a cada 15 minutos.

---

## Atividades Práticas

### Atividade 1 (desplugada): "A Planilha no Papel" (25 min)

**Objetivo:** compreender a lógica de linhas, colunas e fórmulas antes do computador.

**Procedimento:**
1. Cada dupla recebe uma folha quadriculada com colunas A a F e linhas 1 a 12.
2. O professor dita os dados de um controle de estoque (item, unidade, quantidade atual,
   estoque mínimo, preço unitário).
3. A dupla escreve **a fórmula** que colocaria em cada célula de resultado — não o número:
   - valor total do item (`=C2*E2`);
   - valor total do estoque (`=SOMA(F2:F11)`);
   - situação do item (`=SE(C2<=D2;"REPOR";"NORMAL")`).
4. Trocam as folhas e conferem se as fórmulas estão corretas e nos endereços certos.
5. Discussão: por que digitar o resultado direto é um risco?

**Materiais:** folha quadriculada, lápis.

### Atividade 2 (prática): "Controle de Produção e Estoque" (60 min)

**Objetivo:** construir uma planilha funcional completa, com cálculo, filtro e gráfico.

**Procedimento — cada aluno no seu computador:**
1. Criar o arquivo `2026-09-XX_controle-estoque_<seunome>.xlsx` em `SENAI-TIC/AULA-08`.
2. **Aba `BASE`** com 15 itens e as colunas:
   `Código | Item | Setor | Qtd. Atual | Estoque Mínimo | Preço Unit. | Valor Total | Situação`
3. Formatar: cabeçalho em negrito com preenchimento, Preço e Valor Total em **moeda**,
   quantidades como **número inteiro**, painéis **congelados** na linha 1.
4. Fórmulas:
   - `Valor Total` = `=D2*F2`
   - `Situação` = `=SE(D2<=E2;"REPOR";"NORMAL")`
5. **Aba `RESUMO`** com:
   - `=SOMA()` do valor total do estoque;
   - `=MÉDIA()`, `=MÁXIMO()` e `=MÍNIMO()` do valor por item;
   - `=CONT.SE()` da quantidade de itens em situação "REPOR";
   - `=SOMASE()` do valor total por setor (um por setor);
   - uma célula de parâmetro com o **percentual de reajuste** e uma coluna de preço
     projetado usando referência **absoluta** (`=F2*(1+$B$1)`).
6. **Formatação condicional:** linhas com "REPOR" destacadas em vermelho.
7. **Classificar** a base por Setor (A→Z) e, dentro do setor, por Valor Total (maior→menor).
8. **Filtrar** e responder por escrito em uma caixa de texto:
   a. Quais itens estão em situação de reposição?
   b. Qual setor concentra o maior valor em estoque?
   c. Quantos itens custam mais de R$ 100,00 por unidade?
9. **Gráfico de colunas:** valor total por setor, com título, rótulos e fonte dos dados.
10. **Configurar impressão:** orientação paisagem, ajustar em uma página, repetir a linha de
    título, rodapé com o nome do aluno e número de página. Visualizar e exportar em PDF.

**Entrega:** o arquivo `.xlsx` e o PDF da visualização de impressão.

**Materiais:** computador com planilha eletrônica, roteiro impresso, lista de itens fornecida
pelo professor.

---

## Recursos Necessários

- Laboratório com um computador por aluno e planilha eletrônica instalada;
- Roteiro impresso com a sintaxe das funções;
- Lista de dados de estoque preparada pelo professor;
- Folhas quadriculadas para a Atividade 1;
- Projetor multimídia.

---

## Avaliação Formativa

**Observação durante as atividades:**
- O aluno usa fórmula em vez de digitar resultados?
- Emprega referência absoluta quando necessário?
- Seleciona a tabela inteira antes de classificar?
- Escolhe o tipo de gráfico coerente com a pergunta?
- Confere a visualização antes de imprimir?

**Perguntas de verificação:**
1. Qual a diferença entre `A1` e `$A$1`? Quando cada um é necessário?
2. O que significa `#####` em uma célula? E `#VALOR!`?
3. Por que classificar apenas uma coluna é perigoso?
4. Qual a diferença entre classificar e filtrar?
5. Escreva a fórmula que conta quantos itens estão com situação "REPOR".
6. Que tipo de gráfico usar para mostrar a evolução da produção mês a mês? Por quê?

---

## Tarefa de Casa

**Projeto:** criar uma planilha de **controle pessoal** (gastos do mês, horas de estudo ou
consumo de combustível) com no mínimo: 10 linhas de dados, 3 fórmulas diferentes, uma
formatação condicional e um gráfico com título e fonte.

**Tempo estimado:** 40 min

---

## Observações do Professor

_Espaço para anotações: funções que exigiram mais explicação, alunos com dificuldade em
referência absoluta, diferenças de separador de argumentos entre os softwares (`;` ou `,`)._

---

**Próxima aula:** AULA 09 — Apresentações e Projeto Integrador
