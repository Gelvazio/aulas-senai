# 📚 TAREFA: Criar Pastas para 26 Unidades Curriculares — Automação Industrial 1200h

**Data:** 2026-09-07  
**Status Geral:** ⬜ Planejado  
**Prioridade:** 🔴 Alta  

---

## 🎯 Objetivo

Criar a estrutura completa de pastas para as **26 Unidades Curriculares** do Curso Técnico em Automação Industrial, com arquivos base (PLANO-AULAS.md, pastas AULAS/ e MATERIAIS/) prontos para preenchimento posterior.

---

## 📊 Escopo

| Item | Descrição |
|------|-----------|
| **Total de UCs** | 26 unidades curriculares |
| **Localização** | `sistema/AUTOMACAO-INDUSTRIAL-1200-HORAS/MATERIAS/` |
| **Estrutura por UC** | `MATERIA_<NOME>/` com subpastas `AULAS/` e `MATERIAIS/` |
| **Arquivos Gerados** | PLANO-AULAS.md vazio (template) + pastas estruturadas |
| **Tecnologias** | PowerShell/Bash (mkdir), sem dependências |

---

## 📋 Lista de UCs a Criar

### 1º Período (8 UCs)
1. ✅ MATERIA_SAUDE-E-SEGURANCA-NO-TRABALHO (12h)
2. ✅ MATERIA_INTRODUCAO-TI-COMUNICACAO (40h)
3. ✅ MATERIA_INTRODUCAO-QUALIDADE-PRODUTIVIDADE (16h)
4. ✅ MATERIA_FUNDAMENTOS-ELETROELETRONICA (80h)
5. ✅ MATERIA_LOGICA-PROGRAMACAO (40h)
6. ✅ MATERIA_DESENHO-TECNICO-SISTEMAS-AUTOMATIZADOS (48h)
7. ✅ MATERIA_GESTAO-PROCESSOS-IMPLEMENTACAO-SISTEMAS (32h)
8. ✅ MATERIA_CRIATIVIDADE-IDEACAO-INOVACAO (16h)

### 2º Período (6 UCs)
9. ✅ MATERIA_INTRODUCAO-DESENVOLVIMENTO-PROJETOS (12h)
10. ✅ MATERIA_SISTEMAS-ELETRONICOS-MICROCONTROLADOS (80h)
11. ✅ MATERIA_ACIONAMENTOS-ELETROELETRONICOS (80h)
12. ✅ MATERIA_SISTEMAS-ELETROHIDRULICOS-ELETROPNEUMATICOS (60h)
13. ✅ MATERIA_INSTRUMENTACAO-CONTROLE-PROCESSOS (80h)
14. ✅ MATERIA_MODELAGEM-PROJETOS-INOVACAO (20h)

### 3º Período (6 UCs)
15. ✅ MATERIA_INTRODUCAO-INDUSTRIA-4-0 (24h)
16. ✅ MATERIA_SISTEMAS-LOGICOS-PROGRAMAVEIS (100h)
17. ✅ MATERIA_SISTEMAS-SUPERVISAO-CONTROLE (50h)
18. ✅ MATERIA_COMISSIONAMENTO-SISTEMAS-AUTOMATIZADOS (40h)
19. ✅ MATERIA_PROJETOS-ACIONAMENTOS-ELETROELETRONICOS (54h)
20. ✅ MATERIA_PROTOTIPAGEM-NEGOCIOS-INOVADORES (24h)

### 4º Período (6 UCs)
21. ✅ MATERIA_SUSTENTABILIDADE-PROCESSOS-INDUSTRIAIS (8h)
22. ✅ MATERIA_INTEGRACAO-DISPOSITIVOS-AUTOMATIZADOS (80h)
23. ✅ MATERIA_MANUTENCAO-SISTEMAS-AUTOMATIZADOS (60h)
24. ✅ MATERIA_PROJETOS-INTERTRAVAMENTO-SEGURANCA (40h)
25. ✅ MATERIA_PROJETOS-CONTROLE-SISTEMAS-AUTOMATIZADOS (84h)
26. ✅ MATERIA_IMPLEMENTACAO-NEGOCIOS-INOVADORES (20h)

---

## 🔧 Plano de Execução

### Etapa 1: Remover Pasta Existente Incompleta
- **Status:** ⬜ Pendente
- **Ação:** Remover `MATERIAS/MATERIA_GERAL/` (contém apenas 1 UC genérica)
- **Comando:** `rm -r MATERIAS/MATERIA_GERAL/`
- **Verificação:** `ls MATERIAS/` ← deve estar vazio

### Etapa 2: Criar Estrutura Base para 26 UCs
- **Status:** ⬜ Pendente
- **Ação:** Criar 26 pastas em `MATERIAS/` com nomes padronizados em kebab-case
- **Arquivo:** PowerShell script ou Bash script com loops
- **Verificação:** `ls MATERIAS/ | wc -l` ← deve retornar 26

### Etapa 3: Criar Subpastas e Arquivos Template
- **Status:** ⬜ Pendente
- **Ação:** Para cada UC, criar:
  ```
  MATERIA_XXX/
  ├── PLANO-AULAS.md (template vazio)
  ├── AULAS/
  └── MATERIAIS/
  ```
- **Verificação:** `find MATERIAS/ -type d | wc -l` ← deve retornar (26×3)+1 = 79

### Etapa 4: Atualizar PASSOS.md
- **Status:** ⬜ Pendente
- **Ação:** Registrar conclusão com tabela de 26 UCs criadas
- **Arquivo:** `AUTOMACAO-INDUSTRIAL-1200-HORAS/PASSOS.md`
- **Verificação:** Arquivo atualizado com status ✅

### Etapa 5: Fazer Commit Git
- **Status:** ⬜ Pendente
- **Ação:** `git add . && git commit -m "Criar 26 pastas de UCs para Automação Industrial 1200h"`
- **Verificação:** `git log --oneline -1` mostra novo commit

---

## 📁 Estrutura Final Esperada

```
AUTOMACAO-INDUSTRIAL-1200-HORAS/
├── PASSOS.md (atualizado com 26 UCs)
├── EMENTA-PRINCIPAL-AUTOMACAO-INDUSTRIAL-1200-HORAS.md
├── CT Automação Industrial 1200 SENAI SED.pdf
└── MATERIAS/
    ├── SEMESTRE_1º_PERIODO/
    │   ├── MATERIA_SAUDE-E-SEGURANCA-NO-TRABALHO/
    │   ├── MATERIA_INTRODUCAO-TI-COMUNICACAO/
    │   ├── MATERIA_INTRODUCAO-QUALIDADE-PRODUTIVIDADE/
    │   ├── MATERIA_FUNDAMENTOS-ELETROELETRONICA/
    │   ├── MATERIA_LOGICA-PROGRAMACAO/
    │   ├── MATERIA_DESENHO-TECNICO-SISTEMAS-AUTOMATIZADOS/
    │   ├── MATERIA_GESTAO-PROCESSOS-IMPLEMENTACAO-SISTEMAS/
    │   └── MATERIA_CRIATIVIDADE-IDEACAO-INOVACAO/
    │       └── (cada UC tem: PLANO-AULAS.md, AULAS/, MATERIAIS/)
    │
    ├── SEMESTRE_2º_PERIODO/
    │   ├── MATERIA_INTRODUCAO-DESENVOLVIMENTO-PROJETOS/
    │   ├── MATERIA_SISTEMAS-ELETRONICOS-MICROCONTROLADOS/
    │   ├── MATERIA_ACIONAMENTOS-ELETROELETRONICOS/
    │   ├── MATERIA_SISTEMAS-ELETROHIDRULICOS-ELETROPNEUMATICOS/
    │   ├── MATERIA_INSTRUMENTACAO-CONTROLE-PROCESSOS/
    │   └── MATERIA_MODELAGEM-PROJETOS-INOVACAO/
    │
    ├── SEMESTRE_3º_PERIODO/
    │   ├── MATERIA_INTRODUCAO-INDUSTRIA-4-0/
    │   ├── MATERIA_SISTEMAS-LOGICOS-PROGRAMAVEIS/
    │   ├── MATERIA_SISTEMAS-SUPERVISAO-CONTROLE/
    │   ├── MATERIA_COMISSIONAMENTO-SISTEMAS-AUTOMATIZADOS/
    │   ├── MATERIA_PROJETOS-ACIONAMENTOS-ELETROELETRONICOS/
    │   └── MATERIA_PROTOTIPAGEM-NEGOCIOS-INOVADORES/
    │
    └── SEMESTRE_4º_PERIODO/
        ├── MATERIA_SUSTENTABILIDADE-PROCESSOS-INDUSTRIAIS/
        ├── MATERIA_INTEGRACAO-DISPOSITIVOS-AUTOMATIZADOS/
        ├── MATERIA_MANUTENCAO-SISTEMAS-AUTOMATIZADOS/
        ├── MATERIA_PROJETOS-INTERTRAVAMENTO-SEGURANCA/
        ├── MATERIA_PROJETOS-CONTROLE-SISTEMAS-AUTOMATIZADOS/
        └── MATERIA_IMPLEMENTACAO-NEGOCIOS-INOVADORES/
```

---

## ⚠️ Riscos e Dependências

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Nomes com caracteres inválidos | Baixa | Usar kebab-case + validar antes |
| Falha ao remover MATERIA_GERAL | Baixa | Verificar se tem arquivos importantes |
| Estrutura incompleta | Baixa | Validar com `find` após criação |
| Git status corrupto | Muito baixa | Executar `git status` antes de commit |

---

## ✅ Critérios de Sucesso

- [ ] 26 pastas criadas em `MATERIAS/`
- [ ] Cada pasta tem `AULAS/` e `MATERIAIS/` vazios
- [ ] Cada pasta tem `PLANO-AULAS.md` (template)
- [ ] `PASSOS.md` atualizado com listagem completa
- [ ] Commit realizado com mensagem descritiva
- [ ] `git status` limpo (sem arquivos pendentes)

---

## 📝 Notas Adicionais

- **Nomes em kebab-case:** Facilita navegação CLI e URL encoding
- **Templates vazios:** Serão preenchidos em etapas posteriores (scripts de geração)
- **Sem aulas genéricas:** Cada UC terá sua própria estrutura
- **Documentação centralizada:** Este arquivo serve como histórico e prova

---

**Próximo passo:** Aguardar aprovação do usuário para prosseguir com a execução. ⏳

