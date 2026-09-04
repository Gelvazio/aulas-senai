# Inicializador OpenClaude com Alibaba Qwen

**Objetivo:** Disponibilizar um arquivo BAT para iniciar o OpenClaude usando a API compatível com OpenAI da Alibaba Cloud.

## 1. Validar os requisitos

**Status:** ✅ Concluído

- Confirmar que o comando `openclaude` está disponível.
- Confirmar que `DASHSCOPE_API_KEY` está configurada.

## 2. Configurar a sessão

**Status:** ✅ Concluído

- Usar exclusivamente `DASHSCOPE_API_KEY` para a autenticação.
- Selecionar diretamente o provedor nativo `dashscope-intl`.
- Selecionar o modelo `qwen3.6-plus` disponibilizado pelo provedor no OpenClaude.

## 3. Iniciar o agente

**Status:** ✅ Concluído

- Executar o OpenClaude e encaminhar argumentos adicionais recebidos pelo BAT.
- Informar falhas de inicialização sem exibir a chave.

## Verificação permitida

Revisão estática do arquivo BAT, sem executar o agente ou chamadas ao modelo.
