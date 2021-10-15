# Burgundy

### Getting Start (with Docker)
```shell
docker-compose up
npm run sh
```

### Getting Start (without Docker)
```shell
npm run setup
npm i
npm start
```

### Generate the first admin user
./server/bin/gen-admin [username@domain.com] [password]

### Deploy
pm2 deploy [env]

### In process


### Todos
- Update image and packages to use node:16-alpine
  - dart-sass? node-sass/libsass seems to be faster
- Grid html editor
- Table
  - Editable table cells
  - i18n column label (table header and cols toggle)
  - Limit select dropdown
- i18n
  - Seeding?
  - response
    - status
    - success
    - error
  - form
    - button
    - label
- Purge files
  - Temp
  - Unlinked
- Import csv template
- Import json & excel?
- Admin panel responsive layout
- Doc page last updated time
- Tooltips
- Postman
  - Request documentation generator?
  - How to share collection?
- Webpack
  - Optimize chunks
- Room for socket.io?