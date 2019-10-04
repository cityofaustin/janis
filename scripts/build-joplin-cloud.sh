#!/usr/bin/env bash

export NODE_PATH='./src'
export CMS_API='https://joplin.herokuapp.com/api/graphql'
export CMS_MEDIA='https://joplin-austin-gov.s3.amazonaws.com/media'
export CMS_DOCS='multiple'

if [ "$HEAD" == '2908-build-against-test-data' ]; then
  export CMS_API='https://joplin-pr-2908-test-data.herokuapp.com/api/graphql'
  export CMS_MEDIA='https://joplin-austin-gov-static.s3.amazonaws.com/staging/media'
fi

yarn npm-run-all build-css build-js
