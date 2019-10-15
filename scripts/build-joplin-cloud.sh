#!/usr/bin/env bash

export NODE_PATH='./src'
export CMS_API='https://joplin.herokuapp.com/api/graphql'
export CMS_MEDIA='https://joplin-austin-gov.s3.amazonaws.com/media'
export CMS_DOCS='multiple'

if [ "$HEAD" == '3148-guide-image' ]; then
  export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
fi

# SAVE 👇 Example: "Let's your branchname is 2662-service-step-styling": Note trucation of name in CMS_API link.
# if [ "$HEAD" == '2662-service-step-styling' ]; then
#   export CMS_API='https://joplin-pr-2662-service-step-st.herokuapp.com/api/graphql'
# fi

yarn npm-run-all build-css build-js
