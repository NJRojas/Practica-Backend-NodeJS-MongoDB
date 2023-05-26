const multer = require('multer');
const path = require('node:path');

// Declare Upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directoryPath = path.join(__dirname, '..', 'public', 'ads', 'images');
    cb(null, directoryPath);
  },
  filename: function (req, file, cb) {
    // Date.now() is added as timeStamp to keep all uploaded copies, and so avoid file overwriting of the same file
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  },
});

module.exports = multer({ storage });
