#!/usr/bin/env bash
export NODE_PATH='./src'

# Other env variables (CMS_API, CMS_MEDIA, CMS_DOCS) are set in netlify.
# They are automatically loaded into this environment when this file is run by netlify.
# The variables are initialized at the time of build in deploy/buildNetlifySite.js
# They are updated by Joplin publish commands.
# If you want to add custom env variable values for your PR branch, set them in branchConfig.js

yarn npm-run-all build-css build-js
