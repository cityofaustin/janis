FROM node

RUN mkdir /app
WORKDIR /app

ENV PORT ${PORT:-80}
ENV NODE_PATH=src

COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json

COPY intl.buildlangs.js /app/intl.buildlangs.js
COPY static.config.js /app/static.config.js
COPY .babelrc /app/.babelrc
RUN yarn

COPY public /app/public
COPY src /app/src

EXPOSE $PORT
CMD [ "yarn", "start" ]
