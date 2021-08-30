const fs = require('fs-extra');
const path = require('path');

const Model = require('../base/Model');

const {
  FILE_STORAGE_UPLOADS,
  FILE_STORAGE_TRASH,
} = process.env;

const resolve = (p) => path.resolve(__dirname, '../../', p);

class File extends Model {
  trash() {}

  purge() {
    return fs.emptyDir(resolve(FILE_STORAGE_TRASH), { recursive: true });
  }
}

module.exports = new File('files');
