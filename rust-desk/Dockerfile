# RustDesk Server OSS - Dockerfile simplificado e funcional
# Build: docker build -t rustdesk-server:latest .
# Run: docker-compose up -d

FROM ubuntu:22.04

LABEL maintainer="SENAI"
LABEL description="RustDesk Server OSS - Servidor de Controle Remoto"

ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependências básicas
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    curl \
    unzip \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /root

# Download dos binários pré-compilados do RustDesk (versão 1.1.9)
RUN wget -q https://github.com/rustdesk/rustdesk-server/releases/download/1.1.9/rustdesk-server-linux-x64.zip -O rustdesk.zip && \
    unzip -q rustdesk.zip && \
    rm rustdesk.zip && \
    chmod +x hbbs hbbr && \
    ls -lah hbbs hbbr

# Expor portas
EXPOSE 21115/tcp 21117/tcp 21119/tcp 21119/udp

# Volume para dados persistentes
VOLUME ["/root"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:21115 2>/dev/null || exit 1

# Entrypoint script
RUN cat > /root/entrypoint.sh << 'SCRIPT'
#!/bin/bash
set -e

echo "🚀 RustDesk Server iniciando..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Iniciar hbbs (ID & Rendezvous Server) em background
echo "🔧 Iniciando hbbs (porta 21115)..."
/root/hbbs -k _ &
HBBS_PID=$!

# Aguardar um segundo
sleep 1

# Iniciar hbbr (Relay Server) em background
echo "🔧 Iniciando hbbr (portas 21117, 21119)..."
/root/hbbr -k _ &
HBBR_PID=$!

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ RustDesk Server iniciado com sucesso!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📡 Serviços rodando:"
echo "  • hbbs: localhost:21115"
echo "  • hbbr: localhost:21117, 21119"
echo ""
echo "🎓 Para conectar alunos:"
echo "  1. Alunos baixam RustDesk Client"
echo "  2. Conectam ao ID do seu notebook"
echo ""

# Aguardar indefinidamente (mantém container rodando)
wait $HBBS_PID $HBBR_PID

SCRIPT

# Dar permissão de execução ao script
RUN chmod +x /root/entrypoint.sh

# Comando padrão
ENTRYPOINT ["/root/entrypoint.sh"]
