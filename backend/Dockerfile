FROM php:8.2-apache

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers du projet
COPY . .

# Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader

# Définir les permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Configuration Apache
RUN a2enmod rewrite
COPY docker/apache-config.conf /etc/apache2/sites-available/000-default.conf

# Copier et rendre exécutable le script d'entrée
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Exposer le port 80
EXPOSE 80

# Utiliser le script d'entrée
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]