const fs = require('fs-extra');
const path = require('path');

const Model = require('../../base/Model');

const { uploads, trash } = process.env.fileStorage;

const resolve = (p) => path.resolve(__dirname, '../../', p);

class File extends Model {
  trash() {}

  purge() {
    return fs.emptyDir(resolve(trash), { recursive: true });
  }
}

module.exports = new File('files');
