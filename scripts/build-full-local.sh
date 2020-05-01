# Add your Joplin PR API and Media Links here...
# - NOTE: make sure CMS_API has `/api/graphql` endpoints
# - AND... CMS_MEDIA has `/media` endpoints

# Examples
# - export CMS_API='https://joplin-pr-3244-guide-icon-tile.herokuapp.com/api/graphql'
# - export CMS_MEDIA='https://joplin-pr-3244-guide-icon-tile.herokuapp.com/media'

# Or,  maybe you want to use staging or production media
# - Staging Media: `https://joplin3-austin-gov-static.s3.amazonaws.com/staging/media`
# - Production Media: `https://joplin3-austin-gov-static.s3.amazonaws.com/production/media`

export NODE_PATH='./src'

export REACT_STATIC_PREFETCH_RATE=5
# Must be 127.0.0.1, not localhost, or else requests to Django will cut out
export CMS_API='http://127.0.0.1:8000/api/graphql'
export CMS_MEDIA='http://127.0.0.1:8000/media'

yarn npm-run-all build-css build-js

echo " 🏗 END of the Joplin PR Build 🏗 "

http-server dist
