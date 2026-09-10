# 🖥️ RustDesk Server OSS — Servidor Local para Sala de Aula

**Servidor de controle remoto auto-hospedado no seu notebook**

---

## ⚡ Quick Start (5 minutos)

### 1️⃣ Pré-requisitos

```bash
# Verificar se Docker está instalado
docker --version
docker-compose --version
```

Se não tiver Docker:
- **Windows/Mac:** Instale [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux:** `sudo apt install docker.io docker-compose`

### 2️⃣ Clonar/Preparar

```bash
cd rust-desk
```

### 3️⃣ Iniciar Servidor

```bash
# Build da imagem + iniciar containers
docker-compose up -d

# Ver logs em tempo real
docker-compose logs -f rustdesk
```

**Resultado esperado:**
```
✅ RustDesk Server iniciado com sucesso!

📡 Acessibilidade:
   • Localhost:     localhost:21115
   • IP Local:      192.168.x.x:21115
```

### 4️⃣ Descobrir seu ID

O RustDesk gera um **ID único** automaticamente. Para descobrir:

```bash
# Ver logs do container
docker-compose logs rustdesk | grep "ID:"

# Ou acesse em um navegador:
# http://localhost:21115
```

---

## 📱 Conectando em Sala de Aula

### Para Alunos

1. **Baixar RustDesk Client**
   - [Download](https://rustdesk.com/download.html)
   - Disponível: Windows, Mac, Linux, Android, iOS

2. **Conectar**
   - Abrir RustDesk Client
   - Clicar em "Connect"
   - Inserir o **ID do seu notebook** (ex: 123456789)
   - Clicar "Connect"

3. **Aprovar conexão**
   - Você verá notificação no seu notebook
   - Clique "Accept" para permitir
   - Pronto! Controle remoto ativado

### Para Professores (Você)

**Controlar um PC do aluno:**
```bash
# Abrir RustDesk Admin (instalado junto com Client)
# Inserir ID do aluno
# Conectar e controlar remotamente
```

---

## 🛑 Parar / Reiniciar

```bash
# Parar servidor
docker-compose down

# Reiniciar
docker-compose restart

# Limpar tudo (dados persistem)
docker-compose stop
docker-compose start

# Limpar tudo + dados (⚠️ irreversível)
docker-compose down -v
```

---

## 📊 Ver Status

```bash
# Verificar containers rodando
docker-compose ps

# Ver logs completos
docker-compose logs rustdesk

# Ver apenas últimas 50 linhas
docker-compose logs --tail=50 rustdesk

# Follow (tempo real)
docker-compose logs -f rustdesk
```

---

## 🔍 Troubleshooting

### "Porta 21115 já em uso"
```bash
# Encontrar processo usando porta
lsof -i :21115  # macOS/Linux
netstat -ano | findstr :21115  # Windows

# Matar processo ou trocar porta no docker-compose.yml
```

### "Connection refused"
```bash
# Verificar se container está rodando
docker-compose ps

# Se não estiver, iniciar
docker-compose up -d

# Ver erros
docker-compose logs rustdesk
```

### "Não consegue conectar via IP local"
```bash
# Verificar seu IP local
hostname -I  # Linux/Mac
ipconfig  # Windows (procure por IPv4 Address)

# Exemplo: 192.168.1.100
# Aluno conecta em: 192.168.1.100 (ID do servidor RustDesk)
```

### Firewall bloqueando portas
```bash
# Liberar portas no firewall (Windows)
netsh advfirewall firewall add rule name="RustDesk" dir=in action=allow protocol=tcp localport=21115 ^
remoteip=LocalSubnet

# Linux (ufw)
sudo ufw allow 21115/tcp
sudo ufw allow 21117/tcp
sudo ufw allow 21119/tcp
sudo ufw allow 21119/udp
```

---

## 📝 Arquivos Importantes

| Arquivo | Propósito |
|---------|-----------|
| **Dockerfile** | Define imagem Docker |
| **docker-compose.yml** | Orquestra containers |
| **.env** | Configurações (copie de .env.example) |
| **docs/** | Documentação completa |

---

## 🔐 Segurança em Sala de Aula

⚠️ **Para desenvolvimento/testing local:**
- ✅ Chave padrão `_000000` é suficiente
- ✅ Apenas rede local (não expor para internet)
- ✅ Confie em seus alunos 😄

⚠️ **Se quiser ambiente de produção:**
- 🔒 Mude `RUSTDESK_KEY` em `.env`
- 🔒 Configure SSL/HTTPS com nginx
- 🔒 Restrinja acesso por IP
- 📖 Veja `docs/SEGURANCA.md`

---

## 📚 Documentação Completa

- 📄 [CLAUDE.md](./CLAUDE.md) — Explicação técnica do RustDesk
- 📄 [docs/setup-rustdesk-infraestrutura.md](./docs/setup-rustdesk-infraestrutura.md) — Plano de deployment
- 📄 [Dockerfile](./Dockerfile) — Configuração da imagem
- 📄 [docker-compose.yml](./docker-compose.yml) — Orquestração

---

## 🎯 Casos de Uso em Sala

### ✅ Suporte Técnico
```
Aluno levanta a mão → Professor conecta via RustDesk
→ Vê a tela → Auxilia remotamente → Problema resolvido!
```

### ✅ Apresentação
```
Professor compartilha tela → Todos veem → Explicação interativa
```

### ✅ Monitoramento
```
Professor monitora PCs dos alunos → Verifica progresso
```

### ✅ Aula Prática
```
Professor demonstra na sua tela → Alunos replicam nos seus PCs
```

---

## 💾 Backup & Restore

```bash
# Fazer backup dos dados
docker-compose exec rustdesk tar czf backup.tar.gz /root

# Extrair backup
docker cp rustdesk:/root/backup.tar.gz .
tar xzf backup.tar.gz
```

---

## 🚀 Próximos Passos

1. ✅ Executar `docker-compose up -d`
2. ✅ Descobrir seu ID
3. ✅ Testar com um PC do laboratório
4. ✅ Treinar alunos a conectar
5. ✅ Usar em aula! 🎓

---

## 📞 Suporte

- 🐛 Problemas? Veja [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)
- 📖 Dúvidas? Leia [CLAUDE.md](./CLAUDE.md)
- 🔧 Customização? Edite [Dockerfile](./Dockerfile)

---

**Status:** ✅ Pronto para usar  
**Versão:** 1.0  
**Última atualização:** 2026-09-10
