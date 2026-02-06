const { lngs } = require('../../start/i18n');
const Service = require('../base/Service');
const model = require('../models/views');

class ViewServ extends Service {
  match(attrs, user) {
    return {
      ...super.match(attrs, user),
      ...(user?.role !== 'admin' && {
        active: true,
      }),
    };
  }

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
    ...(lngs.map((lng) => `title.${lng}`)),
  ],
});
