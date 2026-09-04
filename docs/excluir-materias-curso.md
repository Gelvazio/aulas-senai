# Excluir matérias do curso

**Objetivo:** Adicionar ao card da matéria um botão para removê-la com segurança.

**Tech Stack:** HTML, CSS, JavaScript e Supabase REST

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Adicionar botão Excluir | ✅ Concluído |
| 2 | Implementar confirmação e exclusão | ✅ Concluído |
| 3 | Preservar matérias compartilhadas | ✅ Concluído |
| 4 | Revisar sem testes | ✅ Concluído |
| 5 | Commit e push | ✅ Concluído |

## Regra de exclusão

O vínculo com o curso atual é removido. A matéria só é apagada da tabela `materia` quando não restar vínculo com outro curso.

## Verificação

Revisão estática do diff, sem testes, navegador ou servidor.
