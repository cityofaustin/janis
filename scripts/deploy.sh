#!/usr/bin/env bash

set -o errexit

APP='janis-staging'

CURRENT_CONFIG=$(heroku config --app "$APP")

if [[ $CURRENT_CONFIG != *"REACT_APP_CMS_ENDPOINT"* ]]; then
    heroku config:set REACT_APP_CMS_ENDPOINT=https://joplin-staging.herokuapp.com/api --app "$APP"
fi

heroku container:push web --app "$APP"
