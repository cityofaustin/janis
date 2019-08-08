#!/usr/bin/env bash

# -P : flag to run against production CMS_API and CMS_MEDIA endpoints
# -S : flag to run against staging endpoints
# -e <<EXECUTABLE>> : the command you want to run in docker container upon startup

# Run Janis container against local Joplin:
#   ./scripts/serve-local.sh
# Run Janis container against Production Joplin Endpoints:
#   ./scripts/serve-local.sh -P
# Run Janis container and run an executable inside docker container:
#   ./scripts/serve-local.sh -e "/bin/bash"
#   TODO: check that -e argument works for other scripts that may need it

echo "starting..."

set -o errexit
set -a # exports all assigned variables

NODE_ENV="local"
TAG='janis:local'

# Install dependencies on host machine, copy them over into dockerfile
echo "building docker image..."
DOCKER_BUILDKIT=1 docker build --tag "$TAG" .
echo "running docker image..."

# Get IP Address of local machine
HOST_IP=$(ifconfig en0 | awk '$1 == "inet" {print $2}')
# Endpoints for running against local Joplin
CMS_API="http://$HOST_IP:8000/api/graphql"
CMS_MEDIA="http://$HOST_IP:8000/media"
COMPOSE_PROJECT_NAME="janis"
unset EXEC

# Process Parameters
# if -P prod flag is used, then point to prod graphql and CMS
while getopts "PSe:M:A:" opt; do
  case $opt in
    P )
      CMS_API="https://joplin.herokuapp.com/api/graphql"
      CMS_MEDIA="https://joplin-austin-gov.s3.amazonaws.com/media"
      ;;
    S)
      CMS_API="https://joplin-staging.herokuapp.com/api/graphql"
      CMS_MEDIA="https://joplin-austin-gov.s3.amazonaws.com/media"
      ;;
    e )
      EXEC=$OPTARG
      ;;
    M )
      if [ "$OPTARG" == "prod" ]; then
        CMS_MEDIA="https://joplin-austin-gov.s3.amazonaws.com/media"
      elif [ "$OPTARG" == "staging" ]; then
        CMS_MEDIA="https://joplin-staging.s3.amazonaws.com/media"
      else
        CMS_MEDIA=$OPTARG
      fi
      ;;
    A )
      if [ "$OPTARG" == "prod" ]; then
        CMS_API="https://joplin.herokuapp.com/api/graphql"
      elif [ "$OPTARG" == "staging" ]; then
        CMS_API="https://joplin-staging.herokuapp.com/api/graphql"
      else
        CMS_MEDIA=$OPTARG
      fi
      ;;
    \? )
      echo "Invalid option: -$OPTARG" >&2
      exit;
      ;;
    : )
      echo "Invalid option: -$OPTARG requires an argument" 1>&2
      exit;
      ;;
  esac
done

echo "CMS_API is: $CMS_API"
echo "CMS_MEDIA is: $CMS_MEDIA"

docker-compose up

# docker run \
#     --rm \
#     --name janis \
#     --tty --interactive \
#     --publish 3000:80 \
#     --volume "$PWD/src:/app/src" \
#     --volume "$PWD/public:/app/public" \
#     --volume "$PWD/yarn.lock:/app/yarn.lock" \
#     --volume "$PWD/package.json:/app/package.json" \
#     --volume "$PWD/static.config.js:/app/static.config.js" \
#     --volume "$PWD/.babelrc:/app/.babelrc" \
#     --env "GOOGLE_ANALYTICS=UA-110716917-2" \
#     --env "FEEDBACK_API=https://coa-test-form-api.herokuapp.com/process/" \
#     --env "CMS_API=$CMS_API" \
#     --env "CMS_MEDIA=$CMS_MEDIA" \
#     "$TAG" $EXEC
