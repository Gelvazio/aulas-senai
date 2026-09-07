# PHP 8.2 com Apache + Extensões necessárias
FROM php:8.2-apache

# Define timezone
RUN echo "America/Maceio" > /etc/timezone

# Instala extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Habilita mod_rewrite para rotas do Slim Framework
RUN a2enmod rewrite

# Define diretório de trabalho
WORKDIR /var/www/html

# Copia os arquivos da API para o container
COPY . /var/www/html/

# Define permissões corretas
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Cria arquivo .htaccess para rotear requisições via Slim
RUN cat > /var/www/html/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ api.php [QSA,L]
</IfModule>
EOF

# Configura VirtualHost do Apache
RUN cat > /etc/apache2/sites-available/000-default.conf << 'EOF'
<VirtualHost *:80>
    ServerAdmin admin@senai.local
    DocumentRoot /var/www/html

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Roteia todas as requisições para api.php
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^ api.php [QSA,L]
    </IfModule>
</VirtualHost>
EOF

# Expõe porta 80
EXPOSE 80

# Inicia Apache
CMD ["apache2-foreground"]
