FROM node:14-alpine as base
WORKDIR /app

FROM base as dev
COPY server/package*.json  ./server/
COPY assets/package*.json  ./assets/
COPY package.json ./
COPY example.env ./
RUN npm run ci-server
RUN npm run ci-assets
RUN npm i --only=prod
RUN npm run setup
CMD npm start