# Tempo mínimo do modal de atualização de pendências

**Objetivo:** Manter a mensagem de atualização de pendências visível por pelo menos três segundos.

## 1. Ajustar o fluxo de atualização

**Status:** ✅ Concluído

- Iniciar a contagem de três segundos ao abrir o modal.
- Executar o carregamento das pendências normalmente.
- Fechar o modal somente depois que o carregamento e o tempo mínimo terminarem.

## 2. Preservar o tratamento de falhas

**Status:** ✅ Concluído

- Aplicar o tempo mínimo também quando ocorrer uma falha inesperada durante a atualização.
- Manter o fechamento do modal no bloco de finalização.

## Verificação permitida

Revisão estática do código, sem executar testes, navegador ou servidor.
