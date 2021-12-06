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
- Views
    - Seeds
    - i18n
- File Uploads
    - sortable
    - gallery mode
    - image dimension
    - file preview file switch transition (onload event?)
- Rich text editor
    - Drop file handler
    - MaxSize and accept
- Grid html editor
- Table
    - Sticky table head (not possible with pure css)
- i18n
    - Email templates
    - Reload server after new locale files
    - Lang form fields
    - yupjs errors
- Import json & excel?
- Admin panel responsive layout
- ObjectId validator
- Room for socket.io?
- 4xx and 5xx error templates
- Use _id to keep sorting consistency