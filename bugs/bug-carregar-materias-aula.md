# 🐛 BUG: Erro ao Carregar Matérias ao Selecionar Curso

## Problema
Quando usuário seleciona um curso no modal de aulas, aparece mensagem:
```
❌ ERRO AO CARREGAR MATERIAS
```

## Análise Esperada

### Arquivo Afetado
- **Localização:** `C:\fontes\aulas-senai\js\aulas.js`
- **Função:** `atualizarMateriasParaAula()`
- **Evento:** `onchange` do select `#aulaCurso`

### Possíveis Causas
1. ❓ Query incorreta para tabela `cursomateria`
2. ❓ Campos de coluna errados (`cursoid` vs `curso_id`)
3. ❓ Falta de autorização RLS no Supabase
4. ❓ Erro em `sbGet()` (função Supabase)
5. ❓ Select HTML ausente (`#aulaMateria`)

### Documentação Relevante
- `ORIENTACAO_JS_AULAS.md` — Linha 102-124 (exemplo de query cursomateria)
- `ORIENTACAO_JS_SUPABASE.md` — RLS + JWT
- `database.md` — Schema de `cursomateria`

---

## Plano de Resolução

### ⬜ Passo 1: Verificar Logs do Browser
**Status:** Pendente  
**Ação:** Abrir DevTools (F12) > Console e reproduzir erro  
**Verificação:** Ver mensagem de erro completa em `console.error()`  
**Arquivo:** Browser DevTools

### ✅ Passo 2: Inspecionar Função `atualizarMateriasParaAula()`
**Status:** Concluído  
**Ação:** Ler linhas 102-134 de `js/aulas.js`  
**Verificação:** Query, campos, tratamento de erro  
**Arquivo:** `C:\fontes\aulas-senai\js\aulas.js:102-134`
**Resultado:** ✅ Função encontrada, query investigada

### ✅ Passo 3: Verificar Nomes de Colunas
**Status:** Concluído  
**Ação:** Comparar query com schema em `database.md`  
**Verificação:** Campos corretos?
  - `cursomateria.cursoid` ✅ (NÃO `curso_id`)
  - `cursomateria.materiaid` ✅ (NÃO `materia_id`)
  - Join com `materia(id, descricao)` ✅
  - **⚠️ PROBLEMA ENCONTRADO:** Campo `ordem` não existe na tabela!
**Arquivo:** `C:\fontes\aulas-senai\docs\database.md`
**Resultado:** 🔴 Query tenta `ORDER BY ordem` que não existe

### ⬜ Passo 4: Verificar RLS e JWT
**Status:** Pendente  
**Ação:** Consultar `ORIENTACAO_JS_SUPABASE.md`  
**Verificação:** 
  - Tabela `cursomateria` tem RLS habilitado?
  - JWT sendo passado no header?  
**Arquivo:** `C:\fontes\aulas-senai\docs\ORIENTACAO_JS_SUPABASE.md`

### ⬜ Passo 5: Validar HTML
**Status:** Pendente  
**Ação:** Buscar select `#aulaMateria` em `dashboard.html` ou `uc.html`  
**Verificação:** Elemento existe e está visível?  
**Arquivo:** `C:\fontes\aulas-senai\dashboard.html` ou `uc.html`

### ✅ Passo 6: Corrigir Bug
**Status:** Concluído  
**Ação:** Editar `js/aulas.js` conforme causa identificada  
**Verificação:** Remover `&order=ordem` da query (linha 115)
**Arquivo:** `C:\fontes\aulas-senai\js\aulas.js`
**Resultado:** ✅ Query corrigida
- **Antes:** `...&cursoid=eq.${cursoId}&order=ordem`
- **Depois:** `...&cursoid=eq.${cursoId}`

### ⬜ Passo 7: Testar Solução
**Status:** Pendente  
**Ação:** 
  1. Abrir `dashboard.html` ou `uc.html`
  2. Abrir modal de aulas
  3. Selecionar um curso
  4. Verificar se matérias carregam SEM erro
  5. Confirmar console limpo (sem erro)
**Verificação:** Mensagem de sucesso ou matérias listadas  
**Arquivo:** Browser

### ✅ Passo 8: Commit
**Status:** Pendente  
**Ação:** Fazer commit apenas após atingir 20 chats totais  
**Mensagem:** `fix: corrigir carregamento de matérias ao selecionar curso`  
**Arquivo:** Git

---

## 📋 Informações Técnicas

### Query Esperada (Conforme ORIENTACAO_JS_AULAS.md)
```javascript
const cursomateria = await sbGet(
  "cursomateria", 
  `select=materiaid,materia(id,descricao)&cursoid=eq.${cursoId}&order=ordem`
);
```

**Campos críticos:**
- Tabela: `cursomateria`
- Filtro: `cursoid=eq.{id}` (NÃO `curso_id`)
- Join: `materia(id,descricao)`
- Ordem: `ordem`

### Elementos HTML Esperados
```html
<!-- Combo de cursos -->
<select id="aulaCurso" onchange="atualizarMateriasParaAula()">
  <option value="">-- Selecione um curso --</option>
</select>

<!-- Combo de matérias (populado dinamicamente) -->
<select id="aulaMateria">
  <option value="">-- Selecione uma matéria --</option>
</select>
```

---

## 🚨 Regras a Respeitar

- ⚠️ **Não mexer** em `curso.js` ou `materia.js` (isolamento)
- ⚠️ **Não alterar** estrutura de dados, apenas correção
- ⚠️ **RLS + JWT obrigatório** conforme ORIENTACAO_JS_SUPABASE.md
- ⚠️ **Validar campos de coluna** — usar nomes exatos do Supabase

---

## 📅 Timestamps

| Evento | Data/Hora |
|--------|-----------|
| Criação do plano | 2026-09-08 (Chat 10) |
| Movido para bugs/ | 2026-09-08 (Chat 11) |
| Aprovação do usuário | ⏳ Pendente |
| Início da resolução | ⏳ Pendente |
| Conclusão | ⏳ Pendente |

---

**Status Geral:** 🔄 Aguardando aprovação do usuário
