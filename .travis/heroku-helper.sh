#
# GLOBAL VARIABLES
#

TAG_GOOGLE_ANALYTICS=""
TAG_FEEDBACK_API=""
TAG_CMS_API=""
TAG_CMS_MEDIA=""
TAG_AWS_BUCKET=""
TAG_APPMODE=""


# The team name (a sort of sub-account in heroku)
PIPELINE_TEAM=$PIPELINE_TEAM_DEFAULT
# The name of the pipeline in the team account.
PIPELINE_NAME=$PIPELINE_NAME_DEFAULT

#
# Prints an indention based on the calling function
# $1 (string) name of the function
# $2 (int) level
# $3 (string) text
# Example: janis_log "myfunc" 3 "My Message";
# Example: janis_log ${FUNCNAME[0]} 1 "My Message";
#       ${FUNCNAME[0]} holds the name of the function where it is being accessed from.
#

function janis_log {
    RANGE=$(awk "BEGIN { print 5*${2} }")
    echo -n "${1}() "
    awk -v ORS=  "BEGIN { for (i = 1; i <= ${RANGE}; ++i) print \"-\" }" # leave ORS empty please
    echo -e " ${3}"
}

#
# Simply builds a noticeable header when parsing logs.
# This should help determine when our commands begin execution,
# and what branch is being affected by current deployment.
#

function janis_print_header {
    echo ""
    echo ""
    echo "--------------------------------------------------------------"
    echo "   $1"
    echo "--------------------------------------------------------------"
    echo "  TRAVIS_BRANCH:              ${TRAVIS_BRANCH}"
    echo "  TRAVIS_PULL_REQUEST:        ${TRAVIS_PULL_REQUEST}"
    echo "  TRAVIS_PULL_REQUEST_BRANCH: ${TRAVIS_PULL_REQUEST_BRANCH}"
    echo "  PIPELINE_TEAM:              ${PIPELINE_TEAM}"
    echo "  PIPELINE_NAME:              ${PIPELINE_NAME}"
    echo ""
}

#
# Prints error message and stops deployment by returing exit 1
# $1 (string) - Error message to display
# Example: helper_halt_deployment "File not found"
#

function helper_halt_deployment {
    echo -e "--------------------------------------------------------------"
    echo -e "${RED}FATAL ERROR:${NC}"
    echo -e "${1}"
    echo -e "--------------------------------------------------------------"
    travis_terminate 1;
}


#
# Turn the branch name into the app name in Heroku
#

function janis_resolve_heroku_appname {

    # Turn the branch name into the application name we need
    # production:   janis
    # master:       janis-staging

    # If there is a pull request number, then it must be a PR branch

    if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
        APPNAME="janis-staging-pr-${TRAVIS_PULL_REQUEST}"

    # If not, then proceed with the regular branch name (master, production)
    else
        case $TRAVIS_BRANCH in
            production)
                APPNAME="janis"
                ;;
            master)
                APPNAME="janis-staging"
                ;;
            *)
                helper_halt_deployment "The app name could not be resolved for branch: '${TRAVIS_BRANCH}'"
            ;;
        esac
    fi;

    # Output results for logging
    echo "${APPNAME}"
}


# Turn the branch name into the s3 bucket name

function janis_resolve_bucket {
    # If there is a pull request number, then it must be a PR branch
    if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
        BUCKETNAME=$AWS_BUCKET_PREVIEW

    # If not, then proceed with the regular branch name (master, production)
    else
        case $TRAVIS_BRANCH in
            production)
                BUCKETNAME=$AWS_BUCKET_PRODUCTION
                ;;
            master)
                BUCKETNAME=$AWS_BUCKET_STAGING
                ;;
            *)
                helper_halt_deployment "The bucket name could not be resolved for branch: '${TRAVIS_BRANCH}'"
            ;;
        esac
    fi;

    # Output results for logging
    echo "${BUCKETNAME}"
}

#
# Returns "True" if a given app name exists in heroku.
# $1 (string) The name of the app (ie. janis-staging, janis-pr-160)
#

function janis_app_exists {
    HEROKU_TEAM_APPS=$(heroku apps --team $PIPELINE_TEAM | grep $1)

    if [ "${HEROKU_TEAM_APPS}" != "" ]; then
        echo "true";
    else
        echo "false"
    fi;
}


#
# Finds out value for global variables
#

function janis_resolve_tags {
  # Set Bucket Variable
  TAG_AWS_BUCKET=$(janis_resolve_bucket)

  # Staging (master)
  if [ "${TRAVIS_BRANCH}" = "production" ]; then
    TAG_GOOGLE_ANALYTICS="${GOOGLE_ANALYTICS_PRODUCTION}"
    TAG_FEEDBACK_API="${FEEDBACK_API_PRODUCTION}"
    TAG_CMS_API="${CMS_API_PRODUCTION}"
    TAG_CMS_MEDIA="${CMS_MEDIA_PRODUCTION}"
    TAG_APPMODE="PRODUCTION"
  # Staging & PRs
  else
    if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
      TAG_APPMODE="PREVIEW"
    else
      TAG_APPMODE="STAGING"
    fi;

    TAG_GOOGLE_ANALYTICS="${GOOGLE_ANALYTICS_STAGING}"
    TAG_FEEDBACK_API="${FEEDBACK_API_STAGING}"
    TAG_CMS_API="${CMS_API_STAGING}"
    TAG_CMS_MEDIA="${CMS_MEDIA_STAGING}"
  fi;

  echo "------------------------------------------------"
  echo "-- Final Tag Values"
  echo "------------------------------------------------"
  echo "TAG_GOOGLE_ANALYTICS: ${TAG_GOOGLE_ANALYTICS}"
  echo "TAG_FEEDBACK_API: ${TAG_FEEDBACK_API}"
  echo "TAG_CMS_API: ${TAG_CMS_API}"
  echo "TAG_CMS_MEDIA: ${TAG_CMS_MEDIA}"
  echo "TAG_APPMODE: ${TAG_APPMODE}"
  echo "------------------------------------------------"
}



#
# "Tags" the Janis application with environment variables
#

function janis_tag_application {
    HEROKU_NEW_APP_NAME=$1

    janis_log ${FUNCNAME[0]} 1 "Tagging application: ${HEROKU_NEW_APP_NAME} ...";

    # Set Environment Variables
    heroku config:set   \
            DEPLOYMENT_MODE=$TAG_APPMODE \
            APPLICATION_NAME=$HEROKU_NEW_APP_NAME \
            AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
            AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
            AWS_S3_BUCKET=$TAG_AWS_BUCKET \
            HEROKU_API_KEY=$HEROKU_API_KEY \
            GOOGLE_ANALYTICS=$TAG_GOOGLE_ANALYTICS \
            FEEDBACK_API=$TAG_FEEDBACK_API \
            CMS_API=$TAG_CMS_API \
            CMS_MEDIA=$TAG_CMS_MEDIA \
            --app $HEROKU_NEW_APP_NAME;

    janis_log ${FUNCNAME[0]} 1 "Tagging Done";
}

#
#
#


#
# Builds a new review application and attaches the app to a pipeline with (review) status.
# $1 (string) The name of the app to create.
# $2 (string) The name of the pipeline
#

function janis_create_heroku_preview_app {
    # The new app name
    HEROKU_NEW_APP_NAME=$1

    janis_log ${FUNCNAME[0]} 1 "Creating new app on heroku: ${HEROKU_NEW_APP_NAME}  and attaching to pipeline: ${PIPELINE_NAME}"

    # Create app with specified name
    heroku create $HEROKU_NEW_APP_NAME --team $PIPELINE_TEAM

    # Add postgresql to the new app.
    janis_attach_heroku_database $HEROKU_NEW_APP_NAME

    # Set Environment Variables
    janis_tag_application $HEROKU_NEW_APP_NAME

    # Couple New app to pipeline (assign review (PR) stage):
    heroku pipelines:add $PIPELINE_NAME --app $HEROKU_NEW_APP_NAME --stage review
}

#
# Creates a pull request application and puts it in the specified pipeline.
# Requires no input variables.
#

function janis_create_pr_app {

    # Build Header,
    janis_print_header "Build PR Application"


    # We need a Pull request number that can be altered if necessary: PIPELINE_PULL_REQUEST
    # If empty, then copy the value from TRAVIS_PULL_REQUEST
    # If not empty, then we take PIPELINE_PULL_REQUEST over TRAVIS_PULL_REQUEST

    ## If empty, assume TRAVIS_PULL_REQUEST
    if [ "${PIPELINE_PULL_REQUEST}" = "" ]; then
        PIPELINE_PULL_REQUEST=$TRAVIS_PULL_REQUEST;

    ## else, we proceed with whatever value is in PIPELINE_PULL_REQUEST
    fi;

    janis_log ${FUNCNAME[0]} 0 "Beginning PR app creation process (PIPELINE_PULL_REQUEST: ${PIPELINE_PULL_REQUEST})"

    # If this is not a PR request, then move on to a regular deployment.
    if [ "${PIPELINE_PULL_REQUEST}" = "false" ]; then
        # This is not a new pr branch
        janis_log ${FUNCNAME[0]} 0 "This is not a new PR branch: (PIPELINE_PULL_REQUEST: ${PIPELINE_PULL_REQUEST}, TRAVIS_PULL_REQUEST: ${TRAVIS_PULL_REQUEST})."
        janis_log ${FUNCNAME[0]} 0 "Moving on, nothing to do here."

    # Else, we need to create a new PR review app.
    else
        # We have a legitimate pull request, so print out some details for logging.
        janis_log ${FUNCNAME[0]} 1 ">>> PR REQUEST"


        # If no name specified for the new app in the commit message command,
        # then generate a new name automatically.
        if [ "${PIPELINE_DEPLOYMENT_APP}" = "" ]; then
            PIPELINE_DEPLOYMENT_APP="janis-staging-pr-${PIPELINE_PULL_REQUEST}"
        fi;

        # Show current values
        janis_log ${FUNCNAME[0]} 1 ">>> Deployment details:"
        janis_log ${FUNCNAME[0]} 1 "Deploying new app:         ${PIPELINE_DEPLOYMENT_APP}"
        janis_log ${FUNCNAME[0]} 1 "Into Pipeline:             ${PIPELINE_NAME}"


        # We now must check if the current PR already exists.
        janis_log ${FUNCNAME[0]} 1 "Checking if review app already exists";
        APP_EXISTS=$(janis_app_exists $PIPELINE_DEPLOYMENT_APP)

        # If the review app exists, then check
        if [ "$APP_EXISTS" = "true" ]; then
            janis_log ${FUNCNAME[0]} 2 "App ${PIPELINE_DEPLOYMENT_APP} already exists.";

            janis_tag_application $PIPELINE_DEPLOYMENT_APP;

        # Let's go ahead and build the new review app with the new name
        else
            janis_log ${FUNCNAME[0]} 2 "Creating app ${PIPELINE_DEPLOYMENT_APP} one moment.";

            janis_create_heroku_preview_app $PIPELINE_DEPLOYMENT_APP
        fi;

        janis_log ${FUNCNAME[0]} 1 "Done Creating PR Review App"
    fi;

    janis_log ${FUNCNAME[0]} 0 "Done Building App"

}

#
# Builds the docker container and pushes the image to the heroku repository
# where it can be tagged to an app and released.
#

function janis_build {
    janis_print_header "Building Janis"

    # Retrieve App Name
    janis_log ${FUNCNAME[0]} 0 "Resolving App Name for branch: $TRAVIS_BRANCH";
    APPNAME=$(janis_resolve_heroku_appname);
    janis_log ${FUNCNAME[0]} 1 "App name resolved: ${APPNAME}";


    janis_log ${FUNCNAME[0]} 1 "Logging in to Services ...";
    docker login --username=_ --password=$HEROKU_API_KEY registry.heroku.com

    OUTPUT_STATUS="$?"
    janis_log ${FUNCNAME[0]} 2 "Output Status: ${OUTPUT_STATUS}"
    if [ "${OUTPUT_STATUS}" = "1" ]; then
        helper_halt_deployment "Could not log in to heroku registry for '${APPNAME}' "
    fi;

    janis_log ${FUNCNAME[0]} 1 "Building:"
    janis_log ${FUNCNAME[0]} 2 "Image Name (WEB):    ${JANIS_IMAGE_NAME_WEB}"
    janis_log ${FUNCNAME[0]} 2 "Image Name (WORKER): ${JANIS_IMAGE_NAME_WORKER}"
    janis_log ${FUNCNAME[0]} 2 "Branch:              ${TRAVIS_BRANCH} (PR=${TRAVIS_PULL_REQUEST}, PRBRANCH=${TRAVIS_PULL_REQUEST_BRANCH})"
    janis_log ${FUNCNAME[0]} 2 "Application Name:    ${APPNAME}"


    #
    # First: we build, tag & push the worker image.
    #

    janis_log ${FUNCNAME[0]} 1 "docker build -f \"Dockerfile.worker\" -t ${JANIS_IMAGE_NAME_WORKER} ."
    docker build -f "Dockerfile.worker" -t $JANIS_IMAGE_NAME_WORKER .

    OUTPUT_STATUS="$?"
    janis_log ${FUNCNAME[0]} 2 "Output Status: ${OUTPUT_STATUS}"
    if [ "${OUTPUT_STATUS}" = "1" ]; then
        helper_halt_deployment "Could not build docker image '${JANIS_IMAGE_NAME_WORKER}' for '${APPNAME}' "
    fi;

    janis_log ${FUNCNAME[0]} 1 "docker tag $JANIS_IMAGE_NAME_WORKER registry.heroku.com/$APPNAME/worker"
    docker tag $JANIS_IMAGE_NAME_WORKER registry.heroku.com/$APPNAME/worker

    OUTPUT_STATUS="$?"
    janis_log ${FUNCNAME[0]} 2 "Output Status: ${OUTPUT_STATUS}"
    if [ "${OUTPUT_STATUS}" = "1" ]; then
        helper_halt_deployment "Could not build docker image '${JANIS_IMAGE_NAME_WORKER}' for '${APPNAME}' "
    fi;


    janis_log ${FUNCNAME[0]} 1 "docker push registry.heroku.com/$APPNAME/worker"
    docker push registry.heroku.com/$APPNAME/worker

    OUTPUT_STATUS="$?"
    janis_log ${FUNCNAME[0]} 2 "Output Status: ${OUTPUT_STATUS}"
    if [ "${OUTPUT_STATUS}" = "1" ]; then
        helper_halt_deployment "Could not push docker image '${JANIS_IMAGE_NAME_WORKER}' for '${APPNAME}' "
    fi;

    #
    # Now the web image
    #

    janis_log ${FUNCNAME[0]} 1 "docker build -f \"Dockerfile.build\" -t ${JANIS_IMAGE_NAME_WEB} ."

    docker build -f "Dockerfile.build" -t $JANIS_IMAGE_NAME_WEB .

    OUTPUT_STATUS="$?"
    janis_log ${FUNCNAME[0]} 2 "Output Status: ${OUTPUT_STATUS}"
    if [ "${OUTPUT_STATUS}" = "1" ]; then
        helper_halt_deployment "Could not build docker image '${JANIS_IMAGE_NAME_WEB}' for '${APPNAME}' "
    fi;

    janis_log ${FUNCNAME[0]} 1 "Tagging Image"
    janis_log ${FUNCNAME[0]} 1 "docker tag $JANIS_IMAGE_NAME_WEB registry.heroku.com/$APPNAME/web"
    docker tag $JANIS_IMAGE_NAME_WEB registry.heroku.com/$APPNAME/web

    OUTPUT_STATUS="$?"
    janis_log ${FUNCNAME[0]} 2 "Output Status: ${OUTPUT_STATUS}"
    if [ "${OUTPUT_STATUS}" = "1" ]; then
        helper_halt_deployment "Could not build docker image '${JANIS_IMAGE_NAME_WEB}' for '${APPNAME}' "
    fi;

    janis_log ${FUNCNAME[0]} 1 "docker push registry.heroku.com/$APPNAME/web"
    docker push registry.heroku.com/$APPNAME/web

    OUTPUT_STATUS="$?"
    janis_log ${FUNCNAME[0]} 2 "Output Status: ${OUTPUT_STATUS}"
    if [ "${OUTPUT_STATUS}" = "1" ]; then
        helper_halt_deployment "Could not push docker image to Heroku registry for '${APPNAME}'."
    fi;

    janis_log ${FUNCNAME[0]} 0 "Finished Building Container";

}


#
# Calls the release function for a specific image to a specific application
#

function janis_release {
  janis_print_header "Releasing Docker Image"

  # Retrieve App Name
  APPNAME=$(janis_resolve_heroku_appname);

  # Determine image id to push
  DOCKER_IMAGE_ID_WEB=$(docker inspect registry.heroku.com/$APPNAME/web --format={{.Id}})
  DOCKER_IMAGE_ID_WORKER=$(docker inspect registry.heroku.com/$APPNAME/worker --format={{.Id}})

  if [ "$?" = "1" ]; then
      helper_halt_deployment "An error happened when trying to determine docker image id for '${APPNAME}'."
  fi;


  if [ "${DOCKER_IMAGE_ID_WEB}" = "" ]; then
      helper_halt_deployment "Could not determine image id to push for '${APPNAME}'."
  fi;

  janis_log ${FUNCNAME[0]} 0 "Releasing Build for Branch: $TRAVIS_BRANCH, App: $APPNAME";
  janis_log ${FUNCNAME[0]} 0 "Docker Image Id (Web): $DOCKER_IMAGE_ID_WEB";
  janis_log ${FUNCNAME[0]} 0 "Docker Image Id (Worker): $DOCKER_IMAGE_ID_WORKER";

  # Gemerate json payload to upload via API
  JSON_PAYLOAD='{"updates":[{"type":"web","docker_image":"'"${DOCKER_IMAGE_ID_WEB}"'"},{"type":"worker","docker_image":"'"${DOCKER_IMAGE_ID_WORKER}"'"}]}'

  echo "JSON_PAYLOAD: ${JSON_PAYLOAD}"

  # Make 'Release' API Call
  curl -n -X PATCH https://api.heroku.com/apps/$APPNAME/formation \
      -d "${JSON_PAYLOAD}" \
      -H "Content-Type: application/json" \
      -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
      -H "Authorization: Bearer ${HEROKU_API_KEY}"



  janis_log ${FUNCNAME[0]} 0 "Release process finished";
}
