#!/usr/bin/env sh
set -o errexit

echo "Configuring server to run on port $PORT..."
sed "s/listen[[:blank:]]*80/listen ${PORT:-80}/" /etc/nginx/conf.d/default.conf | tee /etc/nginx/conf.d/default.conf

echo "Waiting for requests..."
exec "$@"
