#!/bin/bash

# Attendre que la base de données soit prête
echo "Waiting for database..."
sleep 10

# Générer la clé d'application si elle n'existe pas
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

php artisan key:generate --force

# Exécuter les migrations
php artisan migrate --force

# Créer le lien symbolique pour le storage
php artisan storage:link

# Optimiser l'application
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Démarrer Apache
apache2-foreground