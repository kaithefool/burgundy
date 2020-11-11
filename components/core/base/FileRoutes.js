const Routes = require('../../base/Routes');
const service = require('../services/files');
const upload = require('../parsers/upload');

class FileRoutes extends Routes {
  constructor(uploadSettings, props, ...args) {
    super({
      service,
      ...props,
    }, ...args);

    this.uploadSettings = uploadSettings;
  }

  namedRoutes() {
    return {
      ...super.namedRoutes(),
      create: {
        method: 'post',
        parse: upload(this.uploadSettings),
      },
    };
  }
}

module.exports = FileRoutes;
