from node
RUN mkdir /app
WORKDIR /app
ENV PORT=80
ENV NODE_PATH=src
COPY yarn.lock /app/yarn.lock
COPY .yarn-cache /.yarn-cache
COPY package.json /app/package.json
COPY public /app/public
COPY src /app/src
RUN yarn install --cache-folder /.yarn-cache
EXPOSE 80
CMD [ "yarn", "start" ]
