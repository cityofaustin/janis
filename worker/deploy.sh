#!/usr/bin/env bash
set -e;


#
# First we source our build script functions
#
source /app/aws-helper.sh;

#
# Now we need the file name and file url

# Let's generate a unique hash
UNIQUE_HASH=$(cat /proc/sys/kernel/random/uuid | sha256sum | cut -d ' ' -f 1);
# This is the unique log file name
FILE_UUID="${UNIQUE_HASH}.txt"
# This is the build log link that will be published in slack
LOG_URL="https://s3.amazonaws.com/${AWS_BUCKET_NAME}/_reserved/logs/${FILE_UUID}"
# We need this to identify builds in slack messages
BUILD_ID=$(echo -n "${UNIQUE_HASH}" | cut -c1-6);
# For our time elapsed method
SECONDS=0

#
# Let's now notify the channel a new request
# to build janis has been made
#
if [[ "$SLACK_URL" != "" ]]; then

  #
  # We need to allocate space for a custom message.
  #
  if [[ "${SLACK_MESSAGE}" != "" ]]; then
      curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"$(date) ${BUILD_ID} -- ${SLACK_MESSAGE}\"}" \
            $SLACK_URL;
  fi;

  # Now we signal that the request to build janis has been received.
  curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"$(date) ${BUILD_ID} -- :coffee: We've received a request to build janis. Take a cup of coffee, you will be notified whenever it's done.\"}" \
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
    --data "{\"text\":\"$(date) ${BUILD_ID} -- :x: There was a problem building janis. Check the logs for details. ${LOG_URL}\"}" \
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



#
# We now have to clear the cache (if a distro is defined)
#
janis_clearcache |& tee -a $FILE_UUID;

echo "Last Exit Code: $?"

#
# Upload build log to bucket
#
upload_logfile;



#
# Send slack notification
#

#if [[ "$DEPLOYMENT_MODE" = "PRODUCTION" ]]; then
#  JANIS_BUILD_ID=$(cat janis_build_id);
#  BUILD_MESSAGE="The build '${JANIS_BUILD_ID}' has been deployed.";
#else
#  BUILD_MESSAGE="The build has been deployed.";
#fi

BUILD_MESSAGE="The build has been deployed.";

echo "Message: ${BUILD_MESSAGE}";
echo "LOG_URL: ${LOG_URL}";

#
# We are going to submit a notification to slack when complete.
#
if [[ "$SLACK_URL" != "" ]]; then
  duration=$SECONDS;

  curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"$(date) ${BUILD_ID} -- :white_check_mark: ${BUILD_MESSAGE} -- Build Duration: $(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed. -- ${LOG_URL}\"}" \
        $SLACK_URL;
fi;


