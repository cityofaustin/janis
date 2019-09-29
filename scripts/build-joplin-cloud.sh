#!/usr/bin/env bash

export NODE_PATH='./src'
export CMS_API='https://joplin.herokuapp.com/api/graphql'
export CMS_MEDIA='https://joplin-austin-gov.s3.amazonaws.com/media'

if [ "$HEAD" == '2811-hosted-documents' ]; then
  export CMS_API='http://joplin-pr-2972-change-datadump.herokuapp.com/api/graphql'
  export CMS_DOCS='https://joplin-austin-gov-static.s3.amazonaws.com/production/media/documents'
fi

yarn npm-run-all build-css build-js
