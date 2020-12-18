const Service = require('../../base/Service');
const model = require('../models/pages');

class PageServ extends Service {
}

module.exports = new PageServ(model);
