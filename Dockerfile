FROM node

RUN mkdir /app
WORKDIR /app

ENV PORT ${PORT:-80}
ENV NODE_PATH=src

COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json

# TODO: might not need to copy the langs build script
# this script just generates the aggregate data.json file for default messages
# that can be used to develop the needed json for other locales
# this file is NOT needed to run the app
# -- the final data.json file it generates is NEEDED to run the app
COPY intl.buildlangs.js /app/intl.buildlangs.js

COPY static.config.js /app/static.config.js
COPY .babelrc /app/.babelrc
RUN yarn

COPY public /app/public
COPY src /app/src

EXPOSE $PORT
CMD [ "yarn", "start" ]
