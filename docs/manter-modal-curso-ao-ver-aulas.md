# Manter modal do curso ao ver aulas

**Objetivo:** Abrir as aulas sobre a lista de matérias e voltar ao modal do curso ao fechar.

**Tech Stack:** HTML, CSS e JavaScript

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Identificar o fechamento indevido | ✅ Concluído |
| 2 | Manter modal do curso aberto | ✅ Concluído |
| 3 | Corrigir camadas e tecla Esc | ✅ Concluído |
| 4 | Revisar sem testes | ✅ Concluído |
| 5 | Commit e push | ✅ Concluído |

## Causa

`abrirMateriaDoCurso()` fechava explicitamente o modal do curso. O modal de aulas também possuía camada inferior, impedindo sua sobreposição correta.

## Verificação

Revisão estática do diff, sem testes, navegador ou servidor.
