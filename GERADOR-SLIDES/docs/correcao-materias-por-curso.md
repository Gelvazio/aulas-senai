# Correção das matérias por curso

| Passo | Descrição | Status |
|---|---|---|
| 1 | Rastrear endpoint, serviço e schema documentado | ✅ Concluído |
| 2 | Corrigir consulta pela associação | ✅ Concluído |
| 3 | Commit e push | 🔄 Executados na sequência; resultado no histórico Git |

## 1. Diagnóstico

O endpoint `obter_materias_curso` carregava todas as matérias e filtrava por
`materia.curso_id`. O vínculo real documentado em `../sistema/database.sql` e
usado em `../sistema/dashboard.html` é `cursomateria(cursoid, materiaid)`.
O serviço também consultava nomes incorretos (`curso_id`, `materia_id`) e pedia
uma coluna `nome` desnecessária na matéria.

## 2. Alterações

- `dashboard/services.py`: buscar os IDs em `cursomateria` por `cursoid`, depois
  consultar `materia` pelos IDs associados, preservando os campos da matéria.
- `dashboard/views.py`: passar o curso escolhido ao serviço, sem filtro local
  sobre uma coluna que não representa a associação.
- Propagar falhas de consulta para o tratamento de erros do endpoint, distinguindo
  falha no Supabase de curso sem matérias.
- Não executar testes, consultas remotas de validação, servidores ou navegador,
  conforme instruções do usuário. Diagnóstico baseado na leitura dos arquivos.

## 3. Versionamento

```powershell
git add -- dashboard/services.py dashboard/views.py docs/correcao-materias-por-curso.md
git commit -m "fix: carrega materias pela associacao cursomateria"
git push origin main
```
