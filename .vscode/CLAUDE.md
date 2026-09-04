# .vscode


---

<!-- GRAPHIFY-RAIZ:INICIO -->
## 🔗 Grafo de conhecimento — SEMPRE na raiz do projeto

⚠️ **Esta pasta NÃO tem, e não deve ter, uma pasta `graphify-out/` própria.**

O grafo de conhecimento do projeto existe em **um único lugar**:

```
C:\fontes\aulas-senai/graphify-out/
```

### Onde buscar as informações

Ao precisar de contexto do grafo (relatório, nós, comunidades, arquivos
relacionados), leia **sempre** a partir da raiz — nunca de uma cópia local:

| Arquivo | Caminho a partir da raiz |
|---|---|
| Relatório legível | `graphify-out/GRAPH_REPORT.md` |
| Grafo completo (JSON) | `graphify-out/graph.json` |
| Visualização | `graphify-out/graph.html` |

### Onde atualizar o grafo

A atualização **também acontece apenas na raiz**. Rodar o graphify dentro de
uma subpasta cria um segundo grafo, parcial e desatualizado:

```bash
cd C:\fontes\aulas-senai
C:\Users\gelva\.local\bin\graphify.exe update .
```

❌ **Nunca** executar `graphify update` a partir desta pasta.
❌ **Nunca** criar `graphify-out/` aqui — o `.gitignore` já bloqueia essa pasta
fora da raiz.
<!-- GRAPHIFY-RAIZ:FIM -->
