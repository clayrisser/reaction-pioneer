#############################################
# Dockerfile to run Reaction
# Based on Alpine
#############################################

FROM node:7.8-alpine

MAINTAINER Jam Risser (jamrizzi)

EXPOSE 8888

WORKDIR /app/

RUN apk add --no-cache tini

COPY ./package.json /app/.tmp/
RUN cd /app/.tmp/ && npm install
COPY ./ /app/.tmp/
RUN cd /app/.tmp/ && npm run build && \
    cp -r /app/.tmp/dist/* /app/ && \
    cp -r /app/.tmp/dist/.* /app/ && \
    rm -rf /app/.tmp/

ENTRYPOINT ["/sbin/tini", "--", "node", "/app/server.js"]
