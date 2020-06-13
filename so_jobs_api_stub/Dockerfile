FROM node:10.20.1-buster-slim AS base

ENV WORKPATH /opt/app/
WORKDIR $WORKPATH

RUN npm config set registry "http://registry.npmjs.org"

COPY . $WORKPATH

RUN npm install
CMD ["npm", "run", "start"]
