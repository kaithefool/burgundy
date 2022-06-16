# Burgundy

## Getting Start
##### Prerequisites
- Nodejs >= 16.0.0
- Mongodb >= 4.2.2

##### Installation
```shell
npm i
```
##### Start the server
```shell
npm start
```
##### ... or if you are using Visual Studio Code
Just simply press the F5 button to start the debug mode

## Command line interface
##### Generate the first admin user
```shell
./server/bin/gen-admin [username@domain.com] [password]
```

##### Generate resources API and CMS UI
```shell
npx hygen new api [resource]
npx hygen new cms [resource]
```
##### Singletons
```shell
npx hygen new api [resource] --singleton
npx hygen new cms [resource] --singleton
```
##API
#### Web Sockets
Socket.io is available with authenication built-in.
To turn it on,  simply put these in the .env file:
```env
REDIS_URL=redis://localhost:6379
SOCKET=1
```
... and in your assets script, connect the server with:
```js
import { io } from 'socket.io-client';
import env from '~/commons/config/env';

const socket = io({
  extraHeaders: {
    'x-csrf-token': env.csrf,
  },
});
```
## Deploy
##### Setup directories in deploy environment
```shell
pm2 deploy [env] setup
```

##### ... and deploy
```shell
pm2 deploy [env]
```

## Todos
- Field Array
    - handle _id reference
- File Uploads
    - image dimension
    - file preview file switch transition (onload event?)
- Rich text editor
    - Drop file handler
    - MaxSize and accept
- Grid html editor
- i18n
    - Email templates
- Import json & excel?
- ObjectId validator
- Switch from CommonJS to ES Modules?