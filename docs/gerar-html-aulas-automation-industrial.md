# 📚 TAREFA: Gerar HTMLs das Aulas a partir de PLANO-AULAS.md

**Data:** 2026-09-07  
**Status Geral:** ⬜ Planejado  
**Prioridade:** 🔴 Alta  

---

## 🎯 Objetivo

Criar um script Python que leia cada **PLANO-AULAS.md** e gere arquivos **HTML** para cada aula, com design responsivo, temas claro/escuro, e branding SENAI.

---

## 📊 Escopo

| Item | Descrição |
|------|-----------|
| **Total de Aulas** | 581 aulas |
| **Entrada** | PLANO-AULAS.md (26 arquivos) |
| **Saída** | AULA-01.html ... AULA-N.html + index.html |
| **Design** | Responsivo, dark mode, branding SENAI |
| **Tecnologia** | Python 3.14 + markdown2 + Jinja2 |

---

## 🏗️ Estrutura do Script

### Funcionalidades Principais

1. **Leitura de PLANO-AULAS.md**
   - Extrair carga horária
   - Extrair objetivo geral
   - Extrair lista de aulas
   - Para cada aula: número, título, duração, conteúdo, atividades

2. **Geração de HTML**
   - Template responsivo (mobile-first)
   - Header com logo SENAI
   - Breadcrumb de navegação
   - Índice de aulas (sidebar ou dropdown)
   - Conteúdo da aula com formatting
   - Botões prev/next

3. **Índice Principal (index.html)**
   - Grid de UCs
   - Cards com informações
   - Link para cada PLANO-AULAS.md
   - Filtros por semestre

4. **Temas**
   - Light mode (branco/azul)
   - Dark mode (preto/azul)
   - CSS variables para cores

---

## 📝 Estrutura de Saída

```
MATERIAS/
├── SEMESTRE_1º_PERIODO/
│   ├── MATERIA_SAUDE-E-SEGURANCA-NO-TRABALHO/
│   │   ├── AULAS/
│   │   │   ├── AULA-01.html ✅ (novo)
│   │   │   ├── AULA-02.html ✅ (novo)
│   │   │   ├── AULA-03.html ✅ (novo)
│   │   │   ├── ... AULA-06.html
│   │   │   └── index.html ✅ (novo - índice da UC)
│   │   ├── PLANO-AULAS.md (existente)
│   │   ├── EMENTA-UC.md (existente)
│   │   └── MATERIAIS/
│   └── (outros MATERIAS...)
│
└── index.html ✅ (novo - página principal)
```

---

## 🎨 Design Esperado

### Cores SENAI
- Primary: #004384 (Azul SENAI)
- Secondary: #f7941d (Laranja SENAI)
- Light Background: #f5f5f5
- Dark Background: #1a1a1a

### Elementos
- Header com logo
- Navbar responsiva
- Sidebar com TOC (desktop) ou dropdown (mobile)
- Breadcrumb navigation
- Main content area
- Botões prev/next
- Footer com informações

### Responsividade
- Mobile: <640px (1 coluna)
- Tablet: 640-900px (1.5 coluna)
- Desktop: >900px (2-3 colunas)

---

## 🔧 Implementação

### Dependências Python
```bash
pip install markdown2
pip install Jinja2
```

### Fluxo do Script

```
1. Verificar argumentos (--input, --output)
2. Encontrar todos os PLANO-AULAS.md
3. Para cada PLANO-AULAS.md:
   a) Ler arquivo
   b) Parsear estrutura (título, aulas, etc)
   c) Para cada aula:
      - Extrair dados
      - Renderizar HTML
      - Salvar em AULAS/AULA-XX.html
   d) Gerar index.html (TOC da UC)
4. Gerar index.html principal (todas as UCs)
5. Exibir relatório de sucesso
```

---

## 📊 Arquivos Gerados

| Arquivo | Quantidade | Tamanho Estimado |
|---------|-----------|------------------|
| AULA-01.html ... AULA-581.html | 581 | ~50-100 KB cada |
| index.html (UC) | 26 | ~30-50 KB cada |
| index.html (principal) | 1 | ~100 KB |
| **TOTAL** | **608** | **~40 MB** |

---

## ✅ Critérios de Sucesso

- [ ] Script Python criado e funcional
- [ ] 581 arquivos AULA-*.html gerados
- [ ] 26 index.html por UC gerados
- [ ] 1 index.html principal gerado
- [ ] Todos com design responsivo
- [ ] Dark mode funcional
- [ ] Links de navegação funcionando
- [ ] Commit realizado

---

**Próximo passo:** Criar script Python e executar geração de HTMLs ⏳

