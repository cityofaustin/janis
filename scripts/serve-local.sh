#!/usr/bin/env bash

set -o errexit

TAG='janis:local'

docker build --tag "$TAG" .
docker run \
    --rm \
    --name janis \
    --tty --interactive \
    --publish 3000:3000 \
    --volume "$PWD:/app" \
    "$TAG" "$@"
