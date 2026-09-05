# Relatório de risco Git / LFS — aulas-senai

**Gerado em:** 04/09/2026
**Repositório:** `C:\fontes\aulas-senai` → `https://github.com/Gelvazio/aulas-senai.git`
**Método:** varredura do working tree por tamanho + inspeção dos blobs de
`git rev-list --objects --all` via `git cat-file --batch-check`

---

## 1. Veredito

**Nenhum arquivo excede 100 MB. Nada está bloqueado hoje.**

Mas três arquivos vivem perigosamente perto do limite, e **dois deles já foram
enviados ao GitHub** — estão gravados no histórico e não saem de lá sem reescrita.

| Faixa | O que significa no GitHub | Quantos arquivos |
|---|---|---|
| **> 100 MB** | 🔴 Push **rejeitado**. Exige Git LFS | **0** |
| **50 – 100 MB** | 🟡 Push aceito **com aviso** (`GH001: Large files detected`) | **3 no histórico · 3 no working tree** |
| **< 50 MB** | 🟢 Sem restrição | todo o resto |

---

## 2. Os arquivos na zona de aviso (50 – 100 MB)

### 2.1 Já gravados no histórico — e já no GitHub

Estes três blobs **já foram enviados**. O push passou, mas cada um gerou o aviso
`GH001` do GitHub.

| Tamanho | Margem até o bloqueio | Arquivo |
|---|---|---|
| **99,32 MB** | **0,68 MB** 🔴 | `sistema/INTRODUCAO_TIC-PRESIDENTE-GETULIO/Introdução a TIC-VICTOR-ANATO/Introdução a Tecnologia da Informação e Comunicação_BACKUP_ORIGINAL.pptx` |
| **98,19 MB** | **1,81 MB** 🔴 | `sistema/INTRODUCAO_TIC-PRESIDENTE-GETULIO/Introdução a TIC-VICTOR-ANATO/Introdução a Tecnologia da Informação e Comunicação.pptx` |
| **90,70 MB** | 9,30 MB 🟡 | `sistema/INTRODUCAO-TIC/AULAS/INTRODUCAO-TIC-VICTOR-ANATO.pptx` |

> ⚠️ **O `_BACKUP_ORIGINAL.pptx` foi apagado do working tree em 04/09/2026, mas
> continua no histórico.** Apagar um arquivo não o remove dos commits anteriores —
> os 99,3 MB seguem ocupando espaço no `.git` local e no GitHub, permanentemente,
> até que o histórico seja reescrito.

### 2.2 No working tree — hoje bloqueados pelo `.gitignore`

| Tamanho | Arquivo | Situação |
|---|---|---|
| 90,7 MB | `sistema/INTRODUCAO_TIC-PRESIDENTE-GETULIO/Introdução a TIC-VICTOR-ANATO/introducao-tic-corrigido.pptx` | ignorado por `*.pptx` |
| 90,7 MB | `sistema/INTRODUCAO-TIC/AULAS/INTRODUCAO-TIC-VICTOR-ANATO.pptx` | ignorado por `*.pptx` |
| 90,3 MB | `sistema/INTRODUCAO-TIC/AULAS/INTRODUCAO-TIC-GELVAZIO-CAMARGO.pptx` | ignorado por `*.pptx` |

A regra `*.pptx` foi acrescentada ao `.gitignore` e **impede que qualquer novo
`.pptx` entre no repositório**. É a proteção que segura o problema no presente —
mas ela não desfaz o que já está no histórico.

> 🔍 `introducao-tic-corrigido.pptx` e `INTRODUCAO-TIC-VICTOR-ANATO.pptx` são
> **byte a byte idênticos** (MD5 `86372f5906d6e9e1aa3e7740b2958c17`) — 90,7 MB
> duplicados no disco.

---

## 3. Onde está o risco real

O problema não é o que já passou; é o **próximo push**.

### Risco 1 — Um `.pptx` cruzar os 100 MB

`Introdução a Tecnologia da Informação e Comunicação.pptx` está a **1,8 MB** do
bloqueio. Uma única imagem nova nesse deck e o arquivo passa de 100 MB. A partir
daí, se a regra `*.pptx` for removida ou o arquivo for forçado com `git add -f`,
o push é **rejeitado**:

```
remote: error: File ... is 104.86 MB; this exceeds GitHub's file size limit of 100.00 MB
```

E a rejeição vale para o **push inteiro** — nenhum commit passa até o arquivo sair.

### Risco 2 — O `.gitignore` de `*.pptx` é largo demais

A regra bloqueia **52 arquivos `.pptx`, 443,6 MB**. Junto com os monstros de 90 MB,
saem também 44 apresentações de aula legítimas e pequenas:

| Tamanho | Arquivo |
|---|---|
| 29,9 MB | `Excel.pptx` |
| 25,2 MB | `MODELO_LAYOUT_APRESENTACAO.pptx` |
| 18,4 MB | `modelo-slide-senai-2026.pptx` (×3 cópias) |
| 9,2 MB | `Primeiro dia de aula_apresentacao.pptx` |
| ~2,7 MB | 16 arquivos `AULA-NN-SLIDES.pptx` |

Os slides de aula — o material didático que interessa versionar — **deixaram de
ser versionados junto com os arquivos-problema**.

### Risco 3 — O `.git` já pesa 403 MB

| Métrica | Valor |
|---|---|
| `size-pack` | **403,05 MiB** |
| Commits | 11 |
| Já enviados ao GitHub | 11 (0 pendentes) |

O GitHub recomenda repositórios **abaixo de 1 GB** e avisa formalmente a partir de
**5 GB**. 403 MB não é crítico, mas quase todo esse peso são os três `.pptx` de
~90 MB gravados no histórico — e ele só cresce.

---

## 4. Situação do Git LFS

| Item | Estado |
|---|---|
| Git LFS instalado | ✅ **git-lfs/3.7.1** |
| `.gitattributes` | ❌ **não existe** |
| Arquivos rastreados por LFS | **nenhum** |

**O LFS está disponível, mas desligado.** Nada no repositório passa por ele.

### O que o LFS resolve — e o que não resolve

| ✅ Resolve | ❌ Não resolve |
|---|---|
| Arquivos **novos** acima de 100 MB passam a ser aceitos | Blobs **já no histórico** continuam onde estão |
| O clone fica leve (baixa só os ponteiros) | O `.git` atual de 403 MB não encolhe |
| Versionar `.pptx` sem inchar o `.git` | Sozinho, não substitui `git lfs migrate` |

### Cotas do plano gratuito do GitHub

| Recurso | Limite free |
|---|---|
| Armazenamento LFS | **1 GB** |
| Banda LFS por mês | **1 GB** |
| Excedente | pacote pago de 50 GB |

⚠️ Com 443,6 MB de `.pptx`, migrar tudo para LFS consumiria **44% da cota gratuita
de armazenamento** logo de saída. E cada `clone` de um colaborador gasta banda.

---

## 5. Recomendações, em ordem de prioridade

### 1. Refinar o `.gitignore` — trocar o bloqueio total por um limite de tamanho

A regra `*.pptx` é uma marreta: barra 443 MB para conter 271 MB de problema.
Prefira ignorar **por nome os arquivos grandes** e liberar o resto:

```gitignore
# Apresentações grandes demais para o Git (usar Drive/OneDrive)
sistema/INTRODUCAO-TIC/AULAS/INTRODUCAO-TIC-*.pptx
sistema/INTRODUCAO_TIC-PRESIDENTE-GETULIO/Introdução a TIC-VICTOR-ANATO/*.pptx
```

Assim os 16 `AULA-NN-SLIDES.pptx` e os demais materiais voltam a ser versionados.

### 2. Ativar o LFS para `.pptx` — se quiser versioná-los mesmo

```bash
git lfs install
git lfs track "*.pptx"
git add .gitattributes
git commit -m "chore: rastreia .pptx via Git LFS"
```

Vale **apenas para arquivos novos**. Antes de fazer isso, some os `.pptx` que
pretende versionar e confira contra a cota de 1 GB.

### 3. Deduplicar antes de qualquer coisa

Dois arquivos idênticos de 90,7 MB e três cópias do `modelo-slide-senai-2026.pptx`
(18,4 MB cada). **Só isso são 127 MB** que não precisam existir:

- `introducao-tic-corrigido.pptx` ≡ `INTRODUCAO-TIC-VICTOR-ANATO.pptx` → manter um
- `modelo-slide-senai-2026.pptx` → centralizar em `sistema/GERADOR-AULAS/`

### 4. Emagrecer os arquivos na origem

Os `.pptx` gigantes são grandes por causa de mídia embutida. O
`modelo-slide-senai-2026.pptx`, por exemplo, tem um único GIF de **9,6 MB — 52% do
arquivo** (ver [modelo-slide-senai-2026-DETALHES.md](../../sistema/GERADOR-AULAS/modelo-slide-senai-2026-DETALHES.md)).
Recomprimir mídia costuma cortar 70–90% do peso e é a solução que não exige LFS
nem reescrita de histórico.

### 5. Reescrever o histórico — só se o `.git` de 403 MB incomodar

```bash
git lfs migrate import --include="*.pptx" --everything
```

⚠️ **Reescreve todos os commits.** Exige `git push --force`, invalida clones
existentes e precisa de backup antes. Só faz sentido se o tamanho do repositório
virar um problema concreto — hoje não é.

---

## 6. Referência: limites do GitHub

| Limite | Valor | Consequência |
|---|---|---|
| Tamanho de arquivo | **100 MB** | Push **rejeitado** |
| Aviso de arquivo grande | **50 MB** | Push aceito, com aviso `GH001` |
| Tamanho do repositório | **1 GB** recomendado · **5 GB** aviso formal | — |
| Push único | **2 GB** | Push rejeitado |
| LFS free — armazenamento | **1 GB** | Bloqueio de upload |
| LFS free — banda/mês | **1 GB** | Bloqueio de download |

---

## 7. Nota sobre o escopo

Este relatório foi pedido inicialmente para `C:\fontes\professor-senai\sistema`.
**Essa pasta não existe mais** — foi removida do disco durante esta sessão (estava
acessível numa consulta anterior e desapareceu na seguinte). A análise foi então
direcionada ao repositório ativo, `C:\fontes\aulas-senai`, que é onde o risco de
push efetivamente existe.

---

**Comandos de verificação usados**

```bash
# Arquivos grandes no working tree
find . -type f -size +40M -not -path "./.git/*" -printf "%s\t%p\n" | sort -rn

# Blobs grandes no histórico
git rev-list --objects --all \
  | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
  | awk '$1=="blob" && $3>52428800' | sort -k3 -rn

# Peso do repositório
git count-objects -vH
```
