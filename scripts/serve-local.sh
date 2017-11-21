#!/usr/bin/env bash

set -o errexit

TAG='janis:local'

docker build --tag "$TAG" .
docker run \
    --rm \
    --name janis \
    --tty --interactive \
    --publish 3000:80 \
    --volume "$PWD/src:/app/src" \
    --volume "$PWD/public:/app/public" \
    --volume "$PWD/package.json:/app/package.json" \
    "$TAG" "$@"
