FROM node:10.16.3-stretch-slim

# Only install dependencies required for /deploy/buildNetlifySite.js
# The rest of the site is built on netlify, not on this circleci docker image
RUN yarn add \
  axios@0.18.0
