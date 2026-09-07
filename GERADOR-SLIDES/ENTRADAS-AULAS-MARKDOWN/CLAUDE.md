# 📝 ENTRADAS-AULAS-MARKDOWN

**Localização:** `C:\fontes\aulas-senai\GERADOR-SLIDES\ENTRADAS-AULAS-MARKDOWN\`

## 📋 Objetivo

Pasta de entrada para arquivos Markdown contendo:
- Fichas de cadastro de produtos/cursos
- Ementas estruturadas
- Conteúdos pedagógicos para processamento
- Planos de aula em formato texto

## 🎯 Como Usar

### 1. **Adicionar Arquivo Markdown**
Coloque um arquivo `.md` nesta pasta com conteúdo relacionado a um curso ou programa.

**Exemplo:** `FICHA PRODUTO MAISTECH ATUALIZADA.md`

### 2. **Processar via Dashboard**
Acesse: `http://localhost:8000/`
- Clique em **"Gerar Slide"**
- Selecione o arquivo `.md`
- Sistema valida e processa o conteúdo

### 3. **Gerar Ementas Automaticamente**
Acesse: `http://localhost:8000/cursos/` 
- Clique em **"Matérias"** de um curso
- Clique em **"📚 Gerar Todas Ementas"**
- Copie o conteúdo do arquivo `.md` desta pasta
- Selecione a IA (Gemini ou Alibaba Qwen)
- Clique em **"✅ Gerar Ementas"**

O sistema irá:
1. ✅ Analisar o markdown com IA
2. ✅ Identificar ementas por matéria
3. ✅ Criar/atualizar ementas no banco de dados
4. ✅ Mostrar barra de progresso visual

## 📁 Arquivos Atuais

| Arquivo | Conteúdo | UCs |
|---------|----------|-----|
| `FICHA PRODUTO MAISTECH ATUALIZADA.md` | Programa Rio do Sul Mais Tech | 8 UCs |

### ⚡ TAREFA DO USUÁRIO

**🎯 Extrair todas as ementas das 8 UCs e gerar arquivo em MAIÚSCULO**

Após gerar as ementas via "Gerar Todas Ementas", criar arquivo:
- **Nome:** `EMENTAS-RIO-DO-SUL-MAIS-TECH.md` (EM MAIÚSCULA)
- **Local:** Nesta pasta (`ENTRADAS-AULAS-MARKDOWN/`)
- **Conteúdo:** Todas as 8 ementas estruturadas em Markdown
- **Formato:** Cada UC com título em H2, conteúdo completo da ementa

**Status:** ⏳ Pendente

## 🤖 Provedores de IA Disponíveis

| IA | Modelo | Status |
|----|--------|--------|
| 🔍 **Gemini** | gemini-pro | ✅ Ativo |
| 🇨🇳 **Alibaba Qwen** | qwen-turbo | ✅ Ativo |

## 📊 Estrutura Esperada do Markdown

Para melhor aproveitamento, o arquivo deve conter:

```markdown
# Titulo do Programa/Curso

## Matéria 1 ou UC 1 - Nome Descritivo
Conteúdo estruturado da ementa...

## Matéria 2 ou UC 2 - Nome Descritivo
Conteúdo estruturado da ementa...

## Matéria 3 ou UC 3 - Nome Descritivo
Conteúdo estruturado da ementa...
```

## ⚙️ Configuração Necessária

**Variáveis de Ambiente (`.env`):**
```
GEMINI_API_KEY=sua-chave-aqui
ALIBABA_API_KEY=sua-chave-aqui
```

**Obter chaves:**
- Gemini: https://aistudio.google.com/apikey
- Alibaba: https://dashscope.aliyun.com/

## 📝 Roteiro de Uso Típico

1. **Criar arquivo markdown** com conteúdo do curso
2. **Colocar nesta pasta** (ENTRADAS-AULAS-MARKDOWN)
3. **Acessar Dashboard** (http://localhost:8000/cursos/)
4. **Selecionar curso e matérias**
5. **Clicar em "Gerar Todas Ementas"**
6. **Copiar conteúdo do arquivo**
7. **Escolher IA** (Gemini recomendado)
8. **Clique em "Gerar Ementas"**
9. ✅ **Ementas geradas automaticamente!**

## 🎓 Exemplo Prático

Arquivo: `FICHA PRODUTO MAISTECH ATUALIZADA.md`

**Ementas geradas automaticamente para:**
- ✅ UC 1: Competências Socioemocionais
- ✅ UC 2: Fundamentos da Tecnologia
- ✅ UC 3: Eletricidade e Circuitos
- ✅ UC 4: Impressão 3D e Robótica
- ✅ UC 5: Comunicação Oral e Escrita
- ✅ UC 6: Carreiras Industriais
- ✅ UC 7: Reforço de Linguagens
- ✅ UC 8: Reforço Matemática

## 🔍 Barra de Progresso

Ao gerar ementas, você verá:
- 📊 Barra de progresso (0% → 100%)
- 📝 Mensagens de status em tempo real
- ⏳ Spinner de carregamento
- ✅ Confirmação final com número de ementas

## 📞 Suporte

- **Erro 404 na IA:** Verifique se as chaves estão configuradas no `.env`
- **Nenhuma ementa identificada:** Verifique a estrutura do markdown
- **Barra de progresso travada:** Recarregue a página (F5)

---

**Última atualização:** 2026-09-07  
**Versão:** 1.0
