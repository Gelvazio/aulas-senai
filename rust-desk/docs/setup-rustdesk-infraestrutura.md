# 📋 Plano: Configurar Infraestrutura RustDesk

**Data:** 2026-09-10  
**Status:** ⬜ Pendente aprovação  
**Objetivo:** Implementar servidor RustDesk auto-hospedado com Docker para suporte técnico remoto em aulas SENAI

---

## 📊 Escopo

### ✅ Incluso

- ✅ Preparar arquitetura Docker (docker-compose.yml)
- ✅ Configurar volumes e persistência de dados
- ✅ Expor portas (21115, 21117, 21119)
- ✅ Setup de SSL/TLS (Let's Encrypt via nginx reverse proxy)
- ✅ Configurar banco de dados (PostgreSQL opcional)
- ✅ Scripts de inicialização e monitoramento
- ✅ Documentação de deployment
- ✅ Criar guia de uso para professores/alunos

### ❌ Não Incluso

- ❌ Provisionamento de servidor cloud (AWS/Azure/DigitalOcean) — você escolhe
- ❌ Setup de rede/firewall na sua infraestrutura
- ❌ Integração com LDAP/Active Directory (pode ser adicionado depois)
- ❌ Customização de branding

---

## 🎯 Tecnologias & Requisitos

| Componente | Requisito | Detalhes |
|-----------|-----------|----------|
| **Docker** | Instalado | docker + docker-compose |
| **Servidor** | VM Linux | Ubuntu 22.04 LTS recomendado |
| **CPU** | 2+ cores | Para ~100 conexões simultâneas |
| **RAM** | 2-4 GB | Mínimo 2 GB |
| **Armazenamento** | 20 GB SSD | Para logs, dados, backups |
| **Rede** | Ports 80,443,21115-21119 | Firewall liberado |
| **DNS** | Opcional | Se usar SSL com domínio |

---

## 📝 Plano Detalhado com Status

### **FASE 1: Preparação & Documentação**

| # | Ação | Arquivo/Comando | Verificação | Status |
|---|------|-----------------|------------|--------|
| 1.1 | Criar estrutura de pastas | `docker/`, `nginx/`, `data/` | Pastas existem | ⬜ Pendente |
| 1.2 | Documentar arquitetura de deployment | `docs/deployment-architecture.md` | Arquivo criado | ⬜ Pendente |
| 1.3 | Criar guia de requisitos | `docs/requisitos-servidor.md` | Arquivo criado | ⬜ Pendente |

### **FASE 2: Docker & Compose**

| # | Ação | Arquivo/Comando | Verificação | Status |
|---|------|-----------------|------------|--------|
| 2.1 | Criar `docker-compose.yml` | `docker-compose.yml` | Arquivo válido (docker-compose config) | ⬜ Pendente |
| 2.2 | Definir volumes persistentes | `docker-compose.yml` | Seção `volumes:` configurada | ⬜ Pendente |
| 2.3 | Configurar variáveis de ambiente | `.env` | Arquivo `.env` gerado | ⬜ Pendente |
| 2.4 | Validar sintaxe YAML | `docker-compose config` | Sem erros | ⬜ Pendente |

### **FASE 3: Nginx Reverse Proxy & SSL**

| # | Ação | Arquivo/Comando | Verificação | Status |
|---|------|-----------------|------------|--------|
| 3.1 | Criar config nginx | `nginx/rustdesk.conf` | Arquivo criado com server blocks | ⬜ Pendente |
| 3.2 | Configurar SSL self-signed (dev) | `nginx/ssl/` | Certificados gerados | ⬜ Pendente |
| 3.3 | Instruções para Let's Encrypt (prod) | `docs/ssl-letsencrypt.md` | Guia criado | ⬜ Pendente |
| 3.4 | Testar proxy reverso | `curl -k https://localhost` | Resposta 200 | ⬜ Pendente |

### **FASE 4: Banco de Dados (Opcional)**

| # | Ação | Arquivo/Comando | Verificação | Status |
|---|------|-----------------|------------|--------|
| 4.1 | Criar serviço PostgreSQL | `docker-compose.yml` | Seção `postgres:` adicionada | ⬜ Pendente |
| 4.2 | Criar script de inicialização | `postgres/init.sql` | Arquivo criado com schema | ⬜ Pendente |
| 4.3 | Documentar schema | `docs/database-schema.md` | Arquivo criado | ⬜ Pendente |

### **FASE 5: Inicialização & Testes**

| # | Ação | Arquivo/Comando | Verificação | Status |
|---|------|-----------------|------------|--------|
| 5.1 | Iniciar containers | `docker-compose up -d` | Todos containers rodando | ⬜ Pendente |
| 5.2 | Verificar logs | `docker-compose logs -f` | Sem erros críticos | ⬜ Pendente |
| 5.3 | Testar hbbs | `curl http://localhost:21115` | Resposta do servidor | ⬜ Pendente |
| 5.4 | Testar hbbr | `nc -zv localhost 21117 21119` | Portas abertas | ⬜ Pendente |
| 5.5 | Documentar URLs de acesso | `docs/urls-acesso.md` | Arquivo criado | ⬜ Pendente |

### **FASE 6: Documentação & Treinamento**

| # | Ação | Arquivo/Comando | Verificação | Status |
|---|------|-----------------|------------|--------|
| 6.1 | Guia de deployment completo | `docs/DEPLOYMENT.md` | Arquivo criado, step-by-step | ⬜ Pendente |
| 6.2 | Guia de uso para professores | `docs/GUIA-PROFESSOR.md` | Passo a passo com screenshots | ⬜ Pendente |
| 6.3 | Guia de uso para alunos | `docs/GUIA-ALUNO.md` | Instruções simples | ⬜ Pendente |
| 6.4 | Troubleshooting & FAQ | `docs/TROUBLESHOOTING.md` | Problemas comuns + soluções | ⬜ Pendente |
| 6.5 | README.md do projeto | `README.md` | Visão geral completa | ⬜ Pendente |

---

## 🗂️ Estrutura de Arquivos (Resultado Final)

```
rust-desk/
├── CLAUDE.md                          (✅ já existe)
├── README.md                          (📄 será criado)
├── docker-compose.yml                 (📄 será criado)
├── .env                               (📄 será criado)
├── .env.example                       (📄 será criado — sem senhas)
│
├── docs/
│   ├── setup-rustdesk-infraestrutura.md    (este arquivo)
│   ├── deployment-architecture.md           (📄 será criado)
│   ├── requisitos-servidor.md               (📄 será criado)
│   ├── ssl-letsencrypt.md                   (📄 será criado)
│   ├── database-schema.md                   (📄 será criado)
│   ├── urls-acesso.md                       (📄 será criado)
│   ├── DEPLOYMENT.md                        (📄 será criado)
│   ├── GUIA-PROFESSOR.md                    (📄 será criado)
│   ├── GUIA-ALUNO.md                        (📄 será criado)
│   └── TROUBLESHOOTING.md                   (📄 será criado)
│
├── docker/
│   ├── Dockerfile                    (opcional — se customizar imagem)
│   └── docker-entrypoint.sh           (opcional — script de inicialização)
│
├── nginx/
│   ├── rustdesk.conf                 (📄 será criado)
│   ├── ssl/
│   │   ├── self-signed.crt          (gerado em dev)
│   │   └── self-signed.key          (gerado em dev)
│   └── ssl-letsencrypt/             (para produção)
│
├── postgres/
│   └── init.sql                      (📄 será criado — opcional)
│
└── data/
    ├── rustdesk/                     (volume Docker)
    ├── postgres/                     (volume Docker — opcional)
    └── nginx/                        (volume Docker)
```

---

## ⚠️ Riscos & Mitigações

| Risco | Impacto | Mitigação |
|-------|--------|-----------|
| **Firewall bloqueia portas** | 🔴 Alto | Documentar IPs/portas a liberar; testar conectividade |
| **SSL self-signed em produção** | 🟡 Médio | Usar Let's Encrypt; guia incluído |
| **Dados perdidos sem backup** | 🔴 Alto | Script de backup automático (será criado) |
| **Performance lenta com muitos usuários** | 🟡 Médio | Monitoramento; guia de scaling (será criado) |
| **Segurança: exposição de portas** | 🔴 Alto | Usar nginx como reverse proxy; documentar best practices |

---

## 📅 Timeline Estimado

| Fase | Tempo | Detalhes |
|------|-------|----------|
| **Preparação** | 15 min | Criar estrutura + docs |
| **Docker & Compose** | 20 min | Criar docker-compose.yml + .env |
| **Nginx & SSL** | 15 min | Config nginx, gerar certificados dev |
| **BD (opcional)** | 10 min | PostgreSQL setup |
| **Testes** | 15 min | Iniciar, validar, testar portas |
| **Documentação** | 30 min | Guias para professores/alunos |
| **Total** | ~105 min | ~2 horas |

---

## ✅ Critérios de Aceite

Tarefa concluída quando:

- ✅ docker-compose.yml funcional (docker-compose up -d sem erros)
- ✅ Nginx reverse proxy respondendo (curl https://localhost)
- ✅ Portas 21115, 21117, 21119 acessíveis
- ✅ Todos os 10+ documentos criados
- ✅ Guias de uso para professor e aluno criados
- ✅ Arquivo README.md com instruções de deployment
- ✅ Todos os passos testados e verificados

---

## 🚀 Próximas Ações (Após Aprovação)

1. **Usuário aprova este plano** (explicitamente)
2. Claude executa cada fase sequencialmente
3. Claude atualiza status (`⬜ → 🔄 → ✅`) após cada passo
4. Ao fim: tabela final de resultados + commit consolidado

---

**Versão:** 1.0  
**Criado:** 2026-09-10  
**Aprovado:** ⬜ Aguardando confirmação do usuário
