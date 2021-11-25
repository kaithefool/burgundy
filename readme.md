# Burgundy

### Getting Start
```shell
npm i
npm start
```

### Generate the first admin user
```shell
./server/bin/gen-admin [username@domain.com] [password]
```

### Generate resources API and admin UI
```shell
npx hygen new api [resource] --singleton
npx hygen new admin-ui [resource] --singleton
```

### Deploy
pm2 deploy [env]

### Todos
- File Uploads
    - sortable
    - gallery mode
    - image dimension
    - file preview file switch transition (onload event?)
- Rich text editor
    - Styles for both editor and display
    - Drop file handler
    - MaxSize and accept
- Update image and packages to use node:16-alpine
    - dart-sass? node-sass/libsass seems to be faster
- Grid html editor
- Table
    - Editable table cells
    - Toggle switch table cell
    - Sticky table head (not possible with pure css)
- i18n
    - Reload server after new locale files
    - Lang form fields
    - import and export
    - server response
    - yupjs errors
- Import csv template
- Import json & excel?
- Admin panel responsive layout
- Tooltips
- ObjectId validator
- Room for socket.io?
- 4xx and 5xx error templates
- Use _id to keep sorting consistency