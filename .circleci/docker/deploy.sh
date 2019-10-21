#!/usr/bin/env bash
D=`dirname $BASH_SOURCE`

# Run this script if you need to update your janis-ci-deploy Docker image
SHA=$(git rev-parse HEAD)
TAG="cityofaustin/janis-ci-deploy:${SHA:0:7}"
docker build -f $D/janis-ci-deploy.Dockerfile -t $TAG $D/..
docker push $TAG
