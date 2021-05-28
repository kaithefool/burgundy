FROM node:16-alpine
WORKDIR /app

# Bundle app source
COPY [ "assets/package.json", "server/package.json" ]
RUN cd assets && npm i
RUN cd server && npm i

CMD node server/bin/www
