#!/usr/bin/env bash
set -o errexit
set -a
CD=`dirname $BASH_SOURCE`

# Set Env vars
NODE_PATH=$CD/../src
CMS_API='http://localhost:8000/api/graphql' # Local API
CMS_MEDIA='https://joplin-austin-gov-static.s3.amazonaws.com/production/media' # Prod images

# Build
yarn install
yarn npm-run-all build-css build-js

# Serve
http-server dist -p 3000
