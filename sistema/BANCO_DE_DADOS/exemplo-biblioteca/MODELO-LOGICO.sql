-- =====================================================================
-- MODELO LÓGICO - SISTEMA DE BIBLIOTECA
-- Descrição: Estrutura normalizada, independente de SGBD específico
-- Foco: Normalização até 3FN, integridade referencial, tipos de dados lógicos
-- =====================================================================

/*
MODELO LÓGICO - ESTRUTURA DE DADOS NORMALIZADA

O modelo lógico define a estrutura das tabelas, tipos de dados,
relacionamentos e restrições, de forma independente do SGBD.

=====================================================================
DEFINIÇÃO DAS TABELAS (Modelo Lógico)
=====================================================================

TABELA 1: USUARIO
Descrição: Registra usuários cadastrados na biblioteca
Chave Primária: id_usuario
Chave Alternativa: cpf, email

Estrutura:
┌─ id_usuario: Inteiro (4 bytes), NOT NULL, AUTO_INCREMENT, PK
├─ nome: Texto (até 100 caracteres), NOT NULL
├─ email: Texto (até 100 caracteres), NOT NULL, UNIQUE
├─ telefone: Texto (até 11 caracteres), NULLABLE
├─ cpf: Texto (11 caracteres), NOT NULL, UNIQUE
├─ data_cadastro: Data e Hora, NOT NULL, DEFAULT = data/hora atual
├─ status: Enumerado (ativo | inativo | bloqueado), NOT NULL, DEFAULT = 'ativo'
└─ limite_emprestimos: Inteiro (1 byte), NOT NULL, DEFAULT = 5

Índices Lógicos:
- UNIQUE em email
- UNIQUE em cpf
- Índice em status (filtros frequentes)
- Índice em data_cadastro (ordenações)

---

TABELA 2: LIVRO
Descrição: Catálogo de livros disponíveis para empréstimo
Chave Primária: id_livro
Chave Alternativa: isbn

Estrutura:
┌─ id_livro: Inteiro (4 bytes), NOT NULL, AUTO_INCREMENT, PK
├─ titulo: Texto (até 150 caracteres), NOT NULL
├─ autor: Texto (até 100 caracteres), NOT NULL
├─ isbn: Texto (13 caracteres), NOT NULL, UNIQUE
├─ editora: Texto (até 100 caracteres), NULLABLE
├─ ano_publicacao: Inteiro (2 bytes), NULLABLE
├─ categoria: Texto (até 50 caracteres), NULLABLE
├─ quantidade_total: Inteiro (2 bytes), NOT NULL, CHECK > 0
├─ quantidade_disponivel: Inteiro (2 bytes), NOT NULL, CHECK >= 0 e <= quantidade_total
├─ preco_aquisicao: Decimal (10,2), NULLABLE
├─ data_cadastro: Data e Hora, NOT NULL, DEFAULT = data/hora atual
└─ status: Enumerado (disponivel | indisponivel | descartado), NOT NULL, DEFAULT = 'disponivel'

Restrições Lógicas:
- quantidade_disponivel <= quantidade_total
- quantidade_total > 0
- preco_aquisicao >= 0

Índices Lógicos:
- UNIQUE em isbn
- Índice em titulo (buscas)
- Índice em autor (filtros)
- Índice em categoria (navegação)
- Índice em status (disponibilidade)

---

TABELA 3: EMPRESTIMO
Descrição: Registro de empréstimos de livros
Chave Primária: id_emprestimo
Chave Estrangeira 1: id_usuario -> USUARIO(id_usuario)
Chave Estrangeira 2: id_livro -> LIVRO(id_livro)

Estrutura:
┌─ id_emprestimo: Inteiro (4 bytes), NOT NULL, AUTO_INCREMENT, PK
├─ id_usuario: Inteiro (4 bytes), NOT NULL, FK -> USUARIO
├─ id_livro: Inteiro (4 bytes), NOT NULL, FK -> LIVRO
├─ data_emprestimo: Data e Hora, NOT NULL, DEFAULT = data/hora atual
├─ data_devolucao_prevista: Data, NOT NULL
├─ data_devolucao_real: Data, NULLABLE
├─ multa_atraso: Decimal (8,2), NOT NULL, DEFAULT = 0.00
├─ status: Enumerado (emprestado | devolvido | atrasado | perdido), NOT NULL, DEFAULT = 'emprestado'
└─ observacoes: Texto (até 500 caracteres), NULLABLE

Restrições Lógicas:
- data_devolucao_real pode ser NULL (enquanto pendente)
- data_devolucao_prevista > data_emprestimo
- data_devolucao_real >= data_emprestimo (quando preenchida)
- multa_atraso >= 0

Integridade Referencial:
- id_usuario deve existir em USUARIO (RESTRICT: não deleta USUARIO com EMPRESTIMOs)
- id_livro deve existir em LIVRO (RESTRICT: não deleta LIVRO com EMPRESTIMOs)

Índices Lógicos:
- Índice em id_usuario (filtros por usuário)
- Índice em id_livro (histórico do livro)
- Índice em status (filtros de empréstimos ativos)
- Índice em data_emprestimo (ordenações)
- Índice composto (id_usuario, status) para filtros rápidos

=====================================================================
RELACIONAMENTOS (Nível Lógico)
=====================================================================

Relacionamento 1: USUARIO (1) ---- (N) EMPRESTIMO
  Tipo: Um-para-Muitos
  Navegação:
    - Um USUARIO pode ter 0 a M EMPRESTIMOs
    - Um EMPRESTIMO pertence a exatamente 1 USUARIO
  Implementação:
    - Chave Estrangeira: EMPRESTIMO.id_usuario -> USUARIO.id_usuario
    - Ação: ON DELETE RESTRICT (não deleta USUARIO com EMPRESTIMOs)

Relacionamento 2: LIVRO (1) ---- (N) EMPRESTIMO
  Tipo: Um-para-Muitos
  Navegação:
    - Um LIVRO pode ter 0 a M EMPRESTIMOs
    - Um EMPRESTIMO refere-se a exatamente 1 LIVRO
  Implementação:
    - Chave Estrangeira: EMPRESTIMO.id_livro -> LIVRO.id_livro
    - Ação: ON DELETE RESTRICT (não deleta LIVRO com EMPRESTIMOs)

=====================================================================
NORMALIZAÇÃO (Análise Lógica)
=====================================================================

1ª FORMA NORMAL (1FN):
✓ Todos os atributos são atômicos (indivisíveis)
✓ Nenhum atributo multivalorado
✓ Nenhum atributo composto (sem sub-campos)
Status: ATENDE 1FN

Verificação USUARIO:
  - nome: texto simples ✓
  - email: texto simples ✓
  - cpf: texto simples ✓
  Resultado: Em 1FN ✓

Verificação LIVRO:
  - titulo: texto simples ✓
  - autor: texto simples (um autor por livro neste modelo) ✓
  - isbn: número simples ✓
  Resultado: Em 1FN ✓

Verificação EMPRESTIMO:
  - data_emprestimo: data/hora simples ✓
  - multa_atraso: número simples ✓
  Resultado: Em 1FN ✓

---

2ª FORMA NORMAL (2FN):
✓ Atende 1FN
✓ Nenhum atributo não-chave depende parcialmente da chave primária
  (como todas as chaves primárias são simples, não há dependências parciais)
Status: ATENDE 2FN

Análise:
  USUARIO(id_usuario): Chave simples, todos os atributos dependem dela ✓
  LIVRO(id_livro): Chave simples, todos os atributos dependem dela ✓
  EMPRESTIMO(id_emprestimo): Chave simples, todos os atributos dependem dela ✓

---

3ª FORMA NORMAL (3FN):
✓ Atende 2FN
✓ Nenhum atributo não-chave depende de outro atributo não-chave
Status: ATENDE 3FN

Análise de Dependências Transitivas:
  USUARIO: Nenhuma coluna depende de outra não-chave ✓
  LIVRO: quantidade_disponivel é derivada (pode ser desnormalizada) ✓
         (Cálculo: quantidade_total - livros emprestados)
  EMPRESTIMO: multa_atraso é calculada (pode ser desnormalizada) ✓
              (Cálculo: dias_atraso * taxa_diária)

Conclusão: Modelo está em 3FN com desnormalizações justificadas ✓

=====================================================================
ATRIBUTOS ESPECIAIS E CALCULADOS
=====================================================================

Atributos Calculados (não armazenados, mas deriváveis):
1. dias_emprestimo = data_devolucao_real - data_emprestimo
2. dias_atraso = CASE
                   WHEN status = 'atrasado' THEN CURDATE() - data_devolucao_prevista
                   WHEN data_devolucao_real > data_devolucao_prevista
                   THEN data_devolucao_real - data_devolucao_prevista
                   ELSE 0
                 END

Atributos Desnormalizados (armazenados por performance):
1. LIVRO.quantidade_disponivel
   - Derivado de: quantidade_total - COUNT(EMPRESTIMOs emprestados)
   - Razão: Evita JOIN custoso em cada listagem
   - Sincronização: Via triggers ao inserir/atualizar EMPRESTIMOs

2. EMPRESTIMO.multa_atraso
   - Derivado de: dias_atraso * taxa_fixa (ex: 2.50)
   - Razão: Histórico/auditoria dos valores cobrados
   - Sincronização: Calculado no momento da devolução

=====================================================================
RESTRIÇÕES DE INTEGRIDADE LÓGICAS
=====================================================================

Restrições de Domínio:
  - id_usuario: INT, > 0, NOT NULL, UNIQUE
  - nome: VARCHAR(100), NOT NULL, NOT EMPTY
  - email: VARCHAR(100), NOT NULL, UNIQUE, FORMATO EMAIL
  - cpf: VARCHAR(11), NOT NULL, UNIQUE, FORMATO CPF
  - status USUARIO: IN ('ativo', 'inativo', 'bloqueado')
  - quantidade_total: INT, > 0, NOT NULL
  - quantidade_disponivel: INT, >= 0, <= quantidade_total
  - data_devolucao_prevista: DATE, > data_emprestimo
  - status EMPRESTIMO: IN ('emprestado', 'devolvido', 'atrasado', 'perdido')

Restrições de Entidade:
  - id_usuario é chave primária em USUARIO
  - id_livro é chave primária em LIVRO
  - id_emprestimo é chave primária em EMPRESTIMO

Restrições Referenciais:
  - EMPRESTIMO.id_usuario deve existir em USUARIO
  - EMPRESTIMO.id_livro deve existir em LIVRO
  - Deleção: RESTRICT (não permite deletar USUARIO/LIVRO com EMPRESTIMOs)

=====================================================================
ÍNDICES LÓGICOS (Otimização)
=====================================================================

Índices Simples:
  - USUARIO(email): UNIQUE, busca por email
  - USUARIO(cpf): UNIQUE, busca por CPF
  - USUARIO(status): Filtros de usuários ativos/inativos
  - LIVRO(isbn): UNIQUE, busca por ISBN
  - LIVRO(titulo): Busca por título
  - LIVRO(categoria): Filtros por categoria
  - LIVRO(status): Filtros de disponibilidade
  - EMPRESTIMO(id_usuario): Histórico por usuário
  - EMPRESTIMO(id_livro): Histórico do livro
  - EMPRESTIMO(status): Empréstimos ativos

Índices Compostos:
  - EMPRESTIMO(id_usuario, status): Filtro rápido de empréstimos ativos por usuário
  - EMPRESTIMO(data_devolucao_prevista, status): Empréstimos vencidos

Análise de Performance:
  - Busca por usuário: O(log n) com índice em id_usuario
  - Listagem de disponíveis: O(log n) com índice em status
  - Filtro de atrasados: O(log n) com índice composto

=====================================================================
FIM DO MODELO LÓGICO
=====================================================================

Próximo Passo: Ver MODELO-FISICO.sql para implementação em MySQL
*/
