const Service = require('../base/Service');
const model = require('../models/views');

const { LNG } = process.env;

class ViewServ extends Service {
}

module.exports = new ViewServ(model, {
  search: [
    'url',
    ...(LNG.split(',').map((lng) => `title.${lng}`)),
  ],
});
