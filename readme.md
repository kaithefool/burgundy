# Burgundy

### Getting Start
```shell
docker-compose up
docker exec -it burgundy_server_1 sh
```

- Generate the first admin user
./server/bin/gen-admin [username@domain.com] [password]

### In process


### Todos
- Update image and packages to use node:16-alpine
  - dart-sass? node-sass/libsass seems to be faster
- Grid html editor
- ListTable tabs to categorize columns
- Base nav styles
- Table
  - Editable table cells
  - Remember filter settings for back button?
  - Make table rows into links (for right click new tab)
- i18n
- Purge files
  - Temp
  - Unlinked
- Deploy script (PM2?)
- Import csv template