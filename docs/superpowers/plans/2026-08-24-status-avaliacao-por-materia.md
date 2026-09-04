# Status de planejamento por matéria — Implementation Plan

> **For agentic workers:** Execute este plano em linha, sem subagentes, testes, navegador, servidor ou worktree, conforme as regras do projeto.

**Goal:** Transferir Criação de Avaliação, Plano de Aula e Plano de Ensino do registro de avaliação para a matéria.

**Architecture:** A tabela `materia` passa a ser a fonte única desses três status. O dashboard edita e exibe os status no card/formulário da matéria, enquanto avaliações mantêm apenas etapas próprias de cada aplicação. A migração SQL consolida valores existentes antes de remover as colunas antigas.

**Tech Stack:** HTML, CSS, JavaScript, Supabase REST e PostgreSQL.

**Spec:** Solicitação do usuário nesta tarefa.

## Global Constraints

- Não executar nem criar testes.
- Não abrir navegador nem iniciar servidor.
- Trabalhar diretamente em `main`.
- Preservar dados existentes durante a migração.

### Task 1: Migrar o modelo SQL

**Files:**
- Modify: `sistema/supabase-avaliacoes.sql`
- Modify: `sistema/supabase-materias-mais-tech.sql`

- [x] Adicionar `status_criacao_avaliacao`, `status_plano_aula` e `status_plano_ensino` em `materia`.
- [x] Consolidar os valores antigos por prioridade `PENDENTE`, `ANDAMENTO`, `CONCLUIDO`.
- [x] Remover as três colunas de `avaliacao` após a migração.

### Task 2: Transferir a interface para a matéria

**Files:**
- Modify: `sistema/dashboard.html`

- [x] Adicionar os três seletores ao formulário da matéria.
- [x] Carregar, editar, salvar e exibir os status no card da matéria.
- [x] Remover seletores, renderização e payload desses campos nas avaliações.

### Task 3: Ajustar o contador dos cursos

**Files:**
- Modify: `sistema/dashboard.html`

- [x] Contar os três status uma vez por matéria.
- [x] Contar nas avaliações somente os status que continuam pertencendo a cada avaliação.

### Task 4: Revisar e versionar

- [x] Inspecionar o diff sem executar testes.
- [x] Fazer commit e push somente dos arquivos desta tarefa.
