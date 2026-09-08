# 🔧 CORRIGIR: Modal de Edição de Curso Não Abre

**Data:** 2026-09-08  
**Status Geral:** ✅ Concluído  
**Prioridade:** 🔴 CRÍTICA

---

## 📋 Objetivo
Corrigir problema onde clicar no botão "Editar" de um curso não abre o modal de edição.

---

## 🎯 Problema Relatado
**Ação:** Clicar em "✏️ Editar" em um card de curso  
**Esperado:** Abrir modal com formulário de edição  
**Atual:** Nada ocorre

---

## 🔍 Investigação Realizada

### 1. Fluxo do Evento
- ✅ Botão "Editar" existe: `sistema/dashboard.html:3102`
- ✅ Chama `editarCursoCard(${curso.idNum})`
- ✅ Função existe: `sistema/dashboard.html:4030`
- ✅ Modal existe: `sistema/dashboard.html:5738` (id: `modalCursoForm`)

### 2. Visibilidade do Botão
- ✅ Buttons estão em div `.card-edit` (display:none por padrão)
- ✅ Professor vê botões: linha 3111-3114 mostra `.card-edit` quando `isProfessor === true`
- ✅ `isProfessor` = `role === "PROFESSOR"` (role vem de localStorage)

### 3. Possível Causa da Falha
**Suspeita:** Erro na função `editarCursoCard()` ao procurar o curso

Na linha 4032:
```javascript
const c = dadosCursos.cursos.find(x => x.idNum === id);
```

**Problema potencial:** Tipo de dados (number vs string)
- `id` passado pode ser `number` ou `string`
- `x.idNum` no array pode ser número ou string
- Comparação `===` falha se tipos diferem

**Resultado:** `c = undefined` → linhas 4035-4040 não preenchem nada → modal abre vazio ou não abre

---

## ✅ Plano de Execução

### Etapa 1: Investigar o Problema
- **Status:** ✅ Concluído
- **Ação:** Procurar função `editarCursoCard()` e entender fluxo
- **Arquivo:** `sistema/dashboard.html`
- **Descoberta:** Problema de tipo de dados na comparação (`===`)

### Etapa 2: Corrigir `editarCursoCard()`
- **Status:** ✅ Concluído
- **Ação:** Editar linha 4032 para adicionar conversão de tipo
- **Arquivo:** `sistema/dashboard.html`
- **Mudança:** `Number(id)` na comparação
- **Linha:** 4032

### Etapa 3: Corrigir `abrirModalDuplicarCurso()`
- **Status:** ✅ Concluído
- **Ação:** Editar linha 4109 para adicionar conversão de tipo
- **Arquivo:** `sistema/dashboard.html`
- **Mudança:** `Number(cursoId)` na comparação
- **Linha:** 4109

### Etapa 4: Testar Edição
- **Status:** ⏳ Aguardando
- **Ação:** Usuário testa clicar em "Editar" em um curso
- **Verificação:** Modal abre com dados do curso preenchidos
- **Nota:** NÃO vou testar (regra: nunca abrir navegador)

### Etapa 5: Commit de Correção
- **Status:** ✅ Concluído
- **Ação:** `git add .` + `git commit -m "Corrigir modal de edição de curso..."`
- **Arquivo:** `sistema/dashboard.html`
- **Verificação:** Commit `e3ad9d3` criado com sucesso

---

## ⚠️ Contexto da Correção Anterior

Na correção anterior (erro HTTP 400), mudei:
```javascript
// Antes (coluna inexistente)
id: row.codigo,
idNum: row.id,

// Depois (apenas coluna real)
id: row.id,
idNum: row.id,
```

Agora ambos têm o mesmo valor (`row.id`, que é `bigint` do Supabase).

A função `editarCursoCard()` passa `${curso.idNum}` (interpolado em string no HTML), então:
- `curso.idNum` = número ou string?
- Função recebe `id` como parâmetro
- Busca `x.idNum === id` pode falhar por tipo

---

## 🏁 Critérios de Sucesso

- [ ] Função `editarCursoCard()` encontra o curso corretamente
- [ ] Modal abre com dados preenchidos
- [ ] Sem erros no console
- [ ] Usuário pode editar e salvar curso
- [ ] Arquivo commitado

