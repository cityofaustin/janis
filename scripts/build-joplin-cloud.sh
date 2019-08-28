#!/usr/bin/env bash

export NODE_PATH='./src'
export CMS_API='https://joplin.herokuapp.com/api/graphql'
export CMS_MEDIA='https://joplin-austin-gov.s3.amazonaws.com/media'

if [ "$HEAD" == '2497-title-for-topic-and-tc' ]; then
  export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
fi

if [ "$HEAD" == '2599-guide-pages' ]; then
  export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
fi

if [ "$HEAD" == 'department-top-services' ]; then
  export CMS_API='http://joplin-pr-top-services-stuff.herokuapp.com/api/graphql'
fi

yarn npm-run-all build-css build-js
