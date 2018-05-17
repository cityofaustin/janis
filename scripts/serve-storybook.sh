#!/usr/bin/env bash
echo "starting..."

set -o errexit

TAG='storybook:local'
echo "building docker image..."
docker build --tag "$TAG" \
  --file Dockerfile.storybook \
  .
echo "running docker image..."
HOST_IP=$(ifconfig en0 | awk '$1 == "inet" {print $2}')
docker run \
    --rm \
    --name storybook \
    --tty --interactive \
    --publish 6006:80 \
    --volume "$PWD/src:/app/src" \
    --volume "$PWD/public:/app/public" \
    --volume "$PWD/yarn.lock:/app/yarn.lock" \
    --volume "$PWD/package.json:/app/package.json" \
    --volume "$PWD/.babelrc:/app/.babelrc" \
     --volume "$PWD/.storybook:/app/.storybook" \
    --env "GOOGLE_ANALYTICS=UA-110716917-2" \
    --env "FEEDBACK_API=https://coa-test-form-api.herokuapp.com/process/" \
    --env "CMS_API=http://$HOST_IP:8000/api/graphql/" \
    --env "CMS_MEDIA=http://$HOST_IP:8000/media" \
    "$TAG" "$@"
