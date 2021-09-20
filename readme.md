# Burgundy

### Getting Start (with Docker)
```shell
docker-compose up
npm run sh
```

### Getting Start (without Docker)
```shell
npm i
npm start
```

### Generate the first admin user
./server/bin/gen-admin [username@domain.com] [password]

### In process


### Todos
- Update image and packages to use node:16-alpine
  - dart-sass? node-sass/libsass seems to be faster
- Grid html editor
- ListTable columns selector
- Table
  - Editable table cells
  - Remember filter settings for back button?
  - Make table rows into links (for right click new tab)
  - Format date time by default / use preset format prop?
- i18n
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
- Deploy script (PM2?)
- Import csv template
- Admin panel responsive layout
- Doc page last updated time
- Tooltips
- Postman
  - Request documentation generator?
  - How to share collection?