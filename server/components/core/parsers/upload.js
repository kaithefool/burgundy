const path = require('path');
const multer = require('multer');
const { nanoid } = require('nanoid');

const { uploads } = require('../../../start/env').fileStorage;

const storage = multer.diskStorage({
  destination: uploads,
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
    originalname,
    mimetype,
    size,
  };
}

exports.upload = ({
  field = 'file',
  ref,
  settings = {},
}) => {
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
        ...ref,
      };

      return next();
    },
  ];
};
