# Atualização das orientações dos agentes

**Objetivo:** consolidar o CLAUDE.md e a estrutura existente em AGENTS.md local.
**Data:** 05-09-2026
**Tecnologias:** Python, Django, Supabase e python-pptx.

| Passo | Descrição | Status |
|---|---|---|
| 1 | Ler documentação e código do projeto | ✅ Concluído |
| 2 | Criar AGENTS.md com arquitetura, regras e limitações atuais | ✅ Concluído |
| 3 | Commit e push | 🔄 Executado na sequência desta edição; resultado registrado no histórico Git |

## 1. Contexto

Foram consultados CLAUDE.md, README.md, configurações Django, rotas, modelos,
views, serviço Supabase, gerador Python e relatório do grafo do repositório pai.
O diretório local ainda não tinha AGENT.md nem AGENTS.md; adota-se AGENTS.md.

A atualização inicial foi tentada com o comando obrigatório:

```powershell
C:\Python314\python.exe -m graphify update .
```

Resultado: `No module named graphify`. O grafo não foi atualizado.

## 2. Orientações locais

Arquivo: `C:\fontes\aulas-senai\GERADOR-SLIDES\AGENTS.md`.
Documentar os fluxos de PPTX, autenticação, ementas e integração Supabase,
separando o comportamento existente do planejamento descrito no CLAUDE.md.
Não modificar código, banco, credenciais ou arquivos preexistentes de outras tarefas.
Testes e validações de execução não serão realizados, conforme instrução do usuário.

## 3. Versionamento

```powershell
git add -- AGENTS.md docs/atualizacao-agents.md
git commit -m "docs: documenta orientacoes do gerador de slides para agentes"
git push origin main
```

