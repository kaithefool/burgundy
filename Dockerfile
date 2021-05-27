FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

EXPOSE 3000

CMD node bin/www
