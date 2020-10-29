const fs = require('fs');
const path = require('path');

const read = (p) => JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../shared/', p),
    'utf8',
  ),
);

const config = {
  ...read('env.json'),
  db: read('database.json'),
};

Object.assign(process.env, config);
