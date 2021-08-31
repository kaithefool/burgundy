---
to: server/api/services/<%= n.plural.camel %>.js
---
const Service = require('../base/Service');
const model = require('../models/<%= n.plural.camel %>');

class <%= n.singular.pascal %>Serv extends Service {
}

module.exports = new <%= n.singular.pascal %>Serv(model);
