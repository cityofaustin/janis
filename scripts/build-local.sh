export NODE_PATH='./src'

export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
export CMS_MEDIA='https://joplin-austin-gov-static.s3.amazonaws.com/production/media'

yarn npm-run-all build-css build-js

echo " 🏗 END of the Build 🏗 "

http-server dist

say "Hello O.D.D. Developer, I'm done building the application."
