# Adicionar Apostila por Matéria

**Objetivo:** Adicionar um caminho de apostila em cada matéria e disponibilizar sua leitura em modal antes do acesso às aulas.

**Tech Stack:** HTML, CSS, JavaScript, Markdown, Supabase REST e PostgreSQL

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar e preencher a coluna de apostila | ✅ Concluído |
| 2 | Integrar o campo ao cadastro de matéria | ✅ Concluído |
| 3 | Adicionar botão e modal de Apostila | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Persistir o caminho

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/supabase-materias-mais-tech.sql`

**Ação:** Criar `apostila_caminho` e preencher os caminhos das oito matérias do Rio do Sul Mais Tech.

```sql
alter table public.materia add column if not exists apostila_caminho text;
```

**Verificação:** Revisão textual, sem testes.

---

### Passo 2: Integrar ao cadastro

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Consultar, exibir e salvar o caminho da apostila com compatibilidade para bancos que ainda não receberam a coluna.

```html
<input id="cursoMateriaApostila" type="text">
```

**Verificação:** Não executar testes ou navegador.

---

### Passo 3: Adicionar botão e modal

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Inserir “Apostila” antes de “Ver aulas” e carregar o Markdown no modal dedicado.

```html
<button onclick="abrirApostilaMateria(id)">Apostila</button>
```

**Verificação:** Revisão estática do diff, sem testes.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/adicionar-apostila-por-materia.md`, `sistema/dashboard.html` e `sistema/supabase-materias-mais-tech.sql`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/adicionar-apostila-por-materia.md sistema/dashboard.html sistema/supabase-materias-mais-tech.sql
git commit -m "feat: adicionar apostila por materia"
git push origin main
```

**Verificação:** Confirmar somente o resultado do versionamento.
