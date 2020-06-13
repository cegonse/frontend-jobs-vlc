FROM node:10.20.1-buster-slim AS base

ENV WORKPATH /opt/app/
WORKDIR $WORKPATH

RUN npm config set registry "http://registry.npmjs.org"

COPY package* $WORKPATH
RUN npm install

COPY . $WORKPATH
CMD ["npm", "run", "start"]
