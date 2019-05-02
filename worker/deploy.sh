#!/usr/bin/env bash

set -e




#
# First we source our build script functions
#
source /app/aws-helper.sh;

#
# Now we need the file name and file url
#
FILE_UUID="$(cat /proc/sys/kernel/random/uuid | sha256sum | cut -d ' ' -f 1).txt"
LOG_URL="https://s3.amazonaws.com/${AWS_BUCKET_NAME}/_reserved/logs/${FILE_UUID}"


#
# Let's now notify the channel a new request
# to build janis has been made
#
if [[ "$SLACK_URL" != "" ]]; then
  curl -X POST -H 'Content-type: application/json' \
  --data "{\"text\":\":coffee: We've received a request to build janis. Take a cup of coffee, you will be notified whenever it's done.\"}" \
  $SLACK_URL;
fi;

function upload_logfile {
  aws s3 cp $FILE_UUID s3://$AWS_BUCKET_NAME/_reserved/logs/$FILE_UUID --acl public-read;
}

# This will be our catch-all error message.
function error_message_slack {
  if [[ "$SLACK_URL" != "" ]]; then
    upload_logfile;

    curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\":x: There was a problem building janis. Check the logs for details. ${LOG_URL}\"}" \
    $SLACK_URL;
  fi;
}

#
# Establish the trap
#
trap "error_message_slack" ERR;

#
# First we download the specific branch
#
#janis_download_code |& tee -a $FILE_UUID;



#
# We then build it
#
janis_build |& tee -a $FILE_UUID;

#
# If the build command exited with an error, then stop build.
#
if [[ "${PIPESTATUS[0]}" = "1" ]]; then
  error_message_slack;
  exit 1;
fi;



#
# Then we deploy the branch
#
janis_deploy |& tee -a $FILE_UUID;

echo "Last Exit Code: $?"

#
# Upload build log to bucket
#
upload_logfile;



#
# Send slack notification
#

if [[ "$DEPLOYMENT_MODE" = "PRODUCTION" ]]; then
  JANIS_BUILD_ID=$(cat janis_build_id);
  BUILD_MESSAGE="The build '${JANIS_BUILD_ID}' has been deployed.";
else
  BUILD_MESSAGE="The build has been deployed.";
fi

echo "Message: ${BUILD_MESSAGE}";
echo "LOG_URL: ${LOG_URL}";


if [[ "$SLACK_URL" != "" ]]; then
  curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\":white_check_mark: ${BUILD_MESSAGE} -- ${LOG_URL}\"}" \
        $SLACK_URL;
fi;
