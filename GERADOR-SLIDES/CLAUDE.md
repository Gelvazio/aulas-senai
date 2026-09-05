# CLAUDE.md — GERADOR-SLIDES

**Data de Última Atualização:** 05-09-2026
**Pasta:** `C:\fontes\aulas-senai\GERADOR-SLIDES`
**Objetivo:** padronizar e automatizar a criação de apresentações `.pptx` do projeto

---

## 1. O que é esta pasta

`GERADOR-SLIDES/` é uma **área de ferramenta**, não uma Unidade Curricular. Não aplicar
a ela a estrutura obrigatória de UC (`AULAS/`, `MATERIAIS/`) nem listá-la como matéria.

Ela contém três coisas:

1. **O padrão visual** de slides do projeto, medido do arquivo institucional
2. **O gerador em Python** que transforma Markdown em `.pptx` aplicando esse padrão
3. **A documentação** de como escrever a entrada e de por que cada regra existe

---

## 2. Estrutura da pasta

| Caminho | Papel |
|---|---|
| `CLAUDE.md` | Este documento — regras de trabalho da pasta |
| `README.md` | Uso rápido |
| `PADRAO-DE-SLIDES.md` | Padrão completo: dimensões, paleta, tipografia, grade, regras |
| `SINTAXE-MARKDOWN.md` | Linguagem de entrada aceita pelo gerador |
| `padrao_slides.json` | **Fonte da verdade técnica** — o padrão em forma de dado |
| `scripts/` | Scripts Python. Todo `.py` desta pasta mora aqui |
| `scripts/gerar_slides.py` | O gerador |
| `SLIDE-BASE-EXEMPLO-GELVAZIO-CAMARGO-ITIC.pptx` | Referência visual original (116 slides) |
| `TEMPLATE-SENAI.pptx` | Template enxuto, gerado a partir do base |
| `EXEMPLOS/` | Markdowns de demonstração |
| `SAIDA/` | Apresentações geradas |
| `ESTRUTURA-PROVAS/` | Material de provas — não faz parte do gerador |
| `INTRODUCAO-TIC-GELVAZIO-CAMARGO.md` | Documento mestre de referência da UC |

---

## 3. Regras inegociáveis

### 3.1 Python, sempre

Slides `.pptx` são gerados **em Python**, com `python-pptx`. Não usar JavaScript
(PptxGenJS) para este fim: ele não abre `.pptx` existente e destruiria tema, master,
layouts e mídia do arquivo institucional.

Interpretador do projeto:

```bash
C:\Python314\python.exe
```

### 3.2 Todo script Python vai para `scripts/`

Nenhum `.py` solto na raiz de `GERADOR-SLIDES/`. O gerador resolve os caminhos a partir
da pasta acima de `scripts/`, então mover um script para fora **quebra** a localização
do `padrao_slides.json` e do template.

### 3.3 Nunca criar o PPTX do zero

Toda geração parte de `TEMPLATE-SENAI.pptx`. Se ele não existir, o gerador o constrói
sozinho a partir do arquivo base, removendo os 116 slides e preservando tema, master e
os 6 layouts.

### 3.4 O padrão mora no JSON, não no código

Mudança de cor, fonte, tamanho, margem ou limite é edição de `padrao_slides.json`.
Alterar valores dentro de `gerar_slides.py` é violação do padrão — torna a regra
invisível e não rastreável.

### 3.5 Mínimo de 15 slides

Regra do projeto (`CLAUDE.md` da raiz). O validador trata violação como **ERRO** e
bloqueia a geração. `--forcar` existe para casos excepcionais e deve ser justificado.

### 3.6 Piso tipográfico de 14 pt

Nada abaixo de 14 pt em slide projetado. Se o texto não couber, o conteúdo é que está
grande demais — divida o slide.

---

## 4. Como usar

### Gerar uma apresentação

```bash
C:\Python314\python.exe scripts\gerar_slides.py gerar EXEMPLOS\exemplo-aula.md
```

Saída em `SAIDA\<nome-do-md>.pptx`.

### Conferir antes de gerar

```bash
C:\Python314\python.exe scripts\gerar_slides.py validar EXEMPLOS\exemplo-aula.md
```

### Reconstruir o template

```bash
C:\Python314\python.exe scripts\gerar_slides.py template
```

Necessário apenas quando o arquivo base institucional for atualizado.

### Opções úteis

| Opção | Efeito |
|---|---|
| `-o <arquivo>` | Define o caminho de saída |
| `-t <template>` | Usa outro template |
| `--uc`, `--professor`, `--carga`, `--data` | Sobrescrevem o front-matter |
| `--forcar` | Gera mesmo com ERRO de validação |

---

## 5. Fluxo de trabalho

```
Markdown da aula
      ↓
validar   →  corrige avisos e erros
      ↓
gerar     →  aplica padrão sobre TEMPLATE-SENAI.pptx
      ↓
SAIDA/*.pptx  →  revisão humana no PowerPoint
```

O gerador entrega um deck **estruturalmente correto**. Ajuste fino de imagens e
posicionamento continua sendo trabalho humano no PowerPoint.

---

## 6. Ao alterar o padrão

1. Editar `padrao_slides.json`
2. Atualizar a seção correspondente de `PADRAO-DE-SLIDES.md` — os dois devem concordar
3. Regerar o exemplo e conferir a saída
4. Registrar a mudança em `docs/` conforme a skill `documentacao-padrao`
5. Commit

Se a mudança for de **sintaxe de entrada**, atualizar também `SINTAXE-MARKDOWN.md`.

---

## 7. Checklist de conformidade

- [x] Padrão medido do arquivo institucional, não inventado
- [x] `padrao_slides.json` como fonte da verdade técnica
- [x] Gerador em Python com `python-pptx`
- [x] Scripts isolados em `scripts/`
- [x] Validador com mínimo de 15 slides
- [x] Documentação do padrão e da sintaxe
- [x] Exemplo funcional gerando 21 slides
- [ ] Slides de estrutura obrigatória de UC (apresentação, capacidades, AVA) como
      blocos reutilizáveis — **em aberto**

---

## 8. Relação com outras pastas

| Pasta | Relação |
|---|---|
| `sistema/GERADOR-INFOGRAFICOS/` | Padrão de **infográficos** (HTML/CSS) — outro produto |
| `sistema/GERADOR-AULAS/` | Modelo pedagógico de aula e `modelo-slide-senai-2026.pptx` |
| `sistema/INTRODUCAO-TIC/` | UC que consome os slides gerados aqui |
| `docs/` | Documentação de cada tarefa executada |

---

## 🔗 Grafo de conhecimento — SEMPRE na raiz do projeto

⚠️ **Esta pasta NÃO tem, e não deve ter, uma pasta `graphify-out/` própria.**

O grafo de conhecimento do projeto existe em **um único lugar**:

```
C:\fontes\aulas-senai/graphify-out/
```

### Onde buscar as informações

Ao precisar de contexto do grafo (relatório, nós, comunidades, arquivos
relacionados), leia **sempre** a partir da raiz — nunca de uma cópia local:

| Arquivo | Caminho a partir da raiz |
|---|---|
| Relatório legível | `graphify-out/GRAPH_REPORT.md` |
| Grafo completo (JSON) | `graphify-out/graph.json` |
| Visualização | `graphify-out/graph.html` |

### Onde atualizar o grafo

A atualização **também acontece apenas na raiz**. Rodar o graphify dentro de
uma subpasta cria um segundo grafo, parcial e desatualizado:

```bash
cd C:\fontes\aulas-senai
C:\Users\gelva\.local\bin\graphify.exe update .
```

❌ **Nunca** executar `graphify update` a partir desta pasta.
❌ **Nunca** criar `graphify-out/` aqui — o `.gitignore` já bloqueia essa pasta
fora da raiz.
