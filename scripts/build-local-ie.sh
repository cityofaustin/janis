# IE11 can't be served from webpack-dev-server
# So we can use this script to build a static site and write it to the dist folder.
# This allows us to develop and test IE11 on Browserstack locally.
export NODE_PATH='./src'

# export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
# export CMS_API='http://joplin-pr-3151-urls-in-api.herokuapp.com/api/graphql'
export CMS_API='http://localhost:8000/api/graphql'
export CMS_MEDIA='https://joplin-austin-gov-static.s3.amazonaws.com/production/media'

yarn npm-run-all build-css build-js

echo " 🏗 END of the Build 🏗 "

http-server dist

say "Hello O.D.D. Developer, I'm done building the application."
