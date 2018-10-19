#!/usr/bin/env bash
echo "starting..."

set -o errexit

TAG='janis:local'
echo "building docker image..."
docker build --tag "$TAG" .
echo "running docker image..."

# Determine local machine IP (OSX & Linux only)
case "$OSTYPE" in
  darwin*)  HOST_IP=$(ifconfig en0 | awk '$1 == "inet" {print $2}');;
  *)        HOST_IP=$(hostname  -I | awk '{ print $1 }');;
esac

# Allow overriding the host we want to use, use IP if none specified.
if [ "${HOST}" != "" ]; then
  FINAL_HOST=$HOST
else
  FINAL_HOST="${HOST_IP}:8000"
fi;

# Output to console for debugging
echo -ne "\e[33m\e[1m"
echo -e "> Using Host:       ${FINAL_HOST}"
echo -e "        CMS_API:    http://${FINAL_HOST}/api/graphql"
echo -e "        CMS_MEDIA:  http://${FINAL_HOST}/media"
echo -ne "\e[0m"

docker run \
    --rm \
    --name janis \
    --tty --interactive \
    --publish 3000:80 \
    --volume "$PWD/src:/app/src" \
    --volume "$PWD/public:/app/public" \
    --volume "$PWD/yarn.lock:/app/yarn.lock" \
    --volume "$PWD/package.json:/app/package.json" \
    --volume "$PWD/static.config.js:/app/static.config.js" \
    --volume "$PWD/.babelrc:/app/.babelrc" \
    --env "GOOGLE_ANALYTICS=UA-110716917-2" \
    --env "FEEDBACK_API=https://coa-test-form-api.herokuapp.com/process/" \
    --env "CMS_API=http://${FINAL_HOST}/api/graphql" \
    --env "CMS_MEDIA=http://${FINAL_HOST}/media" \
    "$TAG" "$@"
