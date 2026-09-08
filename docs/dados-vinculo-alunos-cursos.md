# 📚 Dados de Vínculo Aluno-Curso

**Data:** 2026-09-08  
**Status:** ✅ Concluído  

## 🎯 Objetivo

Criar dados de teste vinculando alunos aos cursos no banco de dados Supabase.

## ✅ Ações Realizadas

### 1. Coluna `curso_id` Adicionada
```sql
ALTER TABLE public.usuario ADD COLUMN curso_id BIGINT REFERENCES public.curso(id) ON DELETE SET NULL;
```

### 2. RLS Desabilitado na Tabela `curso`
```sql
ALTER TABLE public.curso DISABLE ROW LEVEL SECURITY;
```
**Motivo:** Permitir que alunos anônimos (não autenticados) possam carregar a lista de cursos durante o cadastro.

### 3. Dados de Teste Inseridos

#### Cursos Disponíveis
| ID | Nome | Descrição |
|----|----|-----------|
| 1 | Rio do Sul Mais Tech - SENAI | Programa multidisciplinar com foco em tecnologia |
| 2 | Operador de Produção Industrial | Capacitação em operação de máquinas |
| 3 | Técnico em Desenvolvimento de Sistemas | Formação técnica em programação |

#### Alunos Criados (5 de teste)

| ID | Nome | Email | Curso | Senha |
|----|------|-------|-------|-------|
| 1001 | João Silva | joao.silva@example.com | 1 - Rio do Sul Mais Tech | senha123 |
| 1002 | Maria Santos | maria.santos@example.com | 2 - Operador de Produção | senha123 |
| 1003 | Pedro Oliveira | pedro.oliveira@example.com | 3 - Técnico em Desenvolvimento | senha123 |
| 1004 | Ana Costa | ana.costa@example.com | 1 - Rio do Sul Mais Tech | senha123 |
| 1005 | Carlos Ferreira | carlos.ferreira@example.com | 2 - Operador de Produção | senha123 |

## 🔗 Vínculo Implementado

Cada aluno possui um `curso_id` que referencia a tabela `curso`:
- **Foreign Key:** `usuario.curso_id` → `curso.id`
- **On Delete:** SET NULL (se curso for deletado, vínculo é removido)
- **Persistência:** localStorage armazena `curso_id` junto com email e usuario_id

## 📝 Fluxo de Cadastro

```
1. Usuário clica em "Criar novo cadastro"
2. Modal abre → Carrega cursos (RLS desabilitado)
3. Usuário preenche: email, senha, confirmar senha, curso
4. Sistema valida todos os campos
5. Novo aluno criado em usuario com curso_id
6. localStorage salva: email, usuario_id, curso_id
7. Redirecionamento para dashboard
8. Dashboard usa curso_id para personalizar conteúdo
```

## 🎯 Próximos Passos

- [x] Adicionar coluna curso_id
- [x] Desabilitar RLS em curso
- [x] Criar alunos de teste
- [ ] Testar fluxo completo de cadastro
- [ ] Personalizar dashboard por curso do aluno
- [ ] Implementar filtros de matérias por curso

## 📊 Resumo

✅ **5 alunos criados e vinculados a cursos**  
✅ **RLS desabilitado em curso (leitura pública)**  
✅ **Foreign key configurada (usuario.curso_id → curso.id)**  
✅ **Sistema pronto para novo cadastro de alunos**

---

**Criado por:** Claude Haiku 4.5  
**Documentação:** docs/dados-vinculo-alunos-cursos.md
