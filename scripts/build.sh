#!/usr/bin/env bash

set -o errexit

TAG=${TAG:-janis-build:local}
HOST_IP=$(ifconfig en0 | awk '$1 == "inet" {print $2}')
CMS_URL=${CMS_URL:-http://$HOST_IP:8000}

echo "Building image..."
docker build \
    --rm \
    --build-arg "CMS_API=$CMS_URL/api/graphql/" \
    --build-arg "CMS_MEDIA=$CMS_URL/media/" \
    --tag "$TAG" \
    --file Dockerfile.build \
    .
