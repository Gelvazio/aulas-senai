# 🐳 API PHP SENAI - Guia Docker

Este documento explica como usar Docker para subir a API PHP localmente e em produção.

---

## 📋 Pré-requisitos

- **Docker** (versão 20.10+) — [Instalar](https://www.docker.com/products/docker-desktop)
- **Docker Compose** (versão 1.29+) — incluído no Docker Desktop

---

## 🚀 Quickstart — Subir a API em 30 segundos

### 1️⃣ Clonar/Entrar na pasta da API

```bash
cd C:\fontes\aulas-senai\GERADOR-SLIDES\apiphp
```

### 2️⃣ Iniciar containers

```bash
docker-compose up -d
```

Pronto! A API estará disponível em:
- **API:** `http://localhost:8080`
- **Ping:** `http://localhost:8080/ping`
- **PostgreSQL:** `localhost:5432` (usuário: `senai_user`, senha: `senai_password_dev`)

---

## 🛠️ Comandos Docker Compose Úteis

```bash
# Iniciar services (background)
docker-compose up -d

# Ver logs da API
docker-compose logs -f api

# Ver logs do PostgreSQL
docker-compose logs -f postgres

# Parar todos os services
docker-compose down

# Parar e remover volumes (limpar dados do BD)
docker-compose down -v

# Reconstruir imagem da API
docker-compose build api

# Executar comando dentro do container da API
docker-compose exec api bash

# Ver status dos containers
docker-compose ps
```

---

## 🔗 Endpoints Disponíveis

Após subir a API, você pode testar os seguintes endpoints:

### ✅ Health Check
```bash
curl http://localhost:8080/ping
```

### 👤 Usuários
```bash
# Listar usuários
curl http://localhost:8080/users

# Criar usuário
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"login":"aluno","senha":"123456"}'

# Login
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"login":"aluno","senha":"123456"}'
```

### 👥 Pessoas
```bash
# Listar pessoas
curl http://localhost:8080/pessoa

# Criar pessoa
curl -X POST http://localhost:8080/pessoa \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao@senai.com"}'
```

---

## 🗂️ Estrutura do Docker

### Dockerfile
- **Base:** `php:8.2-apache`
- **Extensões:** PDO, PostgreSQL
- **Rewrite:** Slim Framework com mod_rewrite habilitado

### docker-compose.yml
- **api:** Servidor PHP + Apache na porta 8080
- **postgres:** Banco de dados PostgreSQL (opcional, mas recomendado)

---

## 🔧 Variáveis de Ambiente

Configure variables no `docker-compose.yml` ou crie arquivo `.env`:

```bash
# Timezone
TIMEZONE=America/Maceio

# PHP Memory Limit
PHP_MEMORY_LIMIT=256M

# PHP Max Execution Time
PHP_MAX_EXECUTION_TIME=300
```

---

## 🌍 Exposição para a Web (Nginx Reverse Proxy)

Para expor a API na internet, use um reverse proxy como Nginx:

```yaml
# Adicionar ao docker-compose.yml
nginx:
  image: nginx:latest
  container_name: senai-nginx
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ./nginx.conf:/etc/nginx/nginx.conf:ro
    - ./ssl:/etc/nginx/ssl:ro
  networks:
    - senai-network
  depends_on:
    - api
```

---

## 📊 Monitoramento

### Ver CPU/Memória dos containers
```bash
docker stats senai-api-php senai-postgres
```

### Ver logs em tempo real
```bash
docker-compose logs -f --tail=50
```

---

## 🔒 Segurança em Produção

### ⚠️ IMPORTANTE: Mudar credenciais padrão

Antes de enviar para produção:

1. **Mude a senha do PostgreSQL:**
   ```yaml
   POSTGRES_PASSWORD: sua_senha_super_segura
   ```

2. **Mude port do PostgreSQL:**
   ```yaml
   ports:
     - "127.0.0.1:5432:5432"  # Acessível apenas localmente
   ```

3. **Gere certificado SSL:**
   ```bash
   # Usando Let's Encrypt
   certbot certonly --standalone -d seu-dominio.com
   ```

4. **Configure CORS no api.php:**
   ```php
   // Apenas domínios autorizados
   ->withHeader('Access-Control-Allow-Origin', 'https://seu-dominio.com')
   ```

---

## ❌ Troubleshooting

### Erro: "Port 8080 already in use"
```bash
# Mudar porta no docker-compose.yml
ports:
  - "8081:80"  # Usar 8081 em vez de 8080
```

### Erro: "Cannot connect to PostgreSQL"
```bash
# Verificar se o container está rodando
docker-compose ps

# Ver logs do PostgreSQL
docker-compose logs postgres

# Reiniciar PostgreSQL
docker-compose restart postgres
```

### Erro: "API retorna 500"
```bash
# Ver logs detalhados
docker-compose logs -f api

# Verificar permissions
docker-compose exec api chmod -R 755 /var/www/html
```

---

## 📚 Mais Informações

- [Docker Docs](https://docs.docker.com/)
- [PHP Docker Hub](https://hub.docker.com/_/php)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [Slim Framework](https://www.slimframework.com/)

---

**Criado em:** 2026-09-07  
**Última atualização:** 2026-09-07  
**Autor:** Claude AI + Professor Gelvazio
