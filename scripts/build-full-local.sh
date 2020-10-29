# Add your Joplin PR API and Media Links here...
# - NOTE: make sure CMS_API has `/api/graphql` endpoints
# - AND... CMS_MEDIA has `/media` endpoints

#   * Local Example *
# export CMS_API='http://127.0.0.1:8000/api/graphql'
# export CMS_MEDIA='http://127.0.0.1:8000/media'

#   * Review Example *
# export CMS_API='https://joplin-pr-3244-guide-icon-tile.herokuapp.com/api/graphql'
# export CMS_MEDIA='https://joplin-pr-3244-guide-icon-tile.herokuapp.com/media'

#   * Staging Example  *
# export CMS_API='https://joplin-staging.herokuapp.com/api/graphql'
# export CMS_MEDIA='https://joplin3-austin-gov-static.s3.amazonaws.com/staging/media'

#   * Production Example *
# export CMS_API='https://joplin.herokuapp.com/api/graphql'
# export CMS_MEDIA='https://joplin3-austin-gov-static.s3.amazonaws.com/production/media'

export NODE_PATH='./src'

# Must be 127.0.0.1, not localhost, or else requests to Django will cut out
export CMS_API='http://127.0.0.1:8000/api/graphql'
export CMS_MEDIA='http://127.0.0.1:8000/media'

yarn npm-run-all build-css build-js

echo " 🏗 END of the Joplin PR Build 🏗 "

http-server dist
