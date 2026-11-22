#!/bin/bash
set -e
# Render injects $PORT (default 10000). Apache must listen on it.
PORT=${PORT:-10000}
sed -i "s/^Listen 80/Listen ${PORT}/" /etc/apache2/ports.conf || true
sed -i "s/:80>/:${PORT}>/" /etc/apache2/sites-available/000-default.conf || true

# Run migrations on every start (idempotent). Seed only on first deploy
# if the admins table is empty — handled by migrate --force; seeding is
# done manually once via Render Shell: php artisan db:seed --force
php artisan migrate --force
php artisan storage:link || true

# Railway persistent volume mounts storage/app/public as root-owned;
# make it writable for Apache (www-data) so image uploads survive redeploys.
mkdir -p storage/app/public
chown -R www-data:www-data storage/app/public || true
chmod -R 775 storage/app/public || true

# php:8.2-apache enables both mpm_event and mpm_prefork, which makes
# Apache fail with "More than one MPM loaded" (AH00534). mod_php needs
# prefork, so disable the other MPMs here at container start.
a2dismod mpm_event mpm_worker || true

exec apache2-foreground
