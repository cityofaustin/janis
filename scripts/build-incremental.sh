export NODE_PATH='./src'

export CMS_API='http://localhost:8000/api/graphql'
export CMS_MEDIA='https://joplin-staging.herokuapp.com/media'
export PAGE_ID='U2VydmljZVBhZ2VOb2RlOjEx'

yarn npm-run-all build-css build-js-incremental

echo " 🏗 END of the Joplin PR Build 🏗 "

http-server dist
