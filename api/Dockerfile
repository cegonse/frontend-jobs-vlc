FROM node:10.20.1-buster-slim AS base

ENV WORKPATH /opt/app/
ENV USERNAME node
WORKDIR $WORKPATH

RUN chown -R $USERNAME $WORKPATH

USER node
RUN npm config set registry "http://registry.npmjs.org"
COPY --chown=$USERNAME:$USERNAME package* $WORKPATH
RUN npm install --no-progress

CMD ["npm", "run", "start"]


FROM base as prod
COPY --chown=$USERNAME:$USERNAME . $WORKPATH

FROM base as dev_dependencies
RUN npm install --no-progress
COPY --chown=$USERNAME:$USERNAME . $WORKPATH

FROM dev_dependencies as ci

FROM dev_dependencies as dev
VOLUME "${WORKPATH}/node_modules/"
VOLUME "${WORKPATH}/public/dist/"
