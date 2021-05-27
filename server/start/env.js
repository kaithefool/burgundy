const fs = require('fs');
const path = require('path');

const read = (p) => JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../shared/', p),
    'utf8',
  ),
);

let db = read('database.json');

db = db[db.defaultEnv];

module.exports = { ...read('env.json'), db };
