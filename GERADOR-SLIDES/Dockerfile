FROM python:3.14-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Coletar estáticos
RUN python manage.py collectstatic --noinput 2>/dev/null || true

# Port
EXPOSE 8000

# Comando
CMD ["gunicorn", "gerador_config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
