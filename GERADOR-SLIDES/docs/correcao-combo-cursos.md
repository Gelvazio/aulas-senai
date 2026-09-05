# Correção do combo de cursos

**Objetivo:** carregar os registros da tabela `curso` no combo.

| Passo | Descrição | Status |
|---|---|---|
| 1 | Rastrear serviço, views e campos do formulário | ✅ Concluído |
| 2 | Corrigir alias na consulta Supabase | 🔄 Em andamento |
| 3 | Commit e push | ⬜ Pendente |

## 1. Diagnóstico

`dashboard/services.py`, em `SupabaseService.list_cursos`, usa
`select('id, nome_completo as descricao')`. O endpoint PostgREST exige
`descricao:nome_completo`. A exceção é capturada e convertida em lista vazia.
Os templates e formulários esperam `id` e `descricao`.

Referência: https://supabase.com/docs/reference/javascript/select

## 2. Alteração

Arquivo: `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\services.py`.

```python
response = client.table('curso').select('id, descricao:nome_completo').execute()
```

Preservar a tabela singular `curso`, sem alterar credenciais ou políticas do banco.
Não executar testes, servidor, navegador ou consultas de validação, conforme regra
do usuário. A constatação é baseada na leitura do código e da documentação.

## 3. Versionamento

```powershell
git add -- dashboard/services.py docs/correcao-combo-cursos.md
git commit -m "fix: corrige alias Supabase na listagem de cursos"
git push origin main
```
