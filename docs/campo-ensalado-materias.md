# Campo Ensalado nas matérias

**Objetivo:** Registrar se uma matéria está ensalada e permitir filtrar a lista.

**Tech Stack:** HTML, CSS, JavaScript, Supabase REST e PostgreSQL

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Adicionar coluna booleana no SQL | ✅ Concluído |
| 2 | Adicionar checkbox na matéria | ✅ Concluído |
| 3 | Exibir indicador nos cards | ✅ Concluído |
| 4 | Adicionar filtros da lista | ✅ Concluído |
| 5 | Revisar sem testes | ✅ Concluído |
| 6 | Commit e push | ✅ Concluído |

## Regras

- `ensalado = true`: exibir `ENSALADO: SIM`.
- `ensalado = false` ou coluna ausente: exibir `ENSALADO: NÃO`.
- O filtro inicial é `Mostrar Todos`.
- `Somente Ensalado` oculta as matérias com valor `NÃO`.

## Verificação

Revisão estática do diff, sem testes, navegador ou servidor.
