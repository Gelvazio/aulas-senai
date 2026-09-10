# 📡 RustDesk Server OSS — Auto-hospedado com Docker

---

## 🎯 O Que é RustDesk?

**RustDesk** é um software **de código aberto** para **controle remoto de computadores** — similar ao TeamViewer ou AnyDesk, mas:
- ✅ 100% **código aberto** (GitHub)
- ✅ Pode ser **auto-hospedado** (seu próprio servidor)
- ✅ **Privado** — seus dados não saem do seu servidor
- ✅ **Gratuito** e sem limites de usuários
- ✅ Funciona em **Linux, Windows, macOS, Android, iOS**

---

## 🏗️ Arquitetura do RustDesk Server OSS

```
┌─────────────────────────────────────────────────────────────────┐
│                    RUSTDESK SERVER (Docker)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────┐      ┌──────────────────────┐          │
│  │  Relay Server       │      │  ID & Rendezvous     │          │
│  │  (hbbr)             │      │  Server (hbbs)       │          │
│  │                     │      │                      │          │
│  │ • Retransmite       │      │ • Registra clientes  │          │
│  │   dados entre       │      │ • Autentica users    │          │
│  │   cliente/servidor  │      │ • Gerencia IDs       │          │
│  │                     │      │ • Balanceia carga    │          │
│  │ Porta: 21117 (TCP) │      │                      │          │
│  │           21119      │      │ Porta: 21115 (TCP)  │          │
│  │ (UDP/TCP)           │      │                      │          │
│  └─────────────────────┘      └──────────────────────┘          │
│           ▲                              ▲                       │
│           └──────────────┬───────────────┘                       │
│                          │                                       │
│              Comunicação entre serviços                          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  CLIENTE (Computador remoto)                     │
│                                                                   │
│  ┌─────────────────┐                                            │
│  │ RustDesk Client │                                            │
│  │                 │                                            │
│  │ 1. Conecta ao   │                                            │
│  │    Rendezvous   │                                            │
│  │    (hbbs)       │                                            │
│  │                 │                                            │
│  │ 2. Obtém seu ID │                                            │
│  │    único         │                                            │
│  │                 │                                            │
│  │ 3. Fica ouvindo │                                            │
│  │    conexões      │                                            │
│  └─────────────────┘                                            │
│           │                                                      │
│           │ ID recebido                                          │
│           │                                                      │
│           ▼                                                      │
│  ┌──────────────────┐                                           │
│  │  hbbs (servidor) │                                           │
│  │  de ID           │                                           │
│  └──────────────────┘                                           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  CONTROLADOR (Seu PC/Smartphone)                 │
│                                                                   │
│  ┌─────────────────┐                                            │
│  │ RustDesk Admin  │                                            │
│  │                 │                                            │
│  │ 1. Conecta ao   │                                            │
│  │    Rendezvous   │                                            │
│  │    (hbbs)       │                                            │
│  │                 │                                            │
│  │ 2. Procura o ID │                                            │
│  │    do cliente    │                                            │
│  │                 │                                            │
│  │ 3. Estabelece   │                                            │
│  │    conexão P2P  │                                            │
│  │    ou via Relay │                                            │
│  └─────────────────┘                                            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔌 Componentes Principais

### 1️⃣ **hbbs** — ID & Rendezvous Server

**Função:** Gerenciador central de identidade e descoberta

| Aspecto | Detalhes |
|--------|----------|
| **Porta** | `21115` (TCP) |
| **Responsabilidades** | • Registra clientes (IDs únicos) • Autentica usuários • Facilita conexão P2P • Balanceia carga |
| **Banco de dados** | PostgreSQL ou SQLite (embutido) |
| **Tráfego** | Leve (apenas handshake inicial) |

**Fluxo:**
```
Cliente conecta → hbbs registra → retorna ID único
                  (ex: 123456789)
                  
Controlador procura → hbbs localiza cliente → facilita P2P
```

### 2️⃣ **hbbr** — Relay Server

**Função:** Retransmissor de dados (quando P2P não é possível)

| Aspecto | Detalhes |
|--------|----------|
| **Portas** | `21117` (TCP), `21119` (UDP/TCP) |
| **Responsabilidades** | • Retransmite vídeo/audio/entrada de teclado • Necessário quando há firewall • Usa mais banda que P2P |
| **Cenários** | Conexão por firewall, NAT, VPN |
| **Tráfego** | **Pesado** (toda sessão passa por aqui) |

**Fluxo:**
```
Se P2P falhar:
  Controlador → hbbr → Cliente
  (todos os dados passam pelo relay)
```

---

## 🐳 Docker: Como Começa

### Estrutura no Docker

```dockerfile
# Imagem: hbbs (ID Server) + hbbr (Relay)
# Usa: Rust + C++
# Base: Linux (Alpine ou Ubuntu)

docker run -d \
  --name rustdesk \
  -p 21115:21115 \
  -p 21117:21117 \
  -p 21119:21119 \
  -v rustdesk-data:/root \
  rustdesk/rustdesk-server:latest
```

### Sequência de Inicialização

```
1. Docker inicia container
   ↓
2. Sistema de arquivos montado (/root com volume)
   ↓
3. hbbs inicia (porta 21115)
   └─ Aguarda clientes se registrarem
   ↓
4. hbbr inicia (portas 21117, 21119)
   └─ Aguarda dados de retransmissão
   ↓
5. Serviço aguardando conexões (estado LISTEN)
   ├─ Cliente se conecta ao hbbs
   ├─ Recebe ID único
   └─ Fica pronto para ser controlado
```

---

## 📊 Fluxo de Sessão Completa

### Cenário: Você controla um PC remoto

```
┌─────────────────────────────────────────────────────────────┐
│ ETAPA 1: REGISTRO DO CLIENTE (PC remoto)                   │
└─────────────────────────────────────────────────────────────┘

  [PC Remoto] 
      │
      │ Conecta ao hbbs:21115
      │
      ▼
  [hbbs Server]
      │
      ├─ Valida certificado SSL
      ├─ Registra cliente
      └─ Retorna ID: 123456789
      
  [PC Remoto] (agora online)
      │
      └─ Aguarda conexão...

┌─────────────────────────────────────────────────────────────┐
│ ETAPA 2: VOCÊ CONECTA (Seu laptop/PC controlador)          │
└─────────────────────────────────────────────────────────────┘

  [Seu Laptop]
      │
      │ Abre RustDesk Admin
      │ Digita ID: 123456789
      │ Conecta ao hbbs:21115
      │
      ▼
  [hbbs Server]
      │
      ├─ Valida seu login/senha
      ├─ Localiza PC com ID 123456789
      └─ Facilita conexão P2P

┌─────────────────────────────────────────────────────────────┐
│ ETAPA 3: ESTABELECE CONEXÃO                                │
└─────────────────────────────────────────────────────────────┘

  OPÇÃO A: P2P Bem-sucedido (ideal)
  ───────────────────────────────
  [Seu Laptop] ◄──────────────────► [PC Remoto]
    (direto, sem hbbr)
    • Mais rápido
    • Menos latência
    • Mais privado

  OPÇÃO B: Via Relay (firewall)
  ─────────────────────────────
  [Seu Laptop] ◄──► [hbbr Relay] ◄──► [PC Remoto]
    (dados retransmitidos)
    • Necessário com firewall
    • Mais latência
    • Consome mais banda no servidor

┌─────────────────────────────────────────────────────────────┐
│ ETAPA 4: SESSÃO ATIVA                                       │
└─────────────────────────────────────────────────────────────┘

  Transmitindo continuamente:
  • Vídeo da tela remota → seu laptop
  • Entrada de teclado/mouse → PC remoto
  • Audio bidirecional (se habilitado)
  • Transferência de arquivos

  Se conexão cair:
  • Reconecta automaticamente
  • Tenta novamente P2P
  • Fallback para Relay se necessário
```

---

## 🔐 Segurança

### Autenticação

| Nível | Método |
|-------|--------|
| **Nível 1** | ID único (123456789) |
| **Nível 2** | Senha (opcional, com hash SHA-256) |
| **Nível 3** | Certificado SSL/TLS (encriptação) |

### Encriptação

```
• Transferência: AES-256 (encriptada)
• Chaves: Trocadas via TLS
• Certificado: Auto-assinado (Docker gera)
• Nada é armazenado sem consentimento
```

---

## 📈 Escalabilidade

| Aspecto | Detalhes |
|--------|----------|
| **Um servidor** | ~10.000 clientes simultâneos |
| **Limite de banda** | Depende da sua conexão Internet |
| **Limite de sessões** | Depende de CPU e RAM |
| **Múltiplos servidores** | Possível (cluster com load balancer) |

---

## 🚀 Caso de Uso: Sua Infraestrutura SENAI

Para **suporte técnico remoto em aulas SENAI**:

```
┌─────────────────────────────────────────────────────┐
│ SERVIDOR RUSTDESK (você mantém)                     │
│ • Instalado em VM ou cloud (AWS/Azure/DigitalOcean)│
│ • Docker simplifica deployment                      │
│ • Certificado SSL (Let's Encrypt via proxy nginx)   │
│ • Banco de dados PostgreSQL para logs e autenticação│
└─────────────────────────────────────────────────────┘
         ▲                          ▲
         │                          │
    ┌────┴──────┐              ┌────┴─────────┐
    │ Aluno 1   │              │ Professor    │
    │ (PC lab)  │              │ (seu PC)     │
    │ ID: 111   │              │              │
    └───────────┘              └──────────────┘

Professor conecta ID 111 → vê tela do aluno → pode ajudar remotamente

Vantagens:
✅ Suporte instantâneo
✅ Privado (seus servidores)
✅ Sem custo de licença
✅ Controla dados
✅ Funciona offline (sem cloud)
```

---

## 📋 Requisitos Docker

```yaml
Imagem: rustdesk/rustdesk-server:latest
CPU: 2+ cores
RAM: 1-2 GB (mínimo)
Armazenamento: 10 GB (para logs/dados)
Rede: 
  - 21115/tcp (hbbs)
  - 21117/tcp (hbbr)
  - 21119/tcp (hbbr UDP)
Firewall: Libere as 3 portas acima
```

---

## 🔗 Fluxo de Dados (Resumo)

```
CLIENTE (PC remoto)
   │
   ├─ Conecta hbbs:21115
   │  └─ Registra ID
   │
   └─ Aguarda (LISTEN)
   
CONTROLADOR (Seu PC)
   │
   ├─ Conecta hbbs:21115
   │  └─ Autentica
   │
   ├─ Procura ID do cliente
   │  └─ hbbs facilita
   │
   └─ Tenta P2P
      └─ Se falhar → usa hbbr:21117/21119

RESULTADO
   ├─ Se P2P: Client ◄──► Controller
   └─ Se Relay: Client ◄──► hbbr ◄──► Controller
```

---

## 📚 Resumo Final

| Conceito | O Que Faz |
|----------|-----------|
| **hbbs** | Descoberta de clientes (registra IDs, autentica) |
| **hbbr** | Retransmissor de dados (necessário com firewall) |
| **P2P** | Conexão direta (ideal, mais rápido) |
| **Relay** | Conexão via servidor (necessário com NAT/firewall) |
| **Docker** | Empacota ambos em um container, fácil de deploy |
| **Porta 21115** | hbbs (leve, apenas handshake) |
| **Portas 21117/21119** | hbbr (pesado, tráfego da sessão) |

---

## ✅ Próximos Passos (Para Implementar)

Se quiser usar no SENAI:

1. ✅ Provisionar servidor (VM na nuvem)
2. ✅ Instalar Docker
3. ✅ Configurar firewall (abrir 3 portas)
4. ✅ Executar container rustdesk
5. ✅ Configurar nginx (SSL/HTTPS via Let's Encrypt)
6. ✅ Criar usuários e políticas de acesso
7. ✅ Treinar alunos/professores no uso

---

**Versão:** 1.0  
**Data:** 2026-09-10  
**Status:** ✅ Documentação Completa
