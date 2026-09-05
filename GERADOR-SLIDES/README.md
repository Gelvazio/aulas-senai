# GERADOR DE SLIDES SENAI

Transforma um arquivo **Markdown** em uma apresentação **PowerPoint** já no padrão
visual institucional do projeto.

```
aula.md  ──▶  gerar_slides.py  ──▶  aula.pptx
                     │
             padrao_slides.json
             TEMPLATE-SENAI.pptx
```

---

## Uso rápido

```bash
C:\Python314\python.exe scripts\gerar_slides.py gerar EXEMPLOS\exemplo-aula.md
```

Saída: `SAIDA\exemplo-aula.pptx`

---

## Os três comandos

| Comando | O que faz |
|---|---|
| `validar <arq.md>` | Confere o Markdown contra as regras do padrão, sem gerar nada |
| `gerar <arq.md>` | Gera o `.pptx` final |
| `template` | Reconstrói `TEMPLATE-SENAI.pptx` a partir do PPTX institucional |

```bash
C:\Python314\python.exe scripts\gerar_slides.py validar MINHA-AULA.md
C:\Python314\python.exe scripts\gerar_slides.py gerar MINHA-AULA.md -o SAIDA\aula-01.pptx
```

---

## Markdown mínimo

```markdown
---
uc: Introdução à TIC
professor: Gelvazio Camargo
carga: 40 horas
---

# Introdução à TIC
Aula 01 — Fundamentos

## Objetivos
- Diferenciar hardware de software
- Organizar pastas e arquivos

# Bloco 1 — Fundamentos

## Hardware e Software
### Hardware
- O que se toca
### Software
- O que não se toca

> O hardware é a máquina. O software é o manual.
```

| Marcação | Vira |
|---|---|
| `#` (1ª vez) | Capa |
| `#` (demais) | Divisória de seção |
| `##` | Novo slide |
| `###` | Coluna |
| `-` | Bullet (2 espaços por nível) |
| `>` | Caixa de destaque |
| `\| a \| b \|` | Tabela |
| `![leg](img.png)` | Imagem |
| `::: notas … :::` | Notas do apresentador |

Sintaxe completa em [SINTAXE-MARKDOWN.md](SINTAXE-MARKDOWN.md).

---

## O padrão

| Item | Valor |
|---|---|
| Formato | 16:9 — 10 × 5,625 pol |
| Tema | Educação Profissional |
| Fonte | Roboto (fallback Arial) |
| Título | 36 pt capa · 30 pt slide |
| Corpo | 20 / 18 / 16 pt por nível |
| Mínimo | 15 slides por deck |
| Máximo | 6 bullets por slide |

Todos os números vivem em [`padrao_slides.json`](padrao_slides.json) e estão
justificados em [PADRAO-DE-SLIDES.md](PADRAO-DE-SLIDES.md).

---

## Requisitos

```bash
C:\Python314\python.exe -m pip install python-pptx
```

`python-pptx` 1.0.2 já está instalado neste ambiente.

---

## Documentação

| Arquivo | Conteúdo |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Regras de trabalho da pasta |
| [PADRAO-DE-SLIDES.md](PADRAO-DE-SLIDES.md) | O padrão e o porquê de cada regra |
| [SINTAXE-MARKDOWN.md](SINTAXE-MARKDOWN.md) | Linguagem de entrada |
| [padrao_slides.json](padrao_slides.json) | O padrão em forma de dado |
