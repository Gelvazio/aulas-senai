# Toggle Ensalado no card da matéria

**Objetivo:** Editar o campo `ensalado` diretamente no card da matéria.

**Tech Stack:** HTML, CSS, JavaScript e Supabase REST

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Remover checkbox do formulário | ✅ Concluído |
| 2 | Adicionar toggle no card | ✅ Concluído |
| 3 | Salvar alteração imediatamente | ✅ Concluído |
| 4 | Sincronizar filtro e tratar erro | ✅ Concluído |
| 5 | Revisar sem testes | ✅ Concluído |
| 6 | Commit e push | ✅ Concluído |

## Comportamento

- Professor: toggle editável diretamente no card.
- Aluno: indicador textual `SIM` ou `NÃO`.
- Erro no banco: restaurar o valor anterior do toggle.

## Verificação

Revisão estática do diff, sem testes, navegador ou servidor.
