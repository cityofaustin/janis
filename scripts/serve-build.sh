#!/usr/bin/env bash

set -o errexit

TAG='janis-buildo:local'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
. "$DIR/build.sh"

echo "Waiting for requests..."
docker run \
  --rm \
  --name janis-build \
  --publish 8080:80 \
  "$TAG" "$@"
