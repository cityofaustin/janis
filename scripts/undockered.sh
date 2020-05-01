#!/usr/bin/env bash
set -o errexit
set -a
CD=`dirname $BASH_SOURCE`

# Set Env vars
NODE_PATH=$CD/../src
CMS_API='http://localhost:8000/api/graphql' # Local API
CMS_MEDIA='https://joplin3-austin-gov-static.s3.amazonaws.com/production/media' # Prod images

# Process Parameters
# if -P prod flag is used, then point to prod graphql and CMS
while getopts "PSe:M:A:" opt; do
  case $opt in
    P )
      CMS_API="https://joplin.herokuapp.com/api/graphql"
      CMS_MEDIA="https://joplin3-austin-gov-static.s3.amazonaws.com/production/media"
      ;;
    S)
      CMS_API="https://joplin-staging.herokuapp.com/api/graphql"
      CMS_MEDIA="https://joplin3-austin-gov-static.s3.amazonaws.com/staging/media"
      ;;
    e )
      EXEC=$OPTARG
      ;;
    M )
      if [ "$OPTARG" == "prod" ]; then
        CMS_MEDIA="https://joplin3-austin-gov-static.s3.amazonaws.com/production/media"
      elif [ "$OPTARG" == "staging" ]; then
        CMS_MEDIA="https://joplin3-austin-gov-static.s3.amazonaws.com/staging/media"
      else
        CMS_MEDIA=$OPTARG
      fi
      ;;
    A )
      if [ "$OPTARG" == "prod" ]; then
        CMS_API="https://joplin.herokuapp.com/api/graphql"
      elif [ "$OPTARG" == "staging" ]; then
        CMS_API="https://joplin-staging.herokuapp.com/api/graphql"
      else
        CMS_API=$OPTARG
      fi
      ;;
    \? )
      echo "Invalid option: -$OPTARG" >&2
      exit;
      ;;
    : )
      echo "Invalid option: -$OPTARG requires an argument" 1>&2
      exit;
      ;;
  esac
done

echo "CMS_API is: $CMS_API"
echo "CMS_MEDIA is: $CMS_MEDIA"

yarn start
