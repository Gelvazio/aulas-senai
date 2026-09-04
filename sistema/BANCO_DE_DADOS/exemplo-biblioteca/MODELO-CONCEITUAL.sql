-- =====================================================================
-- MODELO CONCEITUAL - SISTEMA DE BIBLIOTECA
-- Descrição: Representação lógica dos conceitos e relacionamentos
-- Sem implementação específica de banco de dados
-- =====================================================================

/*
MODELO CONCEITUAL - DEFINIÇÃO

O modelo conceitual descreve os conceitos do mundo real e seus
relacionamentos, independentemente de qualquer tecnologia específica.

=====================================================================
ENTIDADES IDENTIFICADAS
=====================================================================

1. USUARIO
   Conceito: Pessoa cadastrada na biblioteca que pode emprestar livros
   Atributos Conceituais:
   - Identificador único do usuário
   - Nome completo
   - Endereço de email
   - Número de telefone
   - Identificação civil (CPF)
   - Data de cadastro
   - Situação do usuário (ativo, inativo, bloqueado)
   - Limite de livros que pode emprestar

2. LIVRO
   Conceito: Obra literária disponível para empréstimo na biblioteca
   Atributos Conceituais:
   - Identificador único do livro
   - Título da obra
   - Autor(es)
   - Código ISBN internacional
   - Editora responsável
   - Ano de publicação
   - Gênero ou categoria literária
   - Quantidade total de cópias
   - Quantidade disponível para empréstimo
   - Valor de aquisição
   - Data de entrada no acervo
   - Disponibilidade (disponível, indisponível, descartado)

3. EMPRESTIMO
   Conceito: Transação de empréstimo de um livro a um usuário
   Atributos Conceituais:
   - Identificador único do empréstimo
   - Referência ao usuário que pegou emprestado
   - Referência ao livro emprestado
   - Data e hora do empréstimo
   - Data prevista para devolução
   - Data real da devolução (quando ocorrer)
   - Valor de multa por atraso
   - Status do empréstimo (emprestado, devolvido, atrasado, perdido)
   - Observações ou comentários

=====================================================================
RELACIONAMENTOS ENTRE ENTIDADES
=====================================================================

USUARIO (1) -------- (N) EMPRESTIMO
   Semântica: Um usuário pode fazer vários empréstimos
   Cardinalidade: Um para Muitos (1:N)
   Descrição: Um USUARIO pode ter múltiplos EMPRESTIMOs
             Um EMPRESTIMO pertence a exatamente um USUARIO

LIVRO (1) -------- (N) EMPRESTIMO
   Semântica: Um livro pode ser emprestado várias vezes
   Cardinalidade: Um para Muitos (1:N)
   Descrição: Um LIVRO pode ter múltiplos EMPRESTIMOs
             Um EMPRESTIMO refere-se a exatamente um LIVRO

=====================================================================
DIAGRAMA ENTIDADE-RELACIONAMENTO (Representação Conceitual)
=====================================================================

    ┌──────────────────┐
    │     USUARIO      │
    ├──────────────────┤
    │ id_usuario       │
    │ nome             │
    │ email            │
    │ telefone         │
    │ cpf              │
    │ data_cadastro    │
    │ status           │
    │ limite_emprést.  │
    └────────┬─────────┘
             │ (1)
             │
             ├──── emprestima ────┐
             │                    │ (N)
             │        ┌───────────▼─────────────┐
             │        │    EMPRESTIMO           │
             │        ├─────────────────────────┤
             │        │ id_emprestimo           │
             │        │ id_usuario (FK)         │
             │        │ id_livro (FK)           │
             │        │ data_emprestimo         │
             │        │ data_devolucao_prevista │
             │        │ data_devolucao_real     │
             │        │ multa_atraso            │
             │        │ status                  │
             │        │ observacoes             │
             │        └────────────┬────────────┘
             │                     │ (N)
             │                     │
             │                     ├──── referencia-se ────┐
             │                                             │ (1)
    ┌────────▼────────────────┐
    │       LIVRO             │
    ├─────────────────────────┤
    │ id_livro                │
    │ titulo                  │
    │ autor                   │
    │ isbn                    │
    │ editora                 │
    │ ano_publicacao          │
    │ categoria               │
    │ quantidade_total        │
    │ quantidade_disponivel   │
    │ preco_aquisicao         │
    │ data_cadastro           │
    │ status                  │
    └─────────────────────────┘

=====================================================================
ATRIBUTOS-CHAVE DO MODELO CONCEITUAL
=====================================================================

CHAVES CANDIDATAS (Atributos que podem identificar unicamente):

USUARIO:
   - id_usuario (escolhida como chave primária)
   - cpf (única alternativa viável)
   - email (não é segura, pode mudar)

LIVRO:
   - id_livro (escolhida como chave primária)
   - isbn (única alternativa viável)

EMPRESTIMO:
   - id_emprestimo (escolhida como chave primária)

CHAVES ESTRANGEIRAS (Relacionamentos):

EMPRESTIMO:
   - id_usuario (referencia USUARIO)
   - id_livro (referencia LIVRO)

=====================================================================
REGRAS DE NEGÓCIO (Business Rules)
=====================================================================

1. Um usuário pode ter no máximo N livros emprestados simultaneamente
   (definido pelo campo limite_emprestimos)

2. Um usuário bloqueado não pode fazer empréstimos

3. Cada empréstimo tem um período fixo de empréstimo (ex: 14 dias)

4. Se um livro não for devolvido na data prevista, incide multa diária

5. Um livro perdido deve ser registrado no sistema

6. A quantidade disponível de um livro é atualizada quando:
   - Um livro é emprestado (diminui 1)
   - Um livro é devolvido (aumenta 1)
   - Um livro é adicionado ao acervo (aumenta)
   - Um livro é descartado (diminui)

7. Livros descartados não podem ser emprestados

8. Um empréstimo pode ter status:
   - emprestado: livro ainda não foi devolvido
   - devolvido: livro foi devolvido dentro ou após prazo
   - atrasado: livro não foi devolvido e prazo expirou
   - perdido: livro foi informado como perdido

=====================================================================
NORMALIZAÇÃO CONCEITUAL
=====================================================================

Verificação de Dependências Conceituais:

USUARIO:
  ✓ Nenhum atributo depende de outro não-chave
  ✓ Todos os atributos são sobre o USUARIO
  ✓ Não há dados derivados ou calculados

LIVRO:
  ✓ Nenhum atributo depende de outro não-chave
  ✓ Todos os atributos descrevem o LIVRO
  ✓ quantidade_disponivel é calculada de EMPRESTIMOs
    (pode ser desnormalizada por performance)

EMPRESTIMO:
  ✓ Nenhum atributo depende de outro não-chave
  ✓ multa_atraso é calculada (data_devolucao_real - data_devolucao_prevista)
    (pode ser desnormalizada por auditoria)

=====================================================================
RESTRIÇÕES DE INTEGRIDADE CONCEITUAIS
=====================================================================

1. Integridade de Domínio:
   - id_usuario: número inteiro, positivo, único
   - nome: texto, obrigatório
   - email: formato de email, único
   - cpf: 11 dígitos, único
   - status USUARIO: {ativo, inativo, bloqueado}
   - quantidade_total: número >= 0
   - quantidade_disponivel: número >= 0 e <= quantidade_total
   - nota: número entre 1 e 5
   - status EMPRESTIMO: {emprestado, devolvido, atrasado, perdido}

2. Integridade de Entidade:
   - Cada USUARIO deve ter id_usuario único
   - Cada LIVRO deve ter id_livro único
   - Cada EMPRESTIMO deve ter id_emprestimo único

3. Integridade Referencial:
   - Todo EMPRESTIMO deve ter id_usuario que existe em USUARIO
   - Todo EMPRESTIMO deve ter id_livro que existe em LIVRO
   - Não pode deletar USUARIO com EMPRESTIMOs ativos
   - Não pode deletar LIVRO com EMPRESTIMOs ativos

4. Restrições de Negócio:
   - quantidade_disponivel nunca pode ser negativa
   - data_devolucao_real não pode ser antes de data_emprestimo
   - data_devolucao_prevista deve ser após data_emprestimo
   - limite_emprestimos >= 0

=====================================================================
FIM DO MODELO CONCEITUAL
=====================================================================

Notas de Implementação:
- Este arquivo descreve apenas o modelo conceitual
- A implementação lógica segue em MODELO-LOGICO.sql
- A implementação física (MySQL) segue em MODELO-FISICO.sql
*/
