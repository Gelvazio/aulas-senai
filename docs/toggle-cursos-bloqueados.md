# Toggle para cursos bloqueados

**Objetivo:** Ocultar inicialmente cursos bloqueados e permitir que o professor os mostre com um toggle que também habilita suas notificações.

**Tech Stack:** HTML, CSS e JavaScript

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Adicionar toggle após Minhas Pendências | ✅ Concluído |
| 2 | Ocultar cards bloqueados inicialmente | ✅ Concluído |
| 3 | Controlar notificação e animação | ✅ Concluído |
| 4 | Revisar sem testes | ✅ Concluído |
| 5 | Commit e push | ✅ Concluído |

## Comportamento

- Toggle desligado: cursos bloqueados ficam ocultos e não notificam.
- Toggle ligado: cursos bloqueados aparecem e ativam contador, borda e animação quando possuem pendências.
- O estado inicial sempre é desligado ao carregar o dashboard.

## Verificação

Revisão estática do diff, sem testes, navegador ou servidor.
