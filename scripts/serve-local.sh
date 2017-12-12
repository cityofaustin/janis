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
    --volume "$PWD/yarn.lock:/app/yarn.lock" \
    -e "REACT_APP_CMS_ENDPOINT=http://localhost:8000/api" \
    "$TAG" "$@"
