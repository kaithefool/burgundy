const Service = require('../base/Service');
const model = require('../models/accessLogs');

class AccessLogServ extends Service {
  all(opts) {
    return super.all(opts).populate('user', 'email');
  }
}

module.exports = new AccessLogServ(model, {
  search: 'action',
});
