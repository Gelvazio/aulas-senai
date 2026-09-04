# Configurar OpenClaude com Alibaba Cloud

**Objetivo:** Instalar o OpenClaude e prepará-lo para usar o modelo Alibaba por uma API compatível com OpenAI.

## 1. Instalar o OpenClaude

**Status:** ✅ Concluído

- Instalar globalmente o pacote oficial `@gitlawb/openclaude`.
- Não utilizar o pacote reservado `openclaude`.

## 2. Configurar autenticação e modelo

**Status:** ✅ Concluído

- Usar exclusivamente a chave persistente `DASHSCOPE_API_KEY`.
- Ativar o provedor nativo `dashscope-intl`.
- Selecionar o modelo `qwen3.6-plus`.
- Não armazenar a chave em arquivos versionados.

## 3. Configurar endpoint do provedor

**Status:** ✅ Concluído

- Usar o endpoint internacional definido internamente pelo provedor `dashscope-intl` do OpenClaude.
- Não criar aliases da chave em outras variáveis de ambiente.

## Verificação permitida

Conferência da instalação e das variáveis sem executar chamadas ao modelo.
