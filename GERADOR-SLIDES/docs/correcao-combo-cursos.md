# Correção do combo de cursos

**Objetivo:** identificar por que o combo não lista a tabela `curso`.

| Passo | Descrição | Status |
|---|---|---|
| 1 | Rastrear consulta, views e formulário | ✅ Concluído |
| 2 | Identificar e preservar correção concorrente | ✅ Concluído |
| 3 | Commit e push deste registro | 🔄 Executados na sequência; resultado no histórico Git |

## 1. Diagnóstico

A versão inicialmente lida de `dashboard/services.py` usava
`select('id, nome_completo as descricao')`. A sintaxe de alias do PostgREST é
`descricao:nome_completo`; a exceção era convertida em lista vazia.
Templates e formulários esperam os campos `id` e `descricao`.

Referência: https://supabase.com/docs/reference/javascript/select

## 2. Correção já incorporada

Durante esta tarefa, o commit concorrente `c9083e6` substituiu a consulta por
`client.table('curso').select('*').execute()` e passou a mapear `nome_completo`
para `descricao` em Python. Essa alteração elimina a expressão de alias inválida
identificada e foi preservada sem sobrescrever o trabalho concorrente.

Arquivo: `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\services.py`.
Nenhum código adicional foi alterado nesta tarefa. Não foram executados testes,
consultas de validação, servidores ou navegador. O carregamento em execução
não foi confirmado; esta análise não comprova permissões ou dados remotos.

## 3. Versionamento

```powershell
git add -- docs/correcao-combo-cursos.md
git commit -m "docs: registra diagnostico e correcao do combo de cursos"
git push origin main
```
