FROM node:16-alpine as base
WORKDIR /app

RUN npm i -g db-migrate@^0.11.12 db-migrate-mysql@^2.1.2
COPY server/package*.json  ./server/

FROM base as dev
RUN npm i -g nodemon
RUN cd server && \
  if [ -f package.lock.json ]; \
    then npm i; \
    else npm ci; \
  fi
CMD nodemon server/bin/www

FROM base as prd
COPY . /app
RUN cd server && npm ci
CMD node server/bin/www
