FROM node:16-alpine
WORKDIR /app

# Bundle app source
COPY [ "assets/package.json", "server/package.json" ]

CMD node bin/www
