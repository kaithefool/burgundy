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
- File Uploads
  - sortable
  - drag file indicator
- Rich text editor

- Dedockerize?
- Update image and packages to use node:16-alpine
  - dart-sass? node-sass/libsass seems to be faster
- Grid html editor
- Table
  - Editable table cells
  - i18n column label (table header and cols toggle)
  - Toggle switch table cell
  - Sticky table head (not possible with pure css)
- i18n
  - Lang form fields
  - import and export
  - response
    - status
    - success
    - error
  - form
    - button
    - label
- Import csv template
- Import json & excel?
- Admin panel responsive layout
- Singleton
  - Seeding?
- Tooltips
- ObjectId validator
- Room for socket.io?
- 4xx and 5xx error templates
