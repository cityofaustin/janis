FROM python:3-alpine

WORKDIR /app

ENV NODE_PATH=src
ENV PATH="~/.local/bin:${PATH}"

RUN apk add --update git bash curl nodejs nodejs-npm yarn \
    && pip install awscli boto3 click

COPY $PWD/worker /app/
COPY $PWD /app/janis

ENTRYPOINT ["/app/docker-janis-entrypoint.sh"]

CMD ["/app/deploy.sh"]
