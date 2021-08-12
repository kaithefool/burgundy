const _ = require('lodash');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const csv = require('csv-parse');

const { fuzzyKey } = require('../helpers');

const { FILE_STORAGE_TMP } = process.env;

const storage = multer.diskStorage({
  destination: `../${FILE_STORAGE_TMP}`,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = shortid.generate();

    cb(null, `${name}${ext}`);
  },
});

function parseFile({
  originalname,
  filename,
  mimetype,
  size,
}) {
  return {
    originalname,
    filename,
    mimetype,
    size,
  };
}

exports.upload = (component, settings = {}) => {
  if (!component) throw new Error('Missing parameter: component');

  const { field = 'file' } = settings;
  const upload = multer({
    storage,
    ..._.omit(settings, 'field'),
  });

  return [
    upload.single(field),
    async (req, res, next) => {
      req.attrs = {
        ...req.attrs,
        ...parseFile(req.file),
        component,
      };

      return next();
    },
  ];
};

const fuzzyMap = (rows = [], cols) => {
  if (!rows.length) return [];

  const mappers = [];

  // sample 1st row
  cols.forEach((col) => {
    if (col.key instanceof RegExp && !col.to) {
      throw new Error('"to" is required if "key" is a regex');
    }

    const match = fuzzyKey(rows[0], col.key, col.opts);

    mappers.push({ ...col, col: match });
  });

  return rows.map((r) => {
    const mapped = {};

    mappers.forEach(({
      col, key, to, getter = (v) => v,
    }) => {
      _.set(mapped, to || key, getter(
        col ? r[col] : undefined,
        r,
      ));
    });

    return mapped;
  });
};

module.exports = ({
  uploadSettings = {},
  parserSettings = {},
  mapping,
} = {}) => {
  const { field = 'file' } = uploadSettings;
  const upload = multer({
    storage: multer.memoryStorage(),
    ..._.omit(uploadSettings, 'field'),
  });

  return [
    upload.single(field),
    (req, res, next) => {
      const input = req.file.buffer.toString();

      csv(input, {
        columns: true,
        skip_empty_lines: true,
        ...parserSettings,
      }, (err, output) => {
        if (err) {
          return res.status(404).send('invalid csv format');
        }

        req.attrs = mapping
          ? fuzzyMap(output, mapping)
          : output;

        return next();
      });
    },
  ];
};
