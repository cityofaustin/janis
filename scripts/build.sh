#!/usr/bin/env bash

set -o errexit

TAG=${TAG:-janis-build:local}
CMS_URL=${CMS_URL:-https://joplin.herokuapp.com}

echo "Building image..."
docker build \
    --rm \
    --build-arg "CMS_API=$CMS_URL/api/graphql/" \
    --build-arg "CMS_MEDIA=$CMS_URL/media/" \
    --tag "$TAG" \
    --file Dockerfile.build \
    .
