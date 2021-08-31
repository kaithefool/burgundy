const Service = require('../base/Service');
const model = require('../models/accessLogs');

class AccessLogServ extends Service {
}

module.exports = new AccessLogServ(model);
