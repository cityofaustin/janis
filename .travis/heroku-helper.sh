#
# GLOBAL VARIABLES
#

TAG_GOOGLE_ANALYTICS=""
TAG_FEEDBACK_API=""
TAG_CMS_API=""
TAG_CMS_MEDIA=""
TAG_AWS_BUCKET=""
TAG_APPMODE=""

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

    joplin_log ${FUNCNAME[0]} 1 "Creating new app on heroku: ${HEROKU_NEW_APP_NAME}  and attaching to pipeline: ${PIPELINE_NAME}"

    # Create app with specified name
    heroku create $HEROKU_NEW_APP_NAME --team $PIPELINE_TEAM

    # Add postgresql to the new app.
    joplin_attach_heroku_database $HEROKU_NEW_APP_NAME

    # Set Environment Variables
    joplin_tag_application $HEROKU_NEW_APP_NAME

    # Couple New app to pipeline (assign review (PR) stage):
    heroku pipelines:add $PIPELINE_NAME --app $HEROKU_NEW_APP_NAME --stage review
}


#
# Builds the docker container and pushes the image to the heroku repository
# where it can be tagged to an app and released.
#

function janis_build {
    janis_print_header "Building Janis"

    # Retrieve App Name
    janis_log ${FUNCNAME[0]} 0 "Resolving App Name for branch: $TRAVIS_BRANCH";
    APPNAME=$(joplin_resolve_heroku_appname $TRAVIS_BRANCH);
    janis_log ${FUNCNAME[0]} 1 "App name resolved: ${APPNAME}";


    janis_log ${FUNCNAME[0]} 1 "Logging in to Services ...";
    docker login --username=_ --password=$HEROKU_API_KEY registry.heroku.com

    janis_log ${FUNCNAME[0]} 2 "Output Status: $?"

    if [ "$?" = "1" ]; then
        helper_halt_deployment "Could not log in to heroky registry for '${APPNAME}' "
    fi;

    janis_log ${FUNCNAME[0]} 1 "Building:"
    janis_log ${FUNCNAME[0]} 2 "Image Name:        ${JOPLIN_IMAGE_NAME}"
    janis_log ${FUNCNAME[0]} 2 "Branch:            ${TRAVIS_BRANCH} (PR=${TRAVIS_PULL_REQUEST}, PRBRANCH=${TRAVIS_PULL_REQUEST_BRANCH})"
    janis_log ${FUNCNAME[0]} 2 "Application Name:  ${APPNAME}"


    janis_log ${FUNCNAME[0]} 2 "docker build -f \"Dockerfile.worker\" -t ${JANIS_IMAGE_NAME_WEB} ."

    docker build -f "Dockerfile.worker" -t $JANIS_IMAGE_NAME_WORKER .

    janis_log ${FUNCNAME[0]} 2 "docker build -f \"Dockerfile.build\" -t ${JANIS_IMAGE_NAME_WEB} ."

    docker build -f "Dockerfile.build" -t $JANIS_IMAGE_NAME_WEB .


    janis_log ${FUNCNAME[0]} 2 "Output Status: $?"

    if [ "$?" = "1" ]; then
        helper_halt_deployment "Could not build docker image for '${APPNAME}' "
    fi;

    janis_log ${FUNCNAME[0]} 1 "Tagging Image"

    janis_log ${FUNCNAME[0]} 3 "docker tag $JOPLIN_IMAGE_NAME registry.heroku.com/$APPNAME/web"
    docker tag $JANIS_IMAGE_NAME_WEB registry.heroku.com/$APPNAME/web

    janis_log ${FUNCNAME[0]} 2 "docker tag $JOPLIN_IMAGE_NAME registry.heroku.com/$APPNAME/web"
    docker tag $JANIS_IMAGE_NAME_WORKER registry.heroku.com/$APPNAME/worker

    janis_log ${FUNCNAME[0]} 3 "Output Status: $?"

    if [ "$?" = "1" ]; then
        helper_halt_deployment "Could not tag docker image for '${APPNAME}' "
    fi;

    janis_log ${FUNCNAME[0]} 1 "Pushing to Heroku Repository"
    janis_log ${FUNCNAME[0]} 1 "docker push registry.heroku.com/$APPNAME/web"
    docker push registry.heroku.com/$APPNAME/web
    janis_log ${FUNCNAME[0]} 1 "docker push registry.heroku.com/$APPNAME/worker"
    docker push registry.heroku.com/$APPNAME/worker

    janis_log ${FUNCNAME[0]} 2 "Output Status: $?"

    if [ "$?" = "1" ]; then
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

  # Make 'Release' API Call
  curl -n -X PATCH https://api.heroku.com/apps/$APPNAME/formation \
      -d "${JSON_PAYLOAD}" \
      -H "Content-Type: application/json" \
      -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
      -H "Authorization: Bearer ${HEROKU_API_KEY}"

  janis_log ${FUNCNAME[0]} 0 "Release process finished";
}
