#!/usr/bin/env bash

set -o errexit

TAG='janis-build:local'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
. "$DIR/build.sh"

docker run \
  --rm \
  --name janis-build \
  --publish 8080:8080 \
  --env PORT=8080 \
  "$TAG" "$@"
