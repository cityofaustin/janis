#!/usr/bin/env bash

export NODE_PATH='./src'
export CMS_API='https://joplin.herokuapp.com/api/graphql'
export CMS_MEDIA='https://joplin-austin-gov.s3.amazonaws.com/media'
export CMS_DOCS='multiple'

if [ "$HEAD" == 'figure-out-build-issues' ]; then
  export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
fi

yarn npm-run-all build-css build-js
