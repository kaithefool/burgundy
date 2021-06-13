FROM node:14-alpine as base
WORKDIR /app

RUN npm i -g db-migrate@^0.11.12 db-migrate-mysql@^2.1.2

FROM base as dev
COPY server/package*.json  ./server/
COPY assets/package*.json  ./assets/
RUN cd /app/server && \
  if [ -f package.lock.json ]; \
    then npm ci; \
    else npm i; \
  fi
RUN cd /app/assets && \
  if [ -f package.lock.json ]; \
    then npm ci; \
    else npm i; \
  fi
CMD cd /app/server && npm start

FROM base as prd
COPY . /app
RUN cd server && npm ci
RUN cd assets && npm ci && npm run build
CMD node server/bin/www