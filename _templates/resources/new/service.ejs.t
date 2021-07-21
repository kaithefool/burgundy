---
to: server/components/<%= ns %>/services/<%= file %>.js
---
const Service = require('../../base/Service');
const model = require('../models/<%= file %>');

class <%= model %>Serv extends Service {
}

module.exports = new <%= model %>Serv(model);
