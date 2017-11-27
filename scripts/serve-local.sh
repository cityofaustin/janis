#!/usr/bin/env bash
echo "starting..."

set -o errexit

echo "fetching node packages on host..."
mkdir -p .yarn-cache
yarn install --cache-folder .yarn-cache

TAG='janis:local'
echo "building docker image..."
docker build --tag "$TAG" .
echo "running docker image..."
docker run \
    --rm \
    --name janis \
    --tty --interactive \
    --publish 3000:80 \
    --volume "$PWD/src:/app/src" \
    --volume "$PWD/public:/app/public" \
    --volume "$PWD/package.json:/app/package.json" \
    --volume "$PWD/node_modules:/app/node_modules" \
    --volume "$PWD/.yarn-cache:/.yarn-cache" \
    "$TAG" "$@"