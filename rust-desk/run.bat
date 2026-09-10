@echo off
REM =================================================
REM RustDesk Server - Iniciar com Docker
REM =================================================

setlocal enabledelayedexpansion

echo.
echo ================================================
echo 🚀 RustDesk Server - Iniciando...
echo ================================================
echo.

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERRO: Docker não está instalado!
    echo.
    echo Instale Docker Desktop em: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo ✅ Docker encontrado
echo.

REM Verificar se docker-compose está disponível
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  docker-compose não encontrado. Tentando com 'docker compose'...
    docker compose version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ ERRO: docker-compose não está disponível!
        pause
        exit /b 1
    )
    set DOCKER_COMPOSE=docker compose
) else (
    set DOCKER_COMPOSE=docker-compose
)

echo ✅ docker-compose encontrado
echo.

REM Iniciar containers
echo 🔧 Iniciando containers...
%DOCKER_COMPOSE% up -d

if %errorlevel% neq 0 (
    echo ❌ ERRO ao iniciar containers!
    pause
    exit /b 1
)

echo ✅ Containers iniciados com sucesso!
echo.

REM Aguardar um segundo para containers iniciarem
timeout /t 2 /nobreak >nul

REM Mostrar status
echo 📊 Status dos containers:
echo.
%DOCKER_COMPOSE% ps
echo.

REM Mostrar logs
echo 📡 Acompanhando logs (Ctrl+C para sair)...
echo.
%DOCKER_COMPOSE% logs -f rustdesk

pause
