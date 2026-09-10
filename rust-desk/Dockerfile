# RustDesk Server OSS - Dockerfile para Auto-hospedagem Local
# Build: docker build -t rustdesk-server:latest .
# Run: docker run -d -p 21115:21115 -p 21117:21117 -p 21119:21119/udp -v rustdesk-data:/root rustdesk-server:latest

FROM ubuntu:22.04

# Metadados
LABEL maintainer="SENAI"
LABEL description="RustDesk Server OSS - Servidor de Controle Remoto"
LABEL version="1.0"

# Variáveis de ambiente
ENV DEBIAN_FRONTEND=noninteractive \
    RUSTDESK_SERVER_VERSION=latest \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

# Instalar dependências
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    wget \
    unzip \
    git \
    build-essential \
    libssl-dev \
    pkg-config \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Criar diretório de trabalho
WORKDIR /root

# Download da imagem pré-compilada do RustDesk (mais simples)
# Opção 1: Usar release pré-compilada (RECOMENDADO - mais rápido)
RUN curl -sSL https://github.com/rustdesk/rustdesk-server/releases/download/1.1.9/rustdesk-server-linux-x64.zip \
    -o rustdesk-server.zip && \
    unzip -o rustdesk-server.zip && \
    rm rustdesk-server.zip && \
    chmod +x hbbs hbbr && \
    ls -lah

# Expor portas
# hbbs: 21115 (TCP) - ID & Rendezvous Server
# hbbr: 21117 (TCP) - Relay Server
# hbbr: 21119 (TCP/UDP) - Relay Server secundário
EXPOSE 21115/tcp \
        21117/tcp \
        21119/tcp \
        21119/udp

# Criar estrutura de volumes
VOLUME ["/root"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:21115 || exit 1

# Criar script de entrada
RUN cat > /root/docker-entrypoint.sh << 'EOF'
#!/bin/bash
set -e

echo "=================================================="
echo "🚀 RustDesk Server OSS - Iniciando..."
echo "=================================================="
echo ""

# Verificar se arquivos existem
if [ ! -f "/root/hbbs" ] || [ ! -f "/root/hbbr" ]; then
    echo "❌ ERRO: Executáveis não encontrados!"
    echo "   Verifique se hbbs e hbbr existem em /root/"
    exit 1
fi

echo "✅ Executáveis encontrados:"
ls -lah /root/hbbs /root/hbbr

echo ""
echo "📊 Configuração:"
echo "  • hbbs (ID & Rendezvous Server): porta 21115"
echo "  • hbbr (Relay Server): portas 21117 (TCP), 21119 (TCP/UDP)"
echo ""

# Iniciar hbbs (background)
echo "🔧 Iniciando hbbs..."
/root/hbbs -k _000000 &
HBBS_PID=$!
echo "   PID: $HBBS_PID"

# Aguardar um segundo
sleep 1

# Iniciar hbbr (background)
echo "🔧 Iniciando hbbr..."
/root/hbbr -k _000000 &
HBBR_PID=$!
echo "   PID: $HBBR_PID"

echo ""
echo "=================================================="
echo "✅ RustDesk Server iniciado com sucesso!"
echo "=================================================="
echo ""
echo "📡 Acessibilidade:"
echo "   • Localhost:     localhost:21115"
echo "   • IP Local:      $(hostname -I | awk '{print $1}'):21115"
echo ""
echo "🎓 Para conectar em sala de aula:"
echo "   1. Descobra o ID do seu notebook"
echo "   2. Alunos conectam ao ID via RustDesk Client"
echo "   3. Aprovam conexão no seu notebook"
echo ""
echo "📝 Logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Parar servidor:"
echo "   docker-compose down"
echo ""
echo "=================================================="

# Manter containers rodando
wait

EOF

chmod +x /root/docker-entrypoint.sh

# Comando padrão
ENTRYPOINT ["/root/docker-entrypoint.sh"]
CMD [""]
