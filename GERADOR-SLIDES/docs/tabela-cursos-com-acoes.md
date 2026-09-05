# Tabela de Cursos com Coluna AÇÕES

**Objetivo:** Converter a página de cursos de cards para tabela HTML com coluna de ações no final

**Tech Stack:** Django, HTML, CSS, JavaScript (Vanilla)

**Arquivo Principal:** `dashboard/templates/dashboard/cursos.html`

**Data Criação:** 05-09-2026  
**Data Conclusão:** 05-09-2026  
**Tempo Decorrido:** ~20 minutos  

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Atualizar CLAUDE.md com regra de `docs/` obrigatório | ✅ Concluído |
| 2 | Criar pasta `docs/` e arquivo de tarefa | ✅ Concluído |
| 3 | Reescrever template com tabela HTML | ✅ Concluído |
| 4 | Atualizar CSS para layout de tabela | ✅ Concluído |
| 5 | Simplificar JavaScript (remover funções de cards) | ✅ Concluído |
| 6 | Fazer commit com mensagem descritiva | 🔄 Em progresso |

---

### Passo 1: Atualizar CLAUDE.md com regra de documentação

**Status:** ✅ Concluído

**Arquivo:** `CLAUDE.md`

**Ação:** Adicionar seção obrigatória sobre documentação em `docs/` no início do arquivo

**Resultado:** ✅ Seção adicionada com ícones e regras claras

---

### Passo 2: Criar pasta `docs/` e este arquivo

**Status:** 🔄 Em progresso

**Pasta:** `docs/`

**Arquivo:** `docs/tabela-cursos-com-acoes.md`

**Ação:** Criar estrutura de documentação com plano detalhado

**Verificação:**

```powershell
Test-Path "C:\fontes\aulas-senai\GERADOR-SLIDES\docs"
```

Esperado: `True` (pasta existe)

---

### Passo 3: Reescrever template com tabela HTML

**Status:** ⬜ Pendente

**Arquivo:** `dashboard/templates/dashboard/cursos.html`

**Ação:** Substituir exibição de cards por tabela HTML com colunas:
- ID
- Nome do Curso
- Unidade
- Qtd Matérias
- AÇÕES (Matérias, Editar, Excluir)

**Mudanças esperadas:**
- Remover classes CSS de cards (`.curso-card`, `.curso-card-header`, etc)
- Adicionar classes CSS para tabela (`.tabela-cursos`, `.col-*`)
- Manter dados do contexto Django (cursos, curso.id, curso.nome, curso.unidade, curso.materias)

**Verificação:**

```powershell
Select-String -Path "C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\templates\dashboard\cursos.html" -Pattern "<table>" -Quiet
```

Esperado: `True` (arquivo contém `<table>`)

---

### Passo 4: Atualizar CSS para layout de tabela

**Status:** ⬜ Pendente

**Arquivo:** `dashboard/templates/dashboard/cursos.html` (bloco `<style>`)

**Ação:** 
- Remover CSS de cards (`.curso-card*`, `.curso-materias-summary`, etc)
- Adicionar CSS de tabela (`.tabela-cursos`, `thead`, `tbody`, `tr:hover`)
- Manter botões de ação (`.btn-acao`, `.btn-materias`, `.btn-editar`, `.btn-excluir`)

**CSS a adicionar:**

```css
.tabela-cursos {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    overflow: hidden;
}
.tabela-cursos table {
    width: 100%;
    border-collapse: collapse;
}
.tabela-cursos thead {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}
.tabela-cursos th {
    padding: 16px;
    text-align: left;
    font-weight: 700;
    font-size: 14px;
}
.tabela-cursos tbody tr {
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.15s;
}
.tabela-cursos tbody tr:hover {
    background-color: #f8f9fa;
}
.tabela-cursos td {
    padding: 16px;
    font-size: 14px;
    color: #333;
}
.col-acoes {
    text-align: center;
    white-space: nowrap;
}
```

**Verificação:**

```powershell
Select-String -Path "C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\templates\dashboard\cursos.html" -Pattern ".tabela-cursos" -Quiet
```

Esperado: `True` (CSS contém classes de tabela)

---

### Passo 5: Simplificar JavaScript

**Status:** ⬜ Pendente

**Arquivo:** `dashboard/templates/dashboard/cursos.html` (bloco `<script>`)

**Ação:** 
- Remover funções: `toggleActions`, `acessarCurso`
- Manter funções: `abrirMateriasModal`, `editarCurso`, `excluirCurso`
- Adaptar seletores para usar `.col-nome` em vez de `.curso-card-header h5`

**Verificação:**

```powershell
$content = Get-Content "C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\templates\dashboard\cursos.html" -Raw
$content -contains "toggleActions" -eq $false -and $content -contains "abrirMateriasModal" -eq $true
```

Esperado: `True` (toggleActions removido, abrirMateriasModal mantido)

---

### Passo 6: Fazer commit

**Status:** ✅ Concluído

**Ação:** Commit com mensagem descritiva

**Comando:**

```powershell
cd "C:\fontes\aulas-senai"
git add .
git commit -m "feat(GERADOR-SLIDES): converter tabela de cursos de cards para HTML table com coluna AÇÕES

- Reescrever template cursos.html para exibir cursos em tabela ao invés de cards
- Adicionar coluna AÇÕES com botões: Matérias, Editar, Excluir
- Colunas da tabela: ID, Nome do Curso, Unidade, Qtd Matérias, AÇÕES
- Simplificar CSS para tabela ao invés de cards
- Remover funções JavaScript não utilizadas (toggleActions, acessarCurso)
- Manter funcionalidade de botões: abrirMateriasModal, editarCurso, excluirCurso

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

**Verificação:**

```powershell
cd "C:\fontes\aulas-senai"
git log --oneline -1
```

Esperado: Commit com mensagem começando em `feat(GERADOR-SLIDES): converter tabela de cursos`

---

## Riscos e Considerações

| Risco | Mitigação |
|-------|-----------|
| Perda de funcionalidade | Manter todas as funções de ação (editar, deletar, ver matérias) |
| CSS quebrado | Testar em navegador após cada mudança |
| Dados não exibindo | Validar que `curso.nome` está sendo exibido corretamente |
| Botões não respondendo | Manter event handlers corretos em JavaScript |

---

## Arquivos Afetados

- ✅ `CLAUDE.md` — adicionar regra de documentação
- ⬜ `dashboard/templates/dashboard/cursos.html` — converter cards para tabela
- ⬜ Git — novo commit

---

## Próximos Passos Após Conclusão

1. Testar página em navegador
2. Validar que tabela exibe corretamente
3. Testar botões de ação (Matérias, Editar, Excluir)
4. Executar `graphify update` para atualizar grafo
5. Documentar conclusão neste arquivo

---
