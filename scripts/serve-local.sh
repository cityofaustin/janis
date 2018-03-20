#!/usr/bin/env bash
echo "starting..."

set -o errexit

TAG='janis:local'
echo "building docker image..."
docker build --tag "$TAG" .
echo "running docker image..."
HOST_IP=$(ifconfig en0 | awk '$1 == "inet" {print $2}')

docker run \
    --rm \
    --name janis \
    --tty --interactive \
    --publish 3000:80 \
    --volume "$PWD/src:/app/src" \
    --volume "$PWD/public:/app/public" \
    --volume "$PWD/yarn.lock:/app/yarn.lock" \
    --volume "$PWD/package.json:/app/package.json" \
    --volume "$PWD/intl.buildlangs.js:/app/intl.buildlangs.js" \
    --volume "$PWD/static.config.js:/app/static.config.js" \
    --volume "$PWD/.babelrc:/app/.babelrc" \
    --env "GOOGLE_ANALYTICS=UA-110716917-2" \
    --env "FEEDBACK_API=https://coa-test-form-api.herokuapp.com/process/" \
    --env "CMS_API=http://$HOST_IP:8000/api/graphql" \
    --env "CMS_MEDIA=http://$HOST_IP:8000/media" \
    "$TAG" "$@"
