const multer = require('multer');
const path = require('path');

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname );
  }
});

const upload = multer({ storage: storage }).single('file');

const uploadFile = (req, res) => {
    
  upload(req, res, function (err) {
    console.log(req.file)
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json(err);
    }

    // Everything went fine.
    res.send('File uploaded successfully');
  });
};

module.exports = {
  uploadFile
};
