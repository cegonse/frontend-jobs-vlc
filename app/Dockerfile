FROM node:10.20.1-buster-slim AS base

ENV WORKPATH /opt/app/
ENV USERNAME node
WORKDIR $WORKPATH

RUN chown -R $USERNAME $WORKPATH

USER node
RUN npm config set registry "http://registry.npmjs.org"
COPY --chown=$USERNAME:$USERNAME package* $WORKPATH

RUN npm install --no-progress

COPY --chown=$USERNAME:$USERNAME . $WORKPATH

RUN npm run build
RUN ls -lah dist
CMD ["npm", "run", "start"]
