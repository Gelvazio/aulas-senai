# Simplificar Dashboard — Apenas CRUD Curso e Unidade

**Data:** 2026-09-08  
**Status:** ⬜ Planejado

## Objetivo
Remover TODO o código do `sistema/dashboard.html` exceto:
- ✅ CRUD de Curso
- ✅ CRUD de Unidade
- ✅ HTML, CSS, Headers básicos

## O que será REMOVIDO
- ❌ CRUD de Matéria
- ❌ CRUD de Aula
- ❌ Modais de Didática
- ❌ Funções de Conferência
- ❌ Gerenciamento de Avaliações
- ❌ Scripts de Exportação
- ❌ Funções de Duplicação
- ❌ Todos os modais exceto Curso e Unidade
- ❌ Toda lógica relacionada a pendências
- ❌ Cache e funções não utilizadas

## O que será MANTIDO
- ✅ Header com navegação
- ✅ Hero section
- ✅ Grid de Cursos (CRUD completo)
- ✅ Modal Novo Curso
- ✅ Modal Editar Curso
- ✅ Modal Deletar Curso
- ✅ Grid de Unidades (CRUD completo)
- ✅ Modal Novo Unidade
- ✅ Modal Editar Unidade
- ✅ Modal Deletar Unidade
- ✅ Estilos CSS (simplificados)
- ✅ Funções sbGet, sbPost, sbPatch, sbDelete
- ✅ Headers de autenticação Supabase

## Arquivo
**Atual:** 5267 linhas
**Esperado:** ~1500-2000 linhas

## Plano de Execução
1. ⬜ Ler arquivo completo
2. ⬜ Identificar blocos de Curso
3. ⬜ Identificar blocos de Unidade
4. ⬜ Remover tudo o mais
5. ⬜ Testar no navegador
6. ⬜ Commit

---

## ✅ Aprovação Necessária

Prosseguir? (S/N)
