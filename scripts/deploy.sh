#!/usr/bin/env bash

set -o errexit

APP='janis-staging'

CURRENT_CONFIG=$(heroku config --app "$APP")

JOPLIN_URL=$(heroku apps:info --shell --app joplin  | grep web_url | cut -d= -f2)

if [[ $CURRENT_CONFIG != *"CMS_API"* ]]; then
    heroku config:set CMS_API="$JOPLIN_URL"api/graphql --app "$APP"
fi

if [[ $CURRENT_CONFIG != *"CMS_MEDIA"* ]]; then
    heroku config:set CMS_MEDIA="$JOPLIN_URL"media --app "$APP"
fi

heroku container:push web --app "$APP"
