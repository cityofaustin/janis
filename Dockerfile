from node
RUN mkdir /app
WORKDIR /app
COPY [ "package.json", "src", "public", "/app/"]
RUN yarn
EXPOSE  3000
CMD [ "yarn", "start" ]
