# Converter INTRODUCAO-TIC-VICTOR-ANATO para Markdown

**Objetivo:** Ler o conteúdo da apresentação `INTRODUCAO-TIC-VICTOR-ANATO.pptx` e registrá-lo em um arquivo Markdown de mesmo nome.

**Tech Stack:** PowerPoint Open XML e Markdown

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Localizar e ler a apresentação | ✅ Concluído |
| 2 | Criar o arquivo Markdown com o conteúdo dos slides | ✅ Concluído |
| 3 | Commit e push | ✅ Concluído |

---

### Passo 1: Ler a apresentação

**Status:** ✅ Concluído

**Arquivo:** Ler `C:\fontes\aulas-senai\sistema\INTRODUCAO-TIC\AULAS\INTRODUCAO-TIC-VICTOR-ANATO.pptx`

**Ação:** Extrair, na ordem dos slides, os textos visíveis armazenados no pacote PowerPoint Open XML.

**Verificação:**

```powershell
Test-Path 'C:\fontes\aulas-senai\sistema\INTRODUCAO-TIC\AULAS\INTRODUCAO-TIC-VICTOR-ANATO.pptx'
```

Esperado: arquivo localizado para leitura.

---

### Passo 2: Criar o Markdown

**Status:** ✅ Concluído

**Arquivo:** Criar `C:\fontes\aulas-senai\sistema\INTRODUCAO-TIC\AULAS\INTRODUCAO-TIC-VICTOR-ANATO.md`

**Ação:** Organizar o conteúdo textual por slide, preservando a sequência original.

**Verificação:**

```powershell
Get-Content -Raw 'C:\fontes\aulas-senai\sistema\INTRODUCAO-TIC\AULAS\INTRODUCAO-TIC-VICTOR-ANATO.md'
```

Esperado: Markdown preenchido com as seções de todos os slides.

---

### Passo 3: Commit e push

**Status:** ✅ Concluído

**Arquivo:** Versionar os arquivos criados nesta tarefa.

**Ação:** Adicionar os arquivos ao Git, criar commit descritivo e enviar ao branch principal remoto.

**Verificação:**

```powershell
git status --short
```

Esperado: alterações da tarefa versionadas.
