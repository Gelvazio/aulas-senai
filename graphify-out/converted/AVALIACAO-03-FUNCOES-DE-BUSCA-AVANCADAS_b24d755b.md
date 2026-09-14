<!-- converted from AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS.docx -->


AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS

ITEM 1
CAPACIDADE: Criar tabela de Vendedores com ID, Nome e Salário

Contexto: 5 vendedores: ID 101 (João, 2500), 102 (Maria, 2800), 103 (Pedro, 3000), 104 (Ana, 2600), 105 (Carlos, 3200). Departamentos: Vendas ou Gestão.

Comando: Estruture aba 'Vendedores' com 4 colunas (ID, Nome, Salário, Departamento) e 5 linhas de dados. Qual é a célula do salário de Maria?

Alternativas:
a) C3 contém 2800 (linha 3 de Maria, coluna C de Salário)
b) C2 contém 2800
c) D3 contém 2800
d) B102 contém 2800
e) Não há estrutura padrão

ITEM 2
CAPACIDADE: Criar tabela de Faturamento com ID, Mês e Valor

Contexto: Faturamento de cada vendedor em janeiro: ID 101 (15000), 102 (18500), 103 (12000), 104 (16200), 105 (20500).

Comando: Crie aba 'Faturamento' com 3 colunas. Como esses dados se relacionam com Vendedores?

Alternativas:
a) Ambas compartilham coluna ID para vincular dados entre tabelas via PROCV/ÍNDICE
b) Não há relação, são independentes
c) Faturamento substitui Vendedores
d) Vendedores tem faturamento como subcategoria
e) As tabelas são idênticas

ITEM 3
CAPACIDADE: Criar tabela de Comissões com faixas

Contexto: Faturamento mínimo 0 (3%), 15000 (5%), 18000 (8%). Comissão aumenta conforme faturamento.

Comando: Estruture aba 'Comissões' com 2 colunas. Qual é a taxa para faturamento de 18.500?

Alternativas:
a) 8% (pois 18500 >= 18000)
b) 5% (pois 18500 < 18000 é falso, mas 18500 >= 15000)
c) 3% (taxa padrão)
d) 10% (valor fictício)
e) Taxa não é aplicável

ITEM 4
CAPACIDADE: Usar PROCV para buscar nome

Contexto: Aba 'Relatório' com coluna ID preenchida. Precisa coluna Nome buscando de 'Vendedores!A:D'.

Comando: Qual fórmula PROCV em B2 busca o NOME (2ª coluna) de forma exata?

Alternativas:
a) =PROCV(A2;Vendedores!A:D;2;FALSO) - busca exato na coluna 2
b) =PROCV(A2;Vendedores!A:D;1;VERDADEIRO) - coluna 1, busca aprox
c) =PROCV(A2;Vendedores!A:D;3;FALSO) - coluna 3 (Salário)
d) =PROCV(A2;Vendedores!D:A;2;FALSO) - ordem invertida
e) =PROCV(Vendedores!A:D;A2;2) - argumentos revertidos

ITEM 5
CAPACIDADE: Usar PROCV para buscar Salário

Contexto: Coluna C deve mostrar o SALÁRIO (coluna 3 em Vendedores!A:D) para cada ID.

Comando: Qual fórmula e resultado para ID 102 (Maria)?

Alternativas:
a) =PROCV(A2;Vendedores!A:D;3;FALSO) → 2800 (salário de Maria)
b) =PROCV(A2;Vendedores!A:D;2;FALSO) → Maria (nome, não salário)
c) =PROCV(A2;Vendedores!A:D;4;FALSO) → Vendas (departamento)
d) =PROCV(A2;Vendedores!A:D;3;VERDADEIRO) → aprox 2800
e) =PROCV(102;Vendedores;3) → erro (sintaxe)

ITEM 6
CAPACIDADE: Aplicar SEERRO para tratar erros #N/D

Contexto: Se houver ID 110 inexistente, PROCV retorna #N/D. Necessário mensagem clara.

Comando: Qual fórmula mostra 'Vendedor Não Encontrado' em vez do erro?

Alternativas:
a) =SEERRO(PROCV(A2;Vendedores!A:D;2;FALSO);"Vendedor Não Encontrado")
b) =SE(PROCV(...)=#N/D;"Não encontrado")
c) =IFERROR(...;"Erro geral")
d) PROCV não gera erro
e) Impossível tratar erro

ITEM 7
CAPACIDADE: Usar ÍNDICE e CORRESPONDÊNCIA para buscas bidirecionais

Contexto: Precisa coluna Departamento, mas está em D (direita). PROCV não busca para esquerda. Solução: ÍNDICE(coluna D; CORRESPONDÊNCIA(ID; coluna A; 0))

Comando: Qual fórmula retorna Departamento de ID 102 (Maria - Vendas)?

Alternativas:
a) =ÍNDICE(Vendedores!D:D;CORRESPONDÊNCIA(A2;Vendedores!A:A;0)) → Vendas
b) =PROCV(A2;Vendedores!A:D;4;FALSO) → Vendas
c) =ÍNDICE(CORRESPONDÊNCIA(...)) → erro (ordem invertida)
d) =CORRESPONDÊNCIA(A2;Vendedores!A:A;0) → 2 (linha, não departamento)
e) Impossível buscar departamento

ITEM 8
CAPACIDADE: Calcular comissão com SE aninhado (faixas)

Contexto: Tabela Comissões: 0→3%, 15000→5%, 18000→8%. Faturamento de Maria = 18500.

Comando: Qual fórmula e comissão (%) para Maria?

Alternativas:
a) =SE(D2<15000;D2*0,03;SE(D2<18000;D2*0,05;D2*0,08)) → 8% (18500≥18000)
b) =SE(D2<18000;5%;8%) → 5% (incorreto, 18500 não < 18000)
c) =SE(D2>18000;8%;SE(D2>15000;5%;3%)) → 8% (forma alternativa correta)
d) =D2*0,05 → 5% (taxa fixa)
e) Comissão não se aplica a Maria

ITEM 9
CAPACIDADE: Integrar múltiplas funções em um relatório

Contexto: Relatório final: ID | Nome (PROCV) | Salário (PROCV) | Departamento (ÍNDICE) | Faturamento | Comissão (SE)

Comando: Para ID 105 (Carlos, 3200, Gestão, 20500): qual é a comissão em reais?

Alternativas:
a) 20500 * 0,08 = 1.640 reais (8% pois 20500 >= 18000)
b) 20500 * 0,05 = 1.025 reais (5%, taxa média)
c) 20500 * 0,03 = 615 reais (3%, taxa mínima)
d) Gestão não recebe comissão
e) Impossível calcular sem mais dados


| SENAI
Santa Catarina | AVALIAÇÃO OBJETIVA |
| --- | --- |
| Data: | preenchimento pelo docente |
| Docente: | preenchimento pelo docente |
| Curso Técnico em: | Assistente em Processos de Gestão e Controle de Materiais |
| Unidade Curricular: | Análise de Dados Aplicada à Gestão |
| Estudante: | preenchimento pelo estudante |