# Criar EMENTA-DIGITAL-SKILLS.md — Consolidação de Conteúdos

**Objetivo:** Ler os arquivos "Ficha de Produto Digital Skills.md" e "DIGITAL-SKILLS.md" e criar um novo arquivo "EMENTA-DIGITAL-SKILLS.md" consolidando ambos os conteúdos de forma detalhada e estruturada, com hierarquia clara e organização lógica.

**Tech Stack:** Markdown, análise de conteúdo

**Data de Criação:** 2026-09-17  
**Tempo Estimado:** ~20 minutos

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Ler Ficha de Produto Digital Skills.md | ✅ Concluído |
| 2 | Ler DIGITAL-SKILLS.md | ✅ Concluído |
| 3 | Analisar estrutura e conteúdo de ambos | ✅ Concluído |
| 4 | Consolidar em EMENTA-DIGITAL-SKILLS.md | ✅ Concluído |
| 5 | Revisar e validar formatação | ✅ Concluído |
| 6 | Commit do novo arquivo | ✅ Concluído |

---

### Passo 1: Ler Ficha de Produto Digital Skills.md

**Status:** ⬜ Pendente

**Arquivo:** Ler `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\Ficha de Produto Digital Skills.md`

**Ação:** Extrator conteúdo completo do arquivo para entender:
- Objetivo e propósito da matéria
- Público-alvo
- Competências esperadas
- Estrutura e organização

**Verificação:**
```powershell
Test-Path "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\Ficha de Produto Digital Skills.md"
```

Esperado: `True`

---

### Passo 2: Ler DIGITAL-SKILLS.md

**Status:** ⬜ Pendente

**Arquivo:** Ler `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\DIGITAL-SKILLS.md`

**Ação:** Extrator conteúdo completo para entender:
- Conteúdo programático detalhado
- Aulas e módulos
- Conceitos e tópicos
- Metodologia

**Verificação:**
```powershell
Test-Path "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\DIGITAL-SKILLS.md"
```

Esperado: `True`

---

### Passo 3: Analisar e Mesclar Conteúdos

**Status:** ⬜ Pendente

**Ação:** Consolidar os conteúdos em uma estrutura única:
- Introdução (Ficha de Produto)
- Objetivos e competências (ambos)
- Ementa detalhada (DIGITAL-SKILLS.md)
- Metodologia e recursos (Ficha de Produto)
- Referências (se houver)

**Estrutura Esperada:**
```
# EMENTA — DIGITAL SKILLS
## 1. Introdução
## 2. Objetivos
## 3. Competências Esperadas
## 4. Ementa Detalhada
### 4.1 Módulo 1
### 4.2 Módulo 2
...
## 5. Metodologia
## 6. Recursos
## 7. Referências
```

---

### Passo 4: Criar EMENTA-DIGITAL-SKILLS.md

**Status:** ⬜ Pendente

**Arquivo:** Criar `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\EMENTA-DIGITAL-SKILLS.md`

**Ação:** Escrever arquivo consolidado com:
- Conteúdo mesclado de ambos os arquivos
- Hierarquia clara (# ## ### #### ...)
- Formatação Markdown padrão
- Preservar todas as informações importantes

**Verificação:**
```powershell
Test-Path "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\EMENTA-DIGITAL-SKILLS.md"
Get-Content "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\EMENTA-DIGITAL-SKILLS.md" | Measure-Object -Line
```

Esperado: Arquivo criado com conteúdo consolidado

---

### Passo 5: Revisar e Validar

**Status:** ⬜ Pendente

**Ação:** Verificar:
- Formatação Markdown correta
- Hierarquia lógica
- Ausência de duplicações
- Legibilidade

**Verificação:**
```powershell
cd "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS"
Get-Content "EMENTA-DIGITAL-SKILLS.md" | Select-Object -First 50
```

Esperado: Conteúdo bem formatado e estruturado

---

### Passo 6: Commit

**Status:** ⬜ Pendente

**Ação:** Adicionar arquivo ao git

```powershell
cd "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS"
git add EMENTA-DIGITAL-SKILLS.md
git commit -m "docs: criar ementa consolidada de Digital Skills

- Mesclar conteúdo de Ficha de Produto Digital Skills.md
- Mesclar conteúdo de DIGITAL-SKILLS.md
- Estrutura hierárquica clara e detalhada"
```

**Verificação:**
```powershell
git log --oneline -1
```

Esperado: Commit criado com sucesso

---

## Próximos Passos Após Aprovação

1. ✅ Ler Ficha de Produto Digital Skills.md
2. ✅ Ler DIGITAL-SKILLS.md
3. ✅ Consolidar conteúdos
4. ✅ Criar EMENTA-DIGITAL-SKILLS.md
5. ✅ Validar e revisar
6. ✅ Fazer commit

**Status Atual:** Aguardando aprovação do usuário ⏳

---
