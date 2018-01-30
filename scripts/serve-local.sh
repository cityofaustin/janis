#!/usr/bin/env bash
echo "starting..."

set -o errexit

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
    --volume "$PWD/static.config.js:/app/static.config.js" \
    --volume "$PWD/.babelrc:/app/.babelrc" \
    --volume "$PWD/yarn.lock:/app/yarn.lock" \
    --env "CMS_API=http://$(ifconfig en0 | awk '$1 == "inet" {print $2}'):8000/api/graphql/" \
    --env "CMS_MEDIA=http://$(ifconfig en0 | awk '$1 == "inet" {print $2}'):8000/media/" \
    "$TAG" "$@"
