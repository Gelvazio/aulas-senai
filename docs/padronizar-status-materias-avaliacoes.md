# Padronizar status de matérias e avaliações

**Objetivo:** Aplicar a mesma lista de status a todos os campos monitorados em `materia` e `avaliacao`.

**Tech Stack:** HTML, JavaScript, PostgreSQL e Supabase

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Padronizar os selects do dashboard | ✅ Concluído |
| 2 | Padronizar as restrições SQL | ✅ Concluído |
| 3 | Tratar valores legados | ✅ Concluído |
| 4 | Commit e push | 🔄 Em progresso |

---

### Passo 1: Padronizar os selects

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\professor-senai\sistema\dashboard.html`

**Ação:** Oferecer `PENDENTE`, `ANDAMENTO`, `CONCLUIDO` e `CANCELADO` nos oito campos de status.

**Verificação:** Não executar testes nem abrir navegador, conforme as regras do projeto.

---

### Passo 2: Padronizar as restrições SQL

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\professor-senai\sistema\supabase-avaliacoes.sql`

**Ação:** Aplicar o mesmo domínio de quatro valores a todos os campos de status de `materia` e `avaliacao`.

```sql
check (campo in ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO', 'CANCELADO'))
```

**Verificação:** Não executar o SQL nem testes, conforme as regras do projeto.

---

### Passo 3: Tratar valores legados

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\professor-senai\sistema\supabase-avaliacoes.sql`

**Ação:** Converter o valor legado `SEM_ALUNOS` para `CONCLUIDO` antes de recriar as restrições.

**Verificação:** Não executar o SQL, conforme as regras do projeto.

---

### Passo 4: Commit e push

**Status:** 🔄 Em progresso

**Arquivo:** Versionar somente os arquivos desta tarefa.

**Ação:** Criar commit descritivo e enviar para `origin/main`.

**Verificação:** Conferir o resultado dos comandos Git.
