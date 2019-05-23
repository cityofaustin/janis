FROM node:12

RUN mkdir /app
WORKDIR /app

ENV PORT ${PORT:-80}
ENV NODE_PATH=src

COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json
RUN yarn

COPY static.config.js /app/static.config.js
COPY .babelrc /app/.babelrc

COPY public /app/public
COPY src /app/src

EXPOSE $PORT
CMD [ "yarn", "start" ]
