# Configurar GEMINI.bat como agente de IA

**Objetivo:** Iniciar o Gemini CLI como agente interativo capaz de trabalhar nos arquivos do projeto usando exclusivamente uma chave do Google AI Studio.

## 1. Instalar o Gemini CLI

**Status:** ✅ Concluído

- Instalar globalmente o pacote oficial `@google/gemini-cli`.
- Validar a presença do comando antes de iniciar o agente.

## 2. Usar as credenciais do Google AI Studio

**Status:** ✅ Concluído

- Exigir a variável de ambiente `GEMINI_API_KEY`.
- Não usar `GOOGLE_API_KEY`, login Google ou credenciais do Vertex AI como alternativas.
- Não armazenar credenciais no arquivo BAT.

## 3. Iniciar o agente no projeto

**Status:** ✅ Concluído

- Abrir o Gemini CLI na pasta onde o BAT está localizado.
- Manter o modo padrão de aprovação para operações com ferramentas e arquivos.
- Encaminhar ao CLI os argumentos adicionais informados ao BAT.

## Verificação permitida

Conferência da instalação e revisão estática do BAT, sem iniciar uma sessão do agente.
