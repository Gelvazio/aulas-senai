# Minhas Pendências no Dashboard

> **Substituída:** esta implementação baseada em `pendencias.json` foi migrada para o CRUD no Supabase, documentado em `docs/crud-minhas-pendencias.md`. O arquivo JSON local foi removido.

**Objetivo:** Adicionar a ferramenta “Minhas Pendências” ao dashboard do professor e exibir os dados de `sistema/pendencias.json` em um modal.

**Tech Stack:** HTML, CSS, JavaScript e JSON

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Corrigir e normalizar o arquivo de pendências | ✅ Concluído |
| 2 | Criar card e modal de pendências | ✅ Concluído |
| 3 | Implementar carregamento e renderização dos dados | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Corrigir o arquivo JSON

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/pendencias.json`

**Ação:** Corrigir a sintaxe JSON, preservar os registros existentes e normalizar o status de conclusão.

```json
[
  {
    "id": 1,
    "status": "PENDENTE"
  }
]
```

**Verificação:**

```powershell
Get-Content -Raw sistema/pendencias.json | ConvertFrom-Json
```

Esperado: o arquivo pode ser interpretado como um array JSON.

---

### Passo 2: Criar card e modal

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Adicionar o card “Minhas Pendências” em “Ferramentas do Professor” e um modal responsivo com resumo e lista de registros.

```html
<button class="admin-card" onclick="abrirModalPendencias()">
  <span class="admin-card-icon">🔔</span>
  <span class="admin-card-label">Minhas Pendências</span>
</button>
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "Minhas Pendências"
```

Esperado: o card e o título do modal estão presentes.

---

### Passo 3: Carregar e renderizar os dados

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Buscar `pendencias.json`, escapar dados textuais, renderizar cartões e tratar carregamento, lista vazia e erro.

```javascript
async function abrirModalPendencias() {
  const resposta = await fetch('pendencias.json', { cache: 'no-store' });
  const pendencias = await resposta.json();
  renderPendencias(pendencias);
}
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "fetch\('pendencias.json'"
```

Esperado: a função usa o arquivo JSON como fonte de dados.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/minhas-pendencias-dashboard.md`, `sistema/dashboard.html`, `sistema/pendencias.json`

**Ação:** Versionar e enviar as alterações ao branch principal.

```powershell
git add docs/minhas-pendencias-dashboard.md sistema/dashboard.html sistema/pendencias.json
git commit -m "feat: adicionar modal de pendencias do professor"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: os arquivos da tarefa não aparecem como alterações pendentes.
