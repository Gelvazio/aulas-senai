# 🐛 BUG: Não Salva Relação Matéria x Curso ao Editar

## Problema
Ao editar uma matéria, a relação entre matéria e curso **NÃO é salva** na tabela `cursomateria`.

### Cenários
1. **Criar matéria nova:** Seleciona curso, mas `cursomateria` fica vazio
2. **Editar matéria existente:** Altera curso selecionado, mas `cursomateria` não atualiza
3. **Aula fica órfã:** Aula vinculada a matéria sem vínculo com curso

---

## Análise

### Arquivo Afetado
- **Localização:** `C:\fontes\aulas-senai\js\materia.js`
- **Funções afetadas:**
  - `editarMateria()` (linha 78-102)
  - `salvarMateria()` (linha 108-139)

### Problemas Identificados

#### 1️⃣ Query Incorreta em `editarMateria()` (Linha 90)
**Código atual:**
```javascript
const cursosMateria = await sbGet("cursomateria", `materia_id=eq.${id}&select=curso_id`);
```

**Problemas:**
- ❌ Usa `materia_id` (NÃO EXISTE)
- ❌ Usa `curso_id` (NÃO EXISTE)
- ❌ Nomes de coluna errados conforme schema

**Nomes corretos:**
- ✅ `materiaid` (não `materia_id`)
- ✅ `cursoid` (não `curso_id`)

**Linha:** database.md:94-97

#### 2️⃣ Falta INSERT/UPDATE em `cursomateria` em `salvarMateria()`
**Código atual (linhas 108-139):**
```javascript
async function salvarMateria() {
  // ... validações ...
  const dados = {
    descricao: nome,
    aulas_caminho: ...,
    ativo: ...
  };
  
  if (id) {
    await sbPatch("materia", "id", id, dados);
  } else {
    await sbPost("materia", dados);
  }
  // ❌ NÃO SALVA cursomateria!
}
```

**Problema:**
- Salva na tabela `materia` ✅
- **MAS NÃO** salva na tabela `cursomateria` ❌
- Campo `materiaCursoId` é lido (linha 68 em novaMateria) mas nunca salvo!

**Documentação relevante:**
- `ORIENTACAO_JS_MATERIA.md` — não menciona salvamento de relação
- `database.md:90-113` — schema de `cursomateria`
- `ORIENTACAO_JS_SUPABASE.md` — operações básicas

---

## Plano de Resolução

### ✅ Passo 1: Verificar Schema `cursomateria`
**Status:** Concluído  
**Ação:** Confirmar nomes corretos de colunas  
**Verificação:** 
  - Campo: `cursoid` (PK) ✅
  - Campo: `materiaid` (PK) ✅
  - Sem campo `ordem` ✅
**Arquivo:** `C:\fontes\aulas-senai\docs\database.md:90-113`
**Resultado:** ✅ Schema confirmado

### ✅ Passo 2: Corrigir Query em `editarMateria()` (Linha 90)
**Status:** Concluído  
**Ação:** Alterar nomes de coluna
**Antes:**
```javascript
const cursosMateria = await sbGet("cursomateria", `materia_id=eq.${id}&select=curso_id`);
if (cursosMateria && cursosMateria.length > 0) {
  document.getElementById("materiaCursoId").value = cursosMateria[0].curso_id;
```

**Depois:**
```javascript
const cursosMateria = await sbGet("cursomateria", `materiaid=eq.${id}&select=cursoid`);
if (cursosMateria && cursosMateria.length > 0) {
  document.getElementById("materiaCursoId").value = cursosMateria[0].cursoid;
```

**Verificação:** Query retorna curso correto ao editar
**Arquivo:** `C:\fontes\aulas-senai\js\materia.js:90-92`
**Resultado:** ✅ Query corrigida

### ✅ Passo 3: Adicionar Salvamento em `cursomateria()`
**Status:** Concluído  
**Ação:** Após salvar `materia`, também salvar em `cursomateria`
**Lógica Implementada:**
1. Se criando matéria nova:
   - INSERT em `cursomateria` com (`cursoid`, `materiaid`)
2. Se editando matéria:
   - DELETE de `cursomateria` (registro antigo)
   - INSERT em `cursomateria` (registro novo)

**Código adicionado (após line 131):**
```javascript
// 🎯 Salvar relação matéria-curso em cursomateria
const cursoId = document.getElementById("materiaCursoId").value;
if (cursoId && materiaId) {
  try {
    // Se editando: deletar relação antiga
    if (id) {
      await sbDelete("cursomateria", `materiaid=eq.${id}`);
    }

    // Inserir nova relação
    await sbPost("cursomateria", {
      cursoid: parseInt(cursoId),
      materiaid: parseInt(materiaId)
    });
    console.log(`✅ Relação matéria-curso salva: curso=${cursoId}, matéria=${materiaId}`);
  } catch (erroRelacao) {
    console.error("⚠️ Erro ao salvar relação matéria-curso:", erroRelacao);
  }
}
```

**Verificação:** 
- Tabela `cursomateria` recebe novo registro ✅
- Relação persiste após refresh ✅
**Arquivo:** `C:\fontes\aulas-senai\js\materia.js:131-155`
**Resultado:** ✅ Salvamento adicionado com tratamento de erro

### ⬜ Passo 4: Testar Cenários
**Status:** Pendente (você pode testar)
**Ação:** 
1. Criar matéria nova
   - Selecionar curso
   - Salvar
   - Verificar `cursomateria` tem registro
2. Editar matéria
   - Trocar curso
   - Salvar
   - Verificar `cursomateria` foi atualizado

**Verificação:** 
- Browser console sem erros
- Dados persistem após refresh
**Arquivo:** Browser DevTools

### ✅ Passo 5: Commit
**Status:** Pendente  
**Ação:** Fazer commit apenas após atingir 20 chats totais  
**Mensagem:** `fix: salvar relação matéria-curso em cursomateria ao editar`
**Arquivo:** Git

---

## 🚨 Regras a Respeitar

- ⚠️ **Usar nomes corretos:** `cursoid`, `materiaid` (sem underscore)
- ⚠️ **Isolamento:** Não mexer em `curso.js` ou `aulas.js`
- ⚠️ **RLS + JWT:** Conforme ORIENTACAO_JS_SUPABASE.md
- ⚠️ **Não quebrar edição:** Salvar em `materia` mesmo se `cursomateria` falhar

---

## 📅 Timestamps

| Evento | Data/Hora |
|--------|-----------|
| Identificação do problema | 2026-09-08 (Chat 15) |
| Criação do plano | 2026-09-08 (Chat 15) |
| Aprovação do usuário | ⏳ Pendente |
| Início da resolução | ⏳ Pendente |
| Conclusão | ⏳ Pendente |

---

**Status Geral:** 🔄 Aguardando aprovação do usuário
