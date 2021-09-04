const fs = require('fs-extra');
const path = require('path');

const Service = require('../base/Service');
const model = require('../models/files');

const {
  FILE_STORAGE_UPLOADS,
  FILE_STORAGE_TRASH,
} = process.env;

const resolve = (p) => path.resolve(__dirname, '../../', p);

class FileServ extends Service {
  purge() {
    return fs.emptyDir(
      resolve(FILE_STORAGE_TRASH), { recursive: true },
    );
  }
}

module.exports = new FileServ(model);
