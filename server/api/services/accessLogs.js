const Service = require('../base/Service');
const model = require('../models/accessLogs');

class AccessLogServ extends Service {
  find(...args) {
    return super.find(...args).populate('user', 'email mobile');
  }

  all(...args) {
    return super.all(...args).populate('user', 'email mobile');
  }
}

module.exports = new AccessLogServ(model, {
  search: 'action',
});
