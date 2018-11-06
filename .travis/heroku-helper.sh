function build_base_image {
  #DOCKER_IMAGE_TAG=$1

  #if [ "${DOCKER_IMAGE_TAG}" = "production" ]; then
  #  echo "Building Production"
  #elif [ "" = "staging"]; then
    #statements

  echo "Hello!"
}


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
#
#

function janis_tag_application {
    HEROKU_NEW_APP_NAME=$1

    # Needed Variables

    TAG_GOOGLE_ANALYTICS=""
    TAG_FEEDBACK_API=""
    TAG_CMS_API=""
    TAG_CMS_MEDIA=""
    TAG_AWS_BUCKET=$(janis_resolve_bucket)
    TAG_APPMODE=""

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


    janis_log ${FUNCNAME[0]} 1 "Tagging application: ${HEROKU_NEW_APP_NAME} ...";

    # Set Environment Variables
    heroku config:set   \
            DEPLOYMENT_MODE=$APPLICATION_MODE \
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


function janis_bucket_sync {

  janis_print_header "Syncing Build S3"

  BUCKET_NAME=$(janis_resolve_bucket)

  # If preview, then be sure there is a sub-folder
  if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
    BUCKET_NAME="${BUCKET_NAME}/joplin-staging-pr-${TRAVIS_PULL_REQUEST}";
  fi;

  BUCKET_NAME="s3://${BUCKET_NAME}"

  janis_log ${FUNCNAME[0]} 0 "Final Bucket Name: ${BUCKET_NAME}";

  janis_log ${FUNCNAME[0]} 1 "Syncing, please wait a few moments.";

  # aws s3 sync _dist/ $BUCKET_NAME;
}


function janis_build {
  RUN yarn build
  RUN yarn build-storybook
}

function janis_build_image {
  echo "Hello!"
}
