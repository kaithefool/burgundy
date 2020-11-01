const bcrypt = require('bcryptjs');
const password = require('password-hash-and-salt');

module.exports = {
  encrypt(str) {
    return new Promise((resolve, reject) => {
      password(str).hash((err, hash) => {
        if (err) return reject(err);

        return resolve(hash);
      });
    });
  },

  async compare(str, hash) {
    let pass = false;

    try {
      pass = await new Promise((resolve, reject) => {
        password(str).verifyAgainst(hash, (err, verified) => {
          if (err) return reject(err);

          return resolve(verified);
        });
      });
    } catch (e) {
      pass = await bcrypt.compare(str, hash);
    }

    return pass;
  },
};
