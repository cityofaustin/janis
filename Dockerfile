from node
RUN mkdir /app
WORKDIR /app
COPY [ "yarn.lock", "package.json", "src", "public", "/app/"]
RUN yarn
EXPOSE 80
CMD [ "yarn", "start" ]
