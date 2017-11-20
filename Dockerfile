from node
RUN mkdir /app
WORKDIR /app
ADD package.json /app/package.json
RUN yarn
EXPOSE  3000
CMD [ "yarn", "start" ]
