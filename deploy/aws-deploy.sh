#!/usr/bin/env bash

# 1. Generate path to S3 bucket
if [ "${DEPLOYMENT_MODE}" = "PREVIEW" ]; then
  DEPLOYMENT_PATH="s3://${AWS_S3_BUCKET}/${APPLICATION_NAME}";
  S3_APPURL="http://${AWS_S3_BUCKET}.s3-website-us-east-1.amazonaws.com/${APPLICATION_NAME}";
else
  DEPLOYMENT_PATH="s3://${AWS_S3_BUCKET}";
  S3_APPURL="http://${AWS_S3_BUCKET}.s3-website-us-east-1.amazonaws.com/";
fi

echo $DEPLOYMENT_PATH;

# 2. Perform sync
#aws s3 sync _dist/ $DEPLOYMENT_PATH;

# 3. Print URL

echo "You may now see the site here:"
echo "-- ${S3_APPURL}";

# 4. Test
#yarn test
OUTPUT=$(yarn test | tee /dev/stderr)

if [[ "${OUTPUT}" =~ "ERROR" ]]; then
  echo "There has been an error in the testing stage. Stopping Deployment Process."
  exit 1;
else
  echo "All tests passed. Proceeding.";
fi;
