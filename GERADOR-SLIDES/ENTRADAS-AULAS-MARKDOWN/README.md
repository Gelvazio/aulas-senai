# ENTRADAS-AULAS-MARKDOWN

Coloque aqui os arquivos Markdown (`.md`) das aulas que deseja converter em apresentações `.pptx`.

## Fluxo

1. **Criar/colocar** arquivo `.md` nesta pasta
2. **Avisar o Claude** o nome do arquivo
3. Claude **valida** e **gera** o `.pptx`
4. Status é registrado em `../TASKS/rastreamento.json`
5. Arquivo gerado fica em `../SAIDA/`

## Formato do Markdown

Siga a sintaxe em `../SINTAXE-MARKDOWN.md`.

Exemplo mínimo:
```markdown
---
uc: Introdução à TIC
professor: Gelvazio Camargo
carga: 40h
data: 2026-09-05
---

# Aula 1: Conceitos Básicos

## Slide 1: Introdução
Conteúdo aqui.

## Slide 2: Definições
- Ponto 1
- Ponto 2
```

## Validação

Toda entrada é validada antes de gerar. Erros são reportados em `../TASKS/rastreamento.json`.

Mínimo: 15 slides. Use `--forcar` para exceções justificadas.
