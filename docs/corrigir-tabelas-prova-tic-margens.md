# Corrigir Tabelas da Prova de TIC nas Margens

**Objetivo:** Identificar e corrigir tabelas da prova que ultrapassam as margens da página.

**Tech Stack:** Python, python-docx, LibreOffice, DOCX, PNG

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Reproduzir e localizar o problema visual | 🔄 Em progresso |
| 2 | Corrigir a geometria das tabelas no gerador | ⬜ Pendente |
| 3 | Gerar novamente e verificar todas as páginas | ⬜ Pendente |
| 4 | Commit e publicação | ⬜ Pendente |

---

### Passo 1: Diagnosticar

**Status:** 🔄 Em progresso

**Arquivo:** Analisar `C:\fontes\professor-senai\sistema\INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO\AVALIACOES_CRIADAS\PROVA_SIMPLES_UC1_TIC_EQUIPES_2H.docx`.

**Ação:** Renderizar o documento e inspecionar todas as páginas para localizar as tabelas fora das margens.

---

### Passo 2: Corrigir a causa

**Status:** ⬜ Pendente

**Arquivo:** Modificar `C:\fontes\professor-senai\scripts\criar_prova_simples_uc1_tic_equipes.py`.

**Ação:** Aplicar largura fixa real em DXA ao elemento da tabela, à grade e às células.

---

### Passo 3: Verificar o documento corrigido

**Status:** ⬜ Pendente

**Ação:** Regenerar, renderizar novamente e inspecionar todas as páginas.

---

### Passo 4: Commit e publicação

**Status:** ⬜ Pendente

**Ação:** Versionar o gerador, o DOCX corrigido e esta documentação; publicar no branch `main`.

