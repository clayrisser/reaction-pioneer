# Builds Groupthreads Public Docker Image
#################################################

FROM node:latest

MAINTAINER Jam Risser
EXPOSE 8010
ENV PORT 8010

RUN mkdir -p /opt/app/
WORKDIR /opt/app/
COPY ./package.json /opt/app/package.json
RUN npm install
COPY ./ /opt/app/
RUN npm run build -- --release
WORKDIR /opt/app/build/

ENTRYPOINT node server.js
