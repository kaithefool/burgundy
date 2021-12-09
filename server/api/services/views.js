const Service = require('../base/Service');
const model = require('../models/views');

const { LNG } = process.env;

class ViewServ extends Service {
  patchActive({ _id, active }, user) {
    return super.patchBy(
      { _id },
      { active },
      user,
      { multi: true },
    );
  }
}

module.exports = new ViewServ(model, {
  search: [
    'url',
    ...(LNG.split(',').map((lng) => `title.${lng}`)),
  ],
});
