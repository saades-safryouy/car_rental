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

echo "=== DEBUG MPM ==="
ls /etc/apache2/mods-enabled/ || true
grep -rn "LoadModule.*mpm" /etc/apache2/ || true

exec apache2-foreground
