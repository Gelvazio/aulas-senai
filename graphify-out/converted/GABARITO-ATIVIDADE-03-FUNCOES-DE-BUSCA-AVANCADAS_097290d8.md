<!-- converted from GABARITO-ATIVIDADE-03-FUNCOES-DE-BUSCA-AVANCADAS.docx -->






























GABARITO COMPLETO
| SENAI

Serviço Nacional
de Aprendizagem
Industrial

Santa Catarina | GABARITO - FUNCOES DE BUSCA AVANCADAS






TechBrazil - Sao Paulo
Voce trabalha no RH da TechBrazil, empresa de e-commerce em SP.
Precisa criar relatorio mensal de comissoes cruzando dados de:
- Vendedores: ID, Nome, Salario Base, Departamento
- Faturamento: ID, Mes, Valor Faturado
- Comissoes: Faixas de faturamento com taxas (3%, 5%, 8%)

Use PROCV, INDICE/CORRESPONDENCIA e SE aninhado para calcular comissoes. | Desempenho
_____ |
| --- | --- | --- |
| ITEM 1
CAPACIDADE: Estruturar tabela para PROCV
Contexto: ID deve estar na PRIMEIRA coluna. Estrutura: ID | Nome | Salário | Departamento
Comando: Por que ID precisa ser a 1ª coluna?
Alternativas:
A) Esteticamente melhor  ✅
b) PROCV busca a partir da 1ª coluna
c) Por tradição
d) Não importa a posição
e) Excel exige assim |
| --- |
| ITEM 2
CAPACIDADE: Identificar número de coluna em PROCV
Contexto: Tabela: Col 1=ID, Col 2=Nome, Col 3=Salário, Col 4=Depto. Buscar Nome
Comando: Qual número de coluna em PROCV?
Alternativas:
A) 1  ✅
b) 2
c) 3
d) 4
e) 0 |
| --- |
| ITEM 3
CAPACIDADE: Aplicar PROCV correto
Contexto: Procurar ID 102 e retornar Nome (coluna 2)
Comando: =PROCV(A2;Vendedores!A:D;X;FALSO). X é:
Alternativas:
A) 1  ✅
b) 2
c) 3
d) 4
e) 0 |
| --- |
| ITEM 4
CAPACIDADE: Reconhecer erro #N/D em PROCV
Contexto: ID 999 não existe na tabela de vendedores
Comando: PROCV retorna qual erro?
Alternativas:
A) #DIV/0!  ✅
b) #N/D
c) #VALUE!
d) #REF!
e) Nenhum |
| --- |
| ITEM 5
CAPACIDADE: Usar SEERRO para tratamento de erro
Contexto: Para evitar #N/D e mostrar "Não encontrado"
Comando: =SEERRO(PROCV(...), X). X é:
Alternativas:
A) "Erro"  ✅
b) "Não encontrado"
c) 0
d) ""
e) FALSE |
| --- |
| ITEM 6
CAPACIDADE: Aplicar ÍNDICE e CORRESPONDÊNCIA
Contexto: CORRESPONDÊNCIA encontra linha. ÍNDICE extrai valor. Buscar departamento de ID 102
Comando: =ÍNDICE(Col_Depto; CORRESPONDÊNCIA(102; Col_ID; 0))
Alternativas:
A) Retorna ID  ✅
b) Retorna Departamento
c) Retorna Erro
d) Retorna Nome
e) Retorna Salário |
| --- |
| ITEM 7
CAPACIDADE: Entender CORRESPONDÊNCIA com 0 ou 1
Contexto: CORRESPONDÊNCIA(..., ..., 0) = busca EXATA. CORRESPONDÊNCIA(..., ..., 1) = busca maior/igual
Comando: Para faturamento em tabela de comissões, usar:
Alternativas:
A) 0 (exato)  ✅
b) 1 (maior/igual)
c) -1
d) Não importa
e) 2 |
| --- |
| ITEM 8
CAPACIDADE: Aplicar SE simples para condição
Contexto: Se faturamento < 15000, comissão = 3%
Comando: =SE(D2<15000; X; Y). X e Y são:
Alternativas:
A) "Sim" e "Não"  ✅
b) 0.03 e 0.05
c) TRUE e FALSE
d) D2*0.03 e D2*0.05
e) "Baixo" e "Alto" |
| --- |
| ITEM 9
CAPACIDADE: SE aninhado para múltiplas faixas
Contexto: <15k=3%, 15-18k=5%, >18k=8%
Comando: =SE(D2<15000; 0.03; SE(D2<18000; X; Y)). X e Y são:
Alternativas:
A) 0.03 e 0.08  ✅
b) 0.05 e 0.08
c) 0.08 e 0.05
d) 0.03 e 0.05
e) 0.08 e 0.03 |
| --- |
| ITEM 10
CAPACIDADE: Calcular comissão com fórmula integrada
Contexto: ID 102, faturamento R$ 18.500, taxa aplicável 5%
Comando: Comissão = R$ 18.500 × 0,05 = ?
Alternativas:
A) R$ 925  ✅
b) R$ 950
c) R$ 850
d) R$ 1.000
e) R$ 1.100 |
| --- |
| ITEM 11
CAPACIDADE: Integrar PROCV + SE para busca condicional
Contexto: Buscar salário (PROCV) e depois aplicar aumento com SE
Comando: Qual é a ordem correta?
Alternativas:
A) SE primeiro, depois PROCV  ✅
b) PROCV primeiro, depois SE
c) PROCV dentro de SE
d) Não importa
e) Não se pode combinar |
| --- |
| ITEM 12
CAPACIDADE: Validar dados com comparação lógica
Contexto: Após PROCV, verificar se valor > 0 (válido)
Comando: =SE(PROCV(...)>0; "OK"; "ERRO")
Alternativas:
A) Retorna "OK" se valor > 0  ✅
b) Retorna "ERRO" sempre
c) Retorna número
d) Retorna #N/D
e) Não funciona |
| --- |
| ITEM 13
CAPACIDADE: Criar resumo gerencial com múltiplas funções
Contexto: Total faturado, maior venda, menor, média, total comissão
Comando: Qual sequência resume melhor?
Alternativas:
A) SOMA, MÁXIMO, MÍNIMO, MÉDIA, SOMA  ✅
b) MÁXIMO primeiro
c) MÉDIA primeiro
d) SOMA, SOMA, SOMA
e) Não precisa resumir |
| --- |
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ✅ A | ✅ A | ✅ A | ✅ A | ✅ A | ✅ A | ✅ A | ✅ A | ✅ A | ✅ A | ✅ A | ✅ A | ✅ A |