# TASKS — Rastreamento de Gerações de Slides

Este diretório mantém o histórico de gerações de apresentações a partir de Markdowns.

## Estrutura

- **rastreamento.json** — Arquivo principal de registro. Cada geração cria um entrada com:
  - `arquivo` — nome do `.md` lido de `ENTRADAS-AULAS-MARKDOWN/`
  - `status` — `PENDENTE`, `GERADO` ou `ERRO`
  - `data_criacao` — quando a tarefa foi registrada
  - `data_geracao` — quando o PPTX foi criado (null se pendente/erro)
  - `arquivo_saida` — nome do `.pptx` gerado
  - `mensagem_erro` — descrição do erro (se houver)

## Fluxo Automático

1. **Entrada:** Arquivo `.md` colocado em `../ENTRADAS-AULAS-MARKDOWN/`
2. **Registro:** Automaticamente registrado em `rastreamento.json` com status `PENDENTE`
3. **Geração:** Script valida e gera `.pptx` em `../SAIDA/`
4. **Atualização:** Status mudado para `GERADO` ou `ERRO` com timestamp

## Como Consultar

Abrir `rastreamento.json` para ver histórico de todas as gerações.

Exemplo:
```json
{
  "tarefas": [
    {
      "arquivo": "aula-introducao-tic.md",
      "status": "GERADO",
      "data_criacao": "2026-09-05T10:30:00Z",
      "data_geracao": "2026-09-05T10:32:15Z",
      "arquivo_saida": "aula-introducao-tic.pptx",
      "mensagem_erro": null
    }
  ]
}
```
