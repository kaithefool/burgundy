const fs = require('fs-extra');
const path = require('path');
const m = require('mongoose');
const { DateTime: dt } = require('luxon');

const Service = require('../base/Service');
const model = require('../models/files');
const { recursiveFind } = require('../helpers/utils');

const {
  FILE_STORAGE_UPLOADS,
  FILE_STORAGE_TRASH,
} = process.env;

const resolve = (...p) => (
  path.resolve(__dirname, '../../../', ...p)
);

class FileServ extends Service {
  // garbage collect files
  async purge() {
    const { File, ...models } = m.models;
    const mm = Object.values(models);

    const toDel = await File.find({
      // only purge files created in less than 48 hours
      createdAt: {
        $lt: dt.now().minus({ hours: 48 }).toJSDate(),
      },
      deletedAt: null,
    }, 'path').lean();

    // sequential loop
    await mm.reduce(async (prev, mdl) => {
      await prev;

      // loop through all docs to find any trace of usage
      const cursor = mdl.find().cursor();
      const fn = async () => {
        const doc = await cursor.next();

        if (doc) {
          const found = recursiveFind(doc, (v) => {
            if (typeof v === 'string') {
              return toDel.find((f) => v.match(f.path));
            }
            if (v instanceof m.Types.ObjectId) {
              return toDel.find((f) => v.equals(f._id));
            }

            return undefined;
          });

          if (found) {
            // remove from purge list
            toDel.splice(toDel.indexOf(found), 1);
          }

          fn();
        }
      };

      fn();
    }, Promise.resolve());

    // delete
  }

  async delete(filter, user) {
    const files = await this.find(filter, user);

    await super.delete(filter, user);

    // move files to trash dir
    await Promise.all(files.map((f) => f.path).map(async (p) => {
      try {
        await fs.rename(
          resolve(FILE_STORAGE_UPLOADS, p),
          resolve(FILE_STORAGE_TRASH, p),
        );
      } catch (err) {
        console.error(err);
      }
    }));
  }

  clean() {
    return fs.emptyDir(
      resolve(FILE_STORAGE_TRASH), { recursive: true },
    );
  }
}

module.exports = new FileServ(model);
