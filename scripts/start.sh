#!/usr/bin/env bash
D=`dirname $BASH_SOURCE`
set -o errexit
set -a # exports all assigned variables

ENV_TYPE=$1
BUILD=$2

if [ -z "$ENV_TYPE" ]; then
  echo "Please select an ENV_TYPE to build from (LOCAL, PR, STAGING, or PROD)"
  exit 1
fi

source $D/../.env

if [ "$ENV_TYPE" == "LOCAL" ]; then
  CMS_API=http://127.0.0.1:8000/api/graphql
  CMS_MEDIA=http://127.0.0.1:8000/media
elif [ "$ENV_TYPE" == "PR" ]; then
  CMS_API=https://$JOPLIN_APPNAME_PR.herokuapp.com/api/graphql
  CMS_MEDIA=https://joplin3-austin-gov-static.s3.amazonaws.com/review/$JOPLIN_APPNAME_PR/media
elif [ "$ENV_TYPE" == "STAGING" ]; then
  CMS_API=https://joplin-staging.herokuapp.com/api/graphql
  CMS_MEDIA=https://joplin3-austin-gov-static.s3.amazonaws.com/staging/media
elif [ "$ENV_TYPE" == "PROD" ]; then
  CMS_API=https://joplin.herokuapp.com/api/graphql
  CMS_MEDIA=https://joplin3-austin-gov-static.s3.amazonaws.com/production/media
fi

API_USERNAME=api_user@austintexas.io
API_PASSWORD_VAR_NAME="API_PASSWORD_$ENV_TYPE"
API_PASSWORD=${!API_PASSWORD_VAR_NAME}

NODE_PATH=./src

if [ "$BUILD" == "BUILD" ]; then
  yarn npm-run-all -p build-css build-js
  echo " 🏗 END of the Joplin Build 🏗 "
  npx http-server dist
else
  yarn npm-run-all -p watch-css start-js
fi
