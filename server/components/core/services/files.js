const Service = require('../../base/Service');
const model = require('../models/files');

class FileServ extends Service {
}

module.exports = new FileServ(model);
