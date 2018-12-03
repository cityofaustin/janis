#!/usr/bin/env bash
echo "Running worker..."

set -o errexit

APPLICATION_NAME="janis-staging-pr-276"
AWS_S3_BUCKET="janis-austin-gov-preview"
CMS_API="http://joplin-staging.herokuapp.com/api/graphql"
CMS_MEDIA="http://janis-staging.herokuapp.com/media"
APPLICATION_URL="http://$AWS_S3_BUCKET.s3-website-us-east-1.amazonaws.com"
TAG='janis-worker-mocha:local'

#
# Be sure to change the application name to your current PR.
#
echo "------------------------------------------------------------"
echo "Running Worker Locally"
echo "APPLICATION_NAME: $APPLICATION_NAME"
echo "APPLICATION_URL: $APPLICATION_URL"
echo "AWS_S3_BUCKET: $AWS_S3_BUCKET"
echo "CMS_API: $CMS_API"
echo "CMS_MEDIA: $CMS_MEDIA"
echo "------------------------------------------------------------"


docker build -f Dockerfile.worker -t "$TAG" .

docker run -it --rm \
		--env "APPLICATION_NAME=$APPLICATION_NAME" \
		--env "APPLICATION_URL=$APPLICATION_URL" \
		--env "AWS_S3_BUCKET=$AWS_S3_BUCKET" \
		--env "DEPLOYMENT_MODE=PREVIEW" \
		--env "GOOGLE_ANALYTICS=UA-110716917-2" \
		--env "FEEDBACK_API=https://coa-test-form-api.herokuapp.com/process/" \
		--env "CMS_API=$CMS_API" \
		--env "CMS_MEDIA=$CMS_MEDIA" \
		$TAG "$@"
