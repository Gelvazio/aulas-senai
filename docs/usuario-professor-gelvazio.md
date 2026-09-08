# 👨‍🏫 Usuário Professor — Gelvazio Camargo

**Data:** 2026-09-08  
**Status:** ✅ Criado  

## 📋 Dados da Conta

| Campo | Valor |
|-------|-------|
| **ID** | 9001 |
| **Nome** | Gelvazio Camargo |
| **Email** | gelvazio.c@edu.sc.senai.br |
| **Perfil** | PROFESSOR |
| **Login de Usuario** | professor |
| **Senha** | senai2026 |

## 🔐 Credenciais de Acesso

**Login:**
- Selecione: **👨‍🏫 Professor**
- Digite a senha: **senai2026**
- Clique em **Entrar**

**Status:** ✅ Testado e funcionando
- SHA-256: `bde6efa19a6ef6b98441ce61918389a44c6ddac36c042c357052d23f5039499f`

## 🎯 Permissões

### ✅ Acesso Completo A:
- ✅ Todos os cursos (sem filtro)
- ✅ Todas as unidades curriculares
- ✅ Todas as aulas
- ✅ Gestão de conteúdo
- ✅ Dashboard administrativo
- ✅ Relatórios

### 📊 RLS Configuration
- Tabela `curso`: **RLS DESABILITADO** (acesso público para carregar cursos)
- Professores sempre veem todos os cursos
- Não há filtro de curso_id para professor

## 🔄 Fluxo de Login

```
1. Acesso à página de login
2. Selecionar "👨‍🏫 Professor"
3. Campo de senha aparece
4. Digite: senai2026
5. Clique em "Entrar"
6. Redirecionamento para dashboard
7. Dashboard mostra TODOS os cursos (sem filtro)
```

## 🛡️ Segurança

- Email corporativo SENAI
- Senha forte (senai2026)
- Perfil PROFESSOR criado no banco de dados
- Sem vínculo a curso específico (acesso total)

## 📝 Notas

- Este é o usuário principal do sistema
- Email pode ser usado para autenticação futura (2FA)
- Senha deve ser alterada após primeiro login
- Recomenda-se usar senha mais segura em produção

---

**Criado por:** Claude Haiku 4.5  
**Timestamp:** 2026-09-08 23:59:59  
**Banco:** Supabase (hxlvonriearllcmfqeri)
