#!/usr/bin/env bash

export NODE_PATH='./src'
export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
export CMS_MEDIA='https://joplin-austin-gov.s3.amazonaws.com/media'

yarn npm-run-all build-css build-js
