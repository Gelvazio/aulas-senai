# 📚 TAREFA: Sistema de Cadastro de Alunos com Seleção de Curso

**Data:** 2026-09-08  
**Status Geral:** ⬜ Planejado  
**Prioridade:** 🔴 Alta  

---

## 🎯 Objetivo

Implementar um sistema completo de cadastro para alunos que:
1. Permite criar novo cadastro com email e senha
2. Aluno seleciona o curso no cadastro
3. Vincula o curso ao cadastro do aluno na tabela `usuario`
4. Armazena referência do curso no Supabase

---

## 📊 Escopo

| Item | Descrição |
|------|-----------|
| **Interface** | Modal de cadastro com campo de curso |
| **Banco de Dados** | Adicionar campo `curso_id` à tabela `usuario` |
| **Validação** | Email único, senha segura, curso obrigatório |
| **Supabase** | Query de inserção com curso_id |
| **Armazenamento** | localStorage com email e curso_id |

---

## 🏗️ Plano de Execução

### Etapa 1: Preparar Banco de Dados
- **Status:** ⬜ Pendente
- **Ação:** Adicionar coluna `curso_id` à tabela `usuario`
- **Arquivo:** Supabase (SQL via MCP)
- **Verificação:** Coluna aparecer em usuario.curso_id

### Etapa 2: Listar Cursos
- **Status:** ⬜ Pendente
- **Ação:** Buscar cursos do Supabase para preencher combo
- **Arquivo:** `sistema/index.html` (JavaScript)
- **Verificação:** Combo com todos os cursos carregados

### Etapa 3: Criar Modal de Cadastro
- **Status:** ⬜ Pendente
- **Ação:** Adicionar HTML/CSS para modal de cadastro
- **Arquivo:** `sistema/index.html`
- **Verificação:** Modal aparece ao clicar "Criar novo cadastro"

### Etapa 4: Implementar Lógica de Cadastro
- **Status:** ⬜ Pendente
- **Ação:** Função para inserir novo aluno com curso
- **Arquivo:** `sistema/index.html` (JavaScript)
- **Verificação:** Novo aluno criado no Supabase com curso_id

### Etapa 5: Testar Fluxo Completo
- **Status:** ⬜ Pendente
- **Ação:** Cadastrar novo aluno e verificar dados
- **Arquivo:** Supabase + localStorage
- **Verificação:** Dados aparecem corretamente em ambos

### Etapa 6: Commit e Push
- **Status:** ⬜ Pendente
- **Ação:** Fazer commit e push das mudanças
- **Verificação:** Repositório sincronizado

---

## 📝 Estrutura de Dados

### Tabela usuario (modificada)
```sql
ALTER TABLE usuario ADD COLUMN curso_id UUID REFERENCES curso(id);

-- Campos finais:
- id (UUID)
- email (TEXT, UNIQUE)
- senha_hash (TEXT)
- perfil (TEXT: ALUNO, PROFESSOR)
- curso_id (UUID) ← NOVO
- criado_em (TIMESTAMP)
```

### Tabela curso
```
- id (UUID)
- nome (TEXT)
- descricao (TEXT)
- icone (TEXT)
- cor (TEXT)
- ensalado (BOOLEAN)
```

---

## 🎨 Interface

### Modal de Cadastro
```
┌─────────────────────────────────┐
│ ✨ Criar Novo Cadastro          │
├─────────────────────────────────┤
│                                 │
│ Email:                          │
│ [seu.email@exemplo.com.........]│
│                                 │
│ Senha:                          │
│ [**** (mínimo 6 caracteres)]   │
│                                 │
│ Confirmar Senha:                │
│ [**** ........................]  │
│                                 │
│ Selecione o Curso:              │
│ [▼ Escolha um curso........]     │
│   - Operador de Produção        │
│   - Técnico de Informática      │
│   - Análise de Dados            │
│                                 │
│ [ Cancelar ]  [ Criar Cadastro ]│
└─────────────────────────────────┘
```

---

## ✅ Critérios de Sucesso

- [ ] Coluna `curso_id` adicionada à tabela `usuario`
- [ ] Modal de cadastro aparece ao clicar "Criar novo cadastro"
- [ ] Combo carrega todos os cursos do Supabase
- [ ] Validação: email único, senha mínimo 6 caracteres
- [ ] Novo aluno inserido com email, senha_hash e curso_id
- [ ] localStorage contém email, usuario_id e curso_id
- [ ] Fluxo completo funciona: cadastro → login → dashboard
- [ ] Commit realizado e push feito

---

**Próximo passo:** Executar Etapa 1 (Preparar Banco de Dados) ⏳
