#!/usr/bin/env bash

set -o errexit

TAG=${TAG:-janis-build:local}
HOST_IP=$(ifconfig en0 | awk '$1 == "inet" {print $2}')
CMS_URL=${CMS_URL:-http://$HOST_IP:8000}

echo "Building image..."
docker build \
    --rm \
    --build-arg "CMS_API=https://api.graph.cool/simple/v1/cjiko0lxw7cxf01886zbc1u9h" \
    --build-arg "CMS_MEDIA=https://joplin-staging.herokuapp.com/media" \
    --build-arg "FEEDBACK_API=https://coa-test-form-api.herokuapp.com/process/" \
    --build-arg "GOOGLE_ANALYTICS=UA-110716917-2" \
    --tag "$TAG" \
    --file Dockerfile.build \
    .
