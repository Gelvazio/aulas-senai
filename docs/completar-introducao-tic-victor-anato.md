# Completar INTRODUCAO-TIC-VICTOR-ANATO

**Objetivo:** Transformar o arquivo Markdown extraído da apresentação em um documento mestre que contemple integralmente as dez aulas da UC e preserve o material original.

**Tech Stack:** Markdown

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Consolidar as dez aulas no documento mestre | ✅ Concluído |
| 2 | Preservar o conteúdo original da apresentação | ✅ Concluído |
| 3 | Commit e push | ✅ Concluído |

---

### Passo 1: Consolidar as dez aulas

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\aulas-senai\sistema\INTRODUCAO-TIC\AULAS\INTRODUCAO-TIC-VICTOR-ANATO.md`

**Ação:** Inserir integralmente e na ordem pedagógica o conteúdo dos arquivos `AULA-01` até `AULA-10`, incluindo objetivos, conteúdo, práticas, recursos, avaliação, tarefas e observações.

**Verificação:**

```powershell
Select-String -Path 'C:\fontes\aulas-senai\sistema\INTRODUCAO-TIC\AULAS\INTRODUCAO-TIC-VICTOR-ANATO.md' -Pattern 'AULA 01','AULA 10'
```

Esperado: as dez aulas aparecem no documento mestre.

---

### Passo 2: Preservar o material original

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\aulas-senai\sistema\INTRODUCAO-TIC\AULAS\INTRODUCAO-TIC-VICTOR-ANATO.md`

**Ação:** Manter a transcrição dos 116 slides em uma seção complementar, com hierarquia Markdown ajustada.

**Verificação:**

```powershell
Select-String -Path 'C:\fontes\aulas-senai\sistema\INTRODUCAO-TIC\AULAS\INTRODUCAO-TIC-VICTOR-ANATO.md' -Pattern 'Slide 116'
```

Esperado: o último slide original permanece presente.

---

### Passo 3: Commit e push

**Status:** ✅ Concluído

**Arquivo:** Versionar os arquivos modificados nesta tarefa.

**Ação:** Adicionar somente os arquivos da tarefa, criar commit descritivo e enviar ao branch principal remoto.

**Verificação:**

```powershell
git status --short
```

Esperado: alterações da tarefa versionadas.
