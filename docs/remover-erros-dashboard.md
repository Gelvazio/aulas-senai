# Remover Erros do Dashboard.html

**Data:** 2026-09-08  
**Status Geral:** ⬜ Planejado

## Objetivo
Remover todo código JavaScript e funcionalidades que estão causando erros no `dashboard.html`, mantendo apenas a documentação estática funcional.

## Problema
- Arquivo `dashboard.html` contém JavaScript com erros
- Modal de "Plano de Ensino" e outras funcionalidades quebradas
- Funções `mdToHtml()` e processamento de documentos gerando exceções

## Solução
Converter o arquivo para HTML estático puro, removendo:
- ❌ Funções JavaScript problemáticas
- ❌ Modais dinâmicos
- ❌ Processamento de Markdown via JS
- ❌ Arrays de documentos (PE_DOCS, etc)
- ❌ Event listeners e manipulação de DOM complexa

## O que será mantido
- ✅ HTML estrutural com navegação
- ✅ Seções de documentação
- ✅ Tabelas e cards
- ✅ Estilos CSS funcionais
- ✅ Footer e header

## Arquivos Afetados
| Arquivo | Ação | Verificação |
|---------|------|------------|
| `dashboard.html` | Remover JS e simplificar | Abrir no navegador sem console errors |

## Plano de Execução

### Etapa 1: Ler arquivo completo
- **Status:** ⬜ Pendente
- **Ação:** Ler todo o `dashboard.html` para identificar erros
- **Verificação:** Confirmar presença de código JS problemático

### Etapa 2: Remover código JavaScript
- **Status:** ⬜ Pendente
- **Ação:** Deletar todas as funções JS e scripts
- **Itens a remover:**
  - Função `mdToHtml()`
  - Arrays `PE_DOCS`, etc
  - Event listeners
  - Modal dinâmicos
- **Verificação:** Arquivo contém apenas `<style>` e HTML

### Etapa 3: Simplificar se necessário
- **Status:** ⬜ Pendente
- **Ação:** Remover navegação para seções que não existem
- **Verificação:** Todos os links funcionam

### Etapa 4: Commit
- **Status:** ⬜ Pendente
- **Ação:** `git add . && git commit -m "remover erros de javascript do dashboard"`
- **Verificação:** Commit realizado com Co-Authored-By

---

## ✅ Aprovação Necessária

Prosseguir com remoção de TUDO que causa erros? (S/N)
