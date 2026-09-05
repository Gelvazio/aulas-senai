# Diagnóstico do carregamento de matérias

| Passo | Descrição | Status |
|---|---|---|
| 1 | Rastrear tratamento da resposta AJAX | ✅ Concluído |
| 2 | Distinguir falha HTTP de resultado vazio | ✅ Concluído |
| 3 | Identificar a falha remota pelo erro apresentado | ⬜ Aguardando evidência de execução |

O combo de nova geração ignorava `response.ok` e `resultado.erro`, exibindo
ausência de matérias mesmo para HTTP 500. O cadastro de ementas esperava
`mensagem`, enquanto o endpoint retornava somente `erro` em falhas.
Não há terminal anexado nem logs locais disponíveis. Não foram executados testes,
servidores, navegador ou consultas remotas, conforme instrução do usuário.

Alterar os dois consumidores para apresentar erros HTTP/API, usando texto seguro,
e padronizar a resposta de erro do endpoint. Preservar a consulta já corrigida
por `cursomateria(cursoid, materiaid)`. A causa remota continua não confirmada.

```powershell
git add -- dashboard/views.py dashboard/templates/dashboard/nova_geracao_aulas.html dashboard/templates/dashboard/cadastro_ementa.html docs/diagnostico-carregamento-materias.md
git commit -m "fix: exibe falhas reais no carregamento de materias"
git push origin main
```
