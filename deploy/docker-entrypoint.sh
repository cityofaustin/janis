#!/usr/bin/env sh
set -o errexit

NGINX_CONFIG_FILE='/etc/nginx/conf.d/default.conf'

echo "Setting up $NGINX_CONFIG_FILE..."
envsubst < $NGINX_CONFIG_FILE | tee $NGINX_CONFIG_FILE

echo "Waiting for requests..."
exec "$@"
