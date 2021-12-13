const Service = require('../base/Service');
const model = require('../models/accessLogs');

class AccessLogServ extends Service {
  populate(query) {
    return query.populate('user', 'email mobile');
  }
}

module.exports = new AccessLogServ(model, {
  search: 'action',
});
