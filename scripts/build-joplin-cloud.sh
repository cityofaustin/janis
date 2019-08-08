#!/usr/bin/env bash

export NODE_PATH='./src'
export CMS_API='https://joplin.herokuapp.com/api/graphql'
export CMS_MEDIA='https://joplin-austin-gov.s3.amazonaws.com/media'

if [ "$HEAD" == '2572-official-doc' ]; then
  export CMS_API='https://joplin-pr-2572-official-doc.herokuapp.com/api/graphql'
fi

if [ "$HEAD" == '2599-guide-pages' ]; then
  export CMS_API='https://joplin-pr-2600-guides.herokuapp.com/api/graphql'
fi

yarn npm-run-all build-css build-js
