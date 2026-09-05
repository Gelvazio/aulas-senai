# Criar padrão e gerador de slides — GERADOR-SLIDES

**Objetivo:** Documentar o padrão oficial de criação de slides do projeto e entregar um gerador em Python que leia um arquivo Markdown, aplique o padrão e produza o `.pptx` final.

**Tech Stack:** Python 3.14, `python-pptx` 1.0.2, OOXML/PPTX, Markdown

**Pasta alvo:** `C:\fontes\aulas-senai\GERADOR-SLIDES`

**Decisão de linguagem:** Python. O `python-pptx` abre e edita `.pptx` existente, preservando tema, masters, layouts e mídia — o que o PptxGenJS (JavaScript) não faz. Requisito confirmado pelo usuário.

---

## Padrão extraído do arquivo base

Fonte: `GERADOR-SLIDES/SLIDE-BASE-EXEMPLO-GELVAZIO-CAMARGO-ITIC.pptx` (116 slides, 90 MB de mídia).

| Propriedade | Valor medido |
|---|---|
| Dimensão | 9144000 x 5143500 EMU = 10 x 5,625 pol = 25,4 x 14,29 cm |
| Proporção | 16:9 |
| Tema | "Educação Profissional" |
| Fonte dominante | Roboto (762 ocorrências) / Arial (101) |
| Corpo dominante | 20pt (312) e 16pt (310) |
| Título | 36pt |
| Layouts usados | TITLE_ONLY (91), TITLE_AND_TWO_COLUMNS (22), TITLE_AND_BODY (2), TITLE (1) |
| Paleta | accent1 #4285F4 · accent2 #212121 · accent3 #78909C · accent4 #FFAB40 · accent5 #0097A7 · accent6 #EEFF41 |

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Extrair e medir o padrão do PPTX base | ✅ Concluído |
| 2 | Criar `padrao_slides.json` com o padrão em forma de configuração | ✅ Concluído |
| 3 | Criar `PADRAO-DE-SLIDES.md` — documentação completa do padrão | ✅ Concluído |
| 4 | Criar `SINTAXE-MARKDOWN.md` — referência da linguagem de entrada | ✅ Concluído |
| 5 | Criar `gerar_slides.py` — gerador Python | ✅ Concluído |
| 6 | Criar `EXEMPLOS/exemplo-aula.md` — entrada de demonstração | ✅ Concluído |
| 7 | Gerar `TEMPLATE-SENAI.pptx` enxuto a partir do base | ✅ Concluído |
| 8 | Executar o gerador sobre o exemplo e validar a saída | ✅ Concluído |
| 9 | Criar `README.md` e `CLAUDE.md` da pasta | ✅ Concluído |
| 10 | Commit | ✅ Concluído |

---

### Passo 1: Extrair e medir o padrão do PPTX base

**Status:** ✅ Concluído

**Arquivo:** Ler `GERADOR-SLIDES\SLIDE-BASE-EXEMPLO-GELVAZIO-CAMARGO-ITIC.pptx`

**Ação:** Abrir o PPTX como ZIP, ler `ppt/presentation.xml`, `ppt/theme/theme1.xml` e os `slideLayouts` para medir dimensão, paleta, fontes, escala tipográfica e layouts efetivamente usados.

**Verificação:** Valores registrados na tabela "Padrão extraído do arquivo base" acima.

---

### Passo 2: Criar `padrao_slides.json`

**Status:** ✅ Concluído

**Arquivo:** Criar `GERADOR-SLIDES\padrao_slides.json`

**Ação:** Registrar em JSON a dimensão, a paleta, a família tipográfica, a escala de tamanhos, os limites de composição (mínimo de 15 slides, máximo de 6 bullets por slide) e o mapa de layouts. O gerador lê este arquivo — o padrão fica em dado, não em código.

**Verificação:**

```powershell
C:\Python314\python.exe -c "import json;print(json.load(open(r'C:\fontes\aulas-senai\GERADOR-SLIDES\padrao_slides.json',encoding='utf-8'))['tipografia'])"
```

Esperado: dicionário com a escala tipográfica.

---

### Passo 3: Criar `PADRAO-DE-SLIDES.md`

**Status:** ✅ Concluído

**Arquivo:** Criar `GERADOR-SLIDES\PADRAO-DE-SLIDES.md`

**Ação:** Documentar especificação técnica, paleta, tipografia, grade, tipos de slide, estrutura obrigatória do deck SENAI, regras de composição, checklist de conformidade e erros comuns.

**Verificação:**

```powershell
Get-Content C:\fontes\aulas-senai\GERADOR-SLIDES\PADRAO-DE-SLIDES.md -TotalCount 5
```

Esperado: cabeçalho do documento.

---

### Passo 4: Criar `SINTAXE-MARKDOWN.md`

**Status:** ✅ Concluído

**Arquivo:** Criar `GERADOR-SLIDES\SINTAXE-MARKDOWN.md`

**Ação:** Documentar a linguagem de entrada: front-matter, `#` capa, `##` slide, `###` coluna, bullets, `>` destaque, imagem, tabela, bloco de notas e diretivas de layout.

**Verificação:**

```powershell
Get-Content C:\fontes\aulas-senai\GERADOR-SLIDES\SINTAXE-MARKDOWN.md -TotalCount 5
```

Esperado: cabeçalho do documento.

---

### Passo 5: Criar `gerar_slides.py`

**Status:** ✅ Concluído

**Arquivo:** Criar `GERADOR-SLIDES\scripts\gerar_slides.py`

**Ação:** Implementar parser de Markdown, motor de composição com quebra automática por excesso de conteúdo, aplicação da tipografia e paleta, e três subcomandos: `template`, `gerar` e `validar`.

**Verificação:**

```powershell
C:\Python314\python.exe C:\fontes\aulas-senai\GERADOR-SLIDES\scripts\gerar_slides.py --help
```

Esperado: ajuda com os três subcomandos.

---

### Passo 6: Criar exemplo de entrada

**Status:** ✅ Concluído

**Arquivo:** Criar `GERADOR-SLIDES\EXEMPLOS\exemplo-aula.md`

**Ação:** Escrever um Markdown de demonstração exercitando todos os recursos da sintaxe e atingindo o mínimo de 15 slides.

**Verificação:**

```powershell
C:\Python314\python.exe C:\fontes\aulas-senai\GERADOR-SLIDES\scripts\gerar_slides.py validar C:\fontes\aulas-senai\GERADOR-SLIDES\EXEMPLOS\exemplo-aula.md
```

Esperado: relatório sem erros e contagem maior ou igual a 15 slides.

---

### Passo 7: Gerar `TEMPLATE-SENAI.pptx`

**Status:** ✅ Concluído

**Arquivo:** Criar `GERADOR-SLIDES\TEMPLATE-SENAI.pptx`

**Ação:** Executar `gerar_slides.py template`, que abre o PPTX base, remove os 116 slides e as relações de mídia, e salva um template enxuto preservando tema, master e layouts.

**Verificação:**

```powershell
C:\Python314\python.exe -c "from pptx import Presentation;p=Presentation(r'C:\fontes\aulas-senai\GERADOR-SLIDES\TEMPLATE-SENAI.pptx');print('slides',len(p.slides.__iter__.__self__._sldIdLst),'layouts',len(p.slide_layouts))"
```

Esperado: zero slides e seis layouts.

---

### Passo 8: Executar o gerador e validar a saída

**Status:** ✅ Concluído

**Arquivo:** Criar `GERADOR-SLIDES\SAIDA\exemplo-aula.pptx`

**Ação:** Rodar o gerador sobre o exemplo e conferir contagem de slides, dimensão e fontes do arquivo produzido.

**Verificação:**

```powershell
C:\Python314\python.exe C:\fontes\aulas-senai\GERADOR-SLIDES\scripts\gerar_slides.py gerar C:\fontes\aulas-senai\GERADOR-SLIDES\EXEMPLOS\exemplo-aula.md
```

Esperado: mensagem de sucesso com o número de slides gerados.

---

### Passo 9: Criar `README.md` e `CLAUDE.md`

**Status:** ✅ Concluído

**Arquivo:** Criar `GERADOR-SLIDES\README.md` e `GERADOR-SLIDES\CLAUDE.md`

**Ação:** README com uso rápido e fluxo. CLAUDE.md com as regras da pasta e o bloco obrigatório de grafo na raiz.

**Verificação:**

```powershell
Get-ChildItem C:\fontes\aulas-senai\GERADOR-SLIDES
```

Esperado: os dois arquivos presentes.

---

### Passo 10: Commit

**Status:** ✅ Concluído

**Arquivo:** Versionar os arquivos criados nesta tarefa.

**Ação:** `git add` dos arquivos da tarefa e commit descritivo. Sem push automático.

**Verificação:**

```powershell
git -C C:\fontes\aulas-senai log --oneline -1
```

Esperado: commit da tarefa no topo.

---

## Resultado

**Concluído em 05-09-2026.**

| Entrega | Caminho |
|---|---|
| Regras da pasta | `GERADOR-SLIDES/CLAUDE.md` |
| Uso rápido | `GERADOR-SLIDES/README.md` |
| Padrão completo | `GERADOR-SLIDES/PADRAO-DE-SLIDES.md` |
| Sintaxe de entrada | `GERADOR-SLIDES/SINTAXE-MARKDOWN.md` |
| Padrão em dado | `GERADOR-SLIDES/padrao_slides.json` |
| Gerador | `GERADOR-SLIDES/scripts/gerar_slides.py` |
| Exemplo de entrada | `GERADOR-SLIDES/EXEMPLOS/exemplo-aula.md` |
| Template enxuto | `GERADOR-SLIDES/TEMPLATE-SENAI.pptx` |
| Saída de demonstração | `GERADOR-SLIDES/SAIDA/exemplo-aula.pptx` |

**Verificação executada:**

- `validar` sobre o exemplo: 21 slides, nenhum problema
- `template`: 116 slides removidos, 6 layouts preservados, 94 MB para 5,94 MB
- `gerar`: 21 slides gerados, 16:9 confirmado em 10,000 x 5,625 pol
- Conferência do PPTX de saída: 2 slides de colunas, 2 tabelas, 3 notas de apresentador,
  3 divisórias de seção e rodapé numerado em 20 dos 21 slides

**Ajuste de escopo durante a execução:** por pedido do usuário, os scripts Python foram
movidos para `GERADOR-SLIDES/scripts/` e a pasta ganhou `CLAUDE.md` próprio.

**Pendência em aberto:** blocos reutilizáveis para os slides de estrutura obrigatória de
UC (apresentação do professor, capacidades, conhecimentos, combinados, avaliação, AVA).
