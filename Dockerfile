FROM node:12

RUN mkdir /app
WORKDIR /app

ENV PORT ${PORT:-80}
ENV NODE_PATH=src

COPY package.json yarn.lock /app
RUN yarn install

COPY static.config.js /app/static.config.js
COPY .babelrc /app/.babelrc

COPY public /app/public
COPY src /app/src

EXPOSE $PORT
CMD [ "yarn", "start" ]
