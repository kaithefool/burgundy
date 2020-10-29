const Service = require('../../base/Service');
const usersModel = require('../models/users');

class AuthServ extends Service {

}

module.exports = new AuthServ(usersModel);
