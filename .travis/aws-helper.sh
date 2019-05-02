#!/usr/bin/env bash


#
# Colors
#

    RED='\033[0;31m'
    NC='\033[0m' # No Color

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
# Identify 'Production' or 'Staging' branches
#

DEPLOYMENT_MODE="not-available"

#
# We need the branch name
#

if [ "${TRAVIS_BRANCH}" == "" ]; then
  helper_halt_deployment "Branch name not defined in variable TRAVIS_BRANCH."
fi;


#
# We need AWS permissions
#

if [ "${AWS_ACCESS_KEY_ID}" == "" ] || [ "${AWS_DEFAULT_REGION}" == "" ] || [ "${AWS_SECRET_ACCESS_KEY}" == "" ]; then
  helper_halt_deployment "Halting deployment, please check your AWS API keys."
fi;


#
# We will need to determine the deployment mode (environment, ie. production or staging)
#

if [ "${TRAVIS_BRANCH}" == "production" ]; then
  export DEPLOYMENT_MODE="PRODUCTION"
  export GOOGLE_ANALYTICS=$GOOGLE_ANALYTICS_PRODUCTION
  export FEEDBACK_API=$FEEDBACK_API_PRODUCTION
  export CMS_API=$CMS_API_PRODUCTION
  export CMS_MEDIA=$CMS_MEDIA_PRODUCTION
  export BASE_PATH_PR="/"
  export JANIS_IMAGE_VERSION="latest"
elif [ "${TRAVIS_BRANCH}" == "master" ]; then
  export DEPLOYMENT_MODE="STAGING"
  # GOOGLE_ANALYTICS=$GOOGLE_ANALYTICS_STAGING
  # FEEDBACK_API=$FEEDBACK_API_STAGING
  # CMS_API=$CMS_API_STAGING
  # CMS_MEDIA=$CMS_MEDIA_STAGING
  export GOOGLE_ANALYTICS=$GOOGLE_ANALYTICS_PRODUCTION
  export FEEDBACK_API=$FEEDBACK_API_PRODUCTION
  export CMS_API=$CMS_API_PRODUCTION
  export CMS_MEDIA=$CMS_MEDIA_PRODUCTION
  export BASE_PATH_PR="/"
  export JANIS_IMAGE_VERSION="master"
else
  helper_halt_deployment "TRAVIS_BRANCH: '${TRAVIS_BRANCH}' cannot be deployed to staging or production."
fi;


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
    echo "  DEPLOYMENT_MODE:            ${DEPLOYMENT_MODE}"
    echo ""
}

# Returns TRUE if this is a Pull Request
function is_pull_request {
    if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
      echo "FALSE";
    else
      echo "TRUE";
    fi;
}

# Returns $1 in upper case
function to_uppercase {
  echo $1 | awk '{print toupper($0)}'
}

# Returns $1 in lower case
function to_lowercase {
  echo $1 | awk '{print tolower($0)}'
}

# Returns the name of the bucket to deploy to
function resolve_bucket {
  IS_PR=$(is_pull_request);

  if [ "${IS_PR}" = "TRUE" ]; then
    echo $AWS_BUCKET_PREVIEW;
  elif [ "${DEPLOYMENT_MODE}" == "PRODUCTION" ]; then
    echo $AWS_BUCKET_PRODUCTION;
  else
    echo $AWS_BUCKET_STAGING;
  fi;
}

#
# Resolves the URI for our PR
#
function resolve_pr_name {
  IS_PR=$(is_pull_request);
  if [ "${IS_PR}" = "TRUE" ]; then
    echo "${TRAVIS_PULL_REQUEST}";
  else
    echo "";
  fi;
}


#
# Prints Environment Variables
#
function janis_envars {
  janis_print_header "Janis Environment Variables";

  echo "GOOGLE_ANALYTICS: '${GOOGLE_ANALYTICS}'";
  echo "FEEDBACK_API:     '${FEEDBACK_API}'";
  echo "CMS_API:          '${CMS_API}'";
  echo "CMS_MEDIA:        '${CMS_MEDIA}'";
  echo "NODE_PATH:        '${NODE_PATH}'";
}


#
# Builds Janis Only
#
function janis_build {
  janis_envars;
  
  janis_print_header "Building Janis";
  mkdir _dist;

  # Patch the static.config.js file, switch "//basePath" to "basePath: 'janis-pr-123/',"
  IS_PR=$(is_pull_request);
  if [[ "${IS_PR}" = "TRUE" ]]; then
    BASE_PATH_PR=$(resolve_pr_name);
#    echo "Patching static.config.js file 'basePath' attribute...";
#    sed -i -e "s|\/\/basePath|basePath: '\/${PR_SLUG}\/',|g" static.config.js;
#    echo -ne "After patch, basePath: "; grep "basePath" static.config.js;
  fi;

  janis_print_header "Installing Janis Dependencies";
  # First we install dependencies
  yarn;

  janis_print_header "Running 'yarn build'";
  # Then we build the app into the _dist folder...
  yarn build;
}

function janis_build_worker {
  janis_print_header "Building Janis";

  echo "JANIS_WORKER_BUILD_TAG: ${JANIS_WORKER_BUILD_TAG}";
  echo "JANIS_WORKER_BUILD_URL: ${JANIS_WORKER_BUILD_URL}";

  echo "Logging in to AWS ECR...";
  $(aws ecr get-login --no-include-email --region "us-east-1");

  echo "We now build the container...";
  echo "docker build --no-cache -f worker/Dockerfile -t ${JANIS_WORKER_BUILD_TAG} .";
  docker build --no-cache -f worker/Dockerfile -t $JANIS_WORKER_BUILD_TAG .

  echo "Now we tag the build...";
  echo "docker tag ${JANIS_WORKER_BUILD_TAG} ${JANIS_WORKER_BUILD_URL}/${JANIS_WORKER_BUILD_TAG}:${JANIS_IMAGE_VERSION}";
  docker tag $JANIS_WORKER_BUILD_TAG $JANIS_WORKER_BUILD_URL/$JANIS_WORKER_BUILD_TAG:$JANIS_IMAGE_VERSION;

  echo "Pushing the build to AWS ECR...";
  echo "docker push $JANIS_WORKER_BUILD_URL/$JANIS_WORKER_BUILD_TAG:$JANIS_IMAGE_VERSION";
  docker push $JANIS_WORKER_BUILD_URL/$JANIS_WORKER_BUILD_TAG:$JANIS_IMAGE_VERSION;
}

function janis_deploy {
  janis_print_header "Deploying Janis";
  PR_SLUG=$(resolve_pr_name)
  DEPLOYMENT_BUCKET=$(resolve_bucket)
  S3_DESTINATION="s3://${DEPLOYMENT_BUCKET}/${PR_SLUG}"
  echo "Syncing Janis into '${S3_DESTINATION}'"
  aws s3 sync ./dist $S3_DESTINATION --delete
}
