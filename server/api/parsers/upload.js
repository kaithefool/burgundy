const path = require('path');
const multer = require('multer');
const { nanoid } = require('nanoid');

const { FILE_STORAGE_UPLOADS } = process.env;

const destination = path.resolve(
  __dirname,
  '../../../',
  FILE_STORAGE_UPLOADS,
);

const storage = multer.diskStorage({
  destination,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = nanoid(21);

    cb(null, `${name}${ext}`);
  },
});

function parseUpload({
  filename,
  originalname,
  mimetype,
  size,
}) {
  return {
    path: filename,
    name: originalname,
    type: mimetype,
    size,
  };
}

module.exports = ({
  field = 'file',
  settings = {},
} = {}) => {
  const upload = multer({
    storage,
    ...settings,
  });

  return [
    upload.single(field),
    async (req, res, next) => {
      req.attrs = {
        ...req.attrs,
        ...parseUpload(req.file),
      };

      return next();
    },
  ];
};
