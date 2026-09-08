# 🔧 CORRIGIR ERRO: Coluna `curso.codigo` Não Existe

**Data:** 2026-09-08  
**Status Geral:** ✅ Concluído  
**Prioridade:** 🔴 CRÍTICA

---

## 📋 Objetivo
Corrigir erro HTTP 400 do Supabase ao carregar cursos no `sistema/dashboard.html`:
```
column curso.codigo does not exist
```

---

## 🎯 Problema
A query SELECT em `dashboard.html:2992` tenta selecionar coluna `codigo` que **não existe** na tabela `curso`:

```javascript
// ❌ INCORRETO (linha 2992)
SELECT id,codigo,nome_completo,tipo_curso,unidade,icone,descricao_card,cor_primaria,cor_secundaria,cor_faixa,tags,link_aulas,visivel,materias
FROM curso

// Erro: column "codigo" does not exist
```

Além disso, o código em `linha 3003` tenta usar `row.codigo` como ID, o que nunca existiu.

---

## 📊 Escopo
| Item | Descrição | Arquivo |
|------|-----------|---------|
| **Problema** | Coluna `codigo` não existe em tabela `curso` | `sistema/dashboard.html` |
| **Linhas** | 2992, 3003 | `sistema/dashboard.html` |
| **Tabelas Afetadas** | `curso` (Supabase) | PostgreSQL |
| **Impacto** | Dashboard não carrega nenhum curso | UX crítica |

---

## 🔍 Investigação Necessária

### 1. Verificar Schema Real da Tabela `curso`
**Status:** ⬜ Pendente  
**Ação:** Executar query SQL no Supabase para ver schema atual  
**Comando:**
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'curso'
ORDER BY ordinal_position;
```
**Arquivo:** Executar via MCP Supabase  
**Verificação:** Confirmar quais colunas existem (provavelmente `id`, `nome_completo`, etc, mas NÃO `codigo`)

---

## 💡 Solução
### Opção 1: REMOVER `codigo` da query (Recomendado ✅)
Se `codigo` não existe e `id` é suficiente como identificador:

**Mudança:**
- Linha 2992: Remover `codigo` do SELECT
- Linha 3003: Usar `row.id` em vez de `row.codigo`

**Antes:**
```javascript
// Linha 2992
SELECT id,codigo,nome_completo,...

// Linha 3003
id: row.codigo,
```

**Depois:**
```javascript
// Linha 2992
SELECT id,nome_completo,...

// Linha 3003
id: row.id,
```

**Porquê:** 
- ✅ `id` é sempre o identificador único
- ✅ Remove coluna inexistente
- ✅ Mantém lógica funcionando

### Opção 2: CRIAR coluna `codigo` no Supabase
Se `codigo` deve existir para versionamento/rastreamento:

**Mudança:** Adicionar migração SQL
**Script:**
```sql
ALTER TABLE curso ADD COLUMN codigo VARCHAR(50) UNIQUE DEFAULT gen_random_uuid()::text;
```

**Risco:** Mudança estrutural, pode quebrar se houver restrições

---

## ✅ Plano de Execução

### Etapa 1: Verificar Schema Atual
- **Status:** ✅ Concluído
- **Ação:** Executar query SQL via MCP Supabase
- **Arquivo:** (Supabase)
- **Verificação:** Confirmado - colunas reais: id, nome_completo, descricao, ativo, unidade, materias, created_at, updated_at

### Etapa 2: Corrigir Query SELECT
- **Status:** ✅ Concluído
- **Ação:** Editar `sistema/dashboard.html` linha 2992
- **Arquivo:** `sistema/dashboard.html`
- **Mudança:** Remover 10 colunas inexistentes do SELECT
- **Verificação:** Query agora: `select=id,nome_completo,descricao,ativo,unidade,materias&order=id`

### Etapa 3: Corrigir Mapeamento de Dados
- **Status:** ✅ Concluído
- **Ação:** Editar `sistema/dashboard.html` linhas 3003-3016
- **Arquivo:** `sistema/dashboard.html`
- **Mudança:** Usar `row.id` e adicionar valores padrão para cores/ícone
- **Verificação:** Mapeamento usa apenas colunas reais

### Etapa 4: Testar Dashboard
- **Status:** ⏳ Aguardando
- **Ação:** Usuário testa login em `index.html` → `dashboard.html`
- **Verificação:** Cursos carregam sem erro HTTP 400
- **Nota:** NÃO vou testar (regra CLAUDE.md: nunca abrir navegador)

### Etapa 5: Commit de Correção
- **Status:** ✅ Concluído
- **Ação:** `git add .` + `git commit -m "Corrigir erro coluna curso.codigo não existe"`
- **Arquivo:** `sistema/dashboard.html`
- **Verificação:** Commit 396b962 criado com sucesso

---

## ⚠️ Riscos e Dependências

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| `codigo` é usado em outro arquivo | Quebra em outro lugar | Grep por `codigo` em todo projeto |
| `id` vs `idNum` confunde lógica | Bugs em filtros | Revisar uso de `id` no código |
| Cache em linha 3021-3022 quebra | Dashboard não funciona | Testar após mudança |

---

## 📝 Notas

- A coluna `codigo` **não existe** na tabela `curso` Supabase
- O campo `id` (UUID ou Int) é o identificador correto
- Essa correção é **BLOQUEANTE** para funcionar o dashboard

---

## 🏁 Critérios de Sucesso

- [ ] Query SELECT removeu `codigo`
- [ ] Mapeamento usa `row.id` em vez de `row.codigo`
- [ ] Nenhuma outra referência a `curso.codigo` no projeto
- [ ] Arquivo commitado
- [ ] Usuário testa e dashboard carrega sem erro 400

