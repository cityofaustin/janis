#!/usr/bin/env bash

# set -o errexit


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
    exit 1;
}




#
# We need AWS permissions
#

if [ "${AWS_ACCESS_KEY_ID}" == "" ] || [ "${AWS_DEFAULT_REGION}" == "" ] || [ "${AWS_SECRET_ACCESS_KEY}" == "" ]; then
  helper_halt_deployment "Halting deployment, please check your AWS API keys."
fi;

#
# Simply builds a noticeable header when parsing logs.
# This should help determine when our commands begin execution,
# and what branch is being affected by current deployment.
#

function janis_print_header {
    echo ""
    echo ""
    echo "----------------------------------------------------------------"
    echo "   $1"
    echo "----------------------------------------------------------------"
    echo "  DEPLOYMENT_MODE:            ${DEPLOYMENT_MODE}"
    echo "  GOOGLE_ANALYTICS:           ${GOOGLE_ANALYTICS}"
    echo "  FEEDBACK_API:               ${FEEDBACK_API}"
    echo "  CMS_API:                    ${CMS_API}"
    echo "  CMS_MEDIA:                  ${CMS_MEDIA}"
    echo "  NODE_PATH:                  ${NODE_PATH}"
    echo "  JANIS_REPO:                 ${JANIS_REPO}"
    echo "  AWS_BUCKET_NAME:            ${AWS_BUCKET_NAME}"
    echo "  AWS_CF_DISTRO:              ${AWS_CF_DISTRO}"
    echo ""
}

# Generates a random hash for a build log entry
function janis_generate_uuid {
  UUID=$(cat /proc/sys/kernel/random/uuid | md5sum | cut -d ' ' -f 1);
  echo $UUID;
}


# Returns $1 in upper case
function to_uppercase {
  echo $1 | awk '{print toupper($0)}'
}

# Returns $1 in lower case
function to_lowercase {
  echo $1 | awk '{print tolower($0)}'
}


#
# Clones a Janis branch from repository
#
function janis_download_code {
    if [[ "${DEPLOYMENT_MODE}" = "PRODUCTION" ]]; then
      DEPLOYMENT_BRANCH="production";
    elif [[ "${DEPLOYMENT_MODE}" = "STAGING" ]]; then
      DEPLOYMENT_BRANCH="master";
    fi;

    janis_print_header "Cloning Janis branch: ${DEPLOYMENT_BRANCH}"

    git clone -b $DEPLOYMENT_BRANCH --single-branch $JANIS_REPO;
}

#
# Returns the name of the bucket to deploy to
#
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
# Builds Janis Only
#
function janis_build {
  janis_print_header "Building Janis";
  cd "janis";

  # First we install dependencies
  janis_print_header "Installing Janis Dependencies";
  mkdir _dist;
  yarn;

  # Then we build the app into the _dist folder...
  janis_print_header "Running 'yarn build'";
  yarn build;
}



function janis_deploy {
  janis_print_header "Deploying Janis";
  python3 /app/deploy.py
}


echo -e "\n----------------------------------------------------------------"
echo "Janis Deploy Helper Script:  Initialization successful."
echo -e "----------------------------------------------------------------\n"
