from node
RUN mkdir /app
WORKDIR /app
ENV PORT=80
ENV NODE_PATH=src
COPY package.json /app/package.json
RUN yarn
COPY public /app/public
COPY src /app/src
EXPOSE 80
CMD [ "yarn", "start" ]
