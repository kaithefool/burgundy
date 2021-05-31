FROM node:16-alpine as base
WORKDIR /app

COPY server/package*.json  ./server/

FROM base as dev
RUN npm i -g nodemon
RUN cd server && \
  if [ -f package.lock.json ]; \
    then npm ci; \
    else npm i; \
  fi
CMD nodemon server/bin/www

FROM base as prd
COPY . /app
RUN cd server && npm ci
CMD node server/bin/www
