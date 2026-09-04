# Adicionar Status de Plano de Aula e Plano de Ensino

**Objetivo:** Incluir os status Plano de Aula e Plano de Ensino em cada avaliação da matéria, com valor inicial Pendente.

**Tech Stack:** HTML, JavaScript, Supabase REST e PostgreSQL

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Adicionar campos no banco | ✅ Concluído |
| 2 | Adicionar seletores no formulário | ✅ Concluído |
| 3 | Exibir e persistir os novos status | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Adicionar campos no banco

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/supabase-avaliacoes.sql`

**Ação:** Adicionar `status_plano_aula` e `status_plano_ensino`, ambos com padrão `PENDENTE` e valores permitidos `PENDENTE`, `ANDAMENTO` e `CONCLUIDO`.

```sql
status_plano_aula text not null default 'PENDENTE',
status_plano_ensino text not null default 'PENDENTE'
```

**Verificação:** Não executar testes; revisar somente a alteração textual.

---

### Passo 2: Adicionar seletores

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Criar os dois campos no formulário de avaliação com as três opções solicitadas e Pendente selecionado inicialmente.

```html
<select id="avaliacaoStatusPlanoAula">
  <option value="PENDENTE">Pendente</option>
  <option value="ANDAMENTO">Andamento</option>
  <option value="CONCLUIDO">Concluído</option>
</select>
```

**Verificação:** Não executar testes ou navegador.

---

### Passo 3: Exibir e persistir

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Mostrar os novos status nos cards e incluí-los nos fluxos de nova avaliação, edição e salvamento.

```javascript
status_plano_aula: document.getElementById("avaliacaoStatusPlanoAula").value
```

**Verificação:** Revisão estática do diff, sem testes.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/adicionar-status-planos-avaliacoes.md`, `sistema/dashboard.html` e `sistema/supabase-avaliacoes.sql`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/adicionar-status-planos-avaliacoes.md sistema/dashboard.html sistema/supabase-avaliacoes.sql
git commit -m "feat: adicionar status de planos nas avaliacoes"
git push origin main
```

**Verificação:** Confirmar somente o resultado do versionamento.
