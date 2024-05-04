const multer = require('multer');
const path = require('path');
const fs = require('fs')
// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.headers['user-id']);
    const userId = req.headers['user-id']; // Assuming user ID is passed in headers
    const userFolder = path.join(__dirname, '..', 'uploads', userId);
  
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }
    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname );
  }
});

const upload = multer({ storage: storage }).single('file');

const uploadFile = (req, res) => {
    
  upload(req, res, function (err) {

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

const listFiles = (req, res) => {
  const userId = req.headers['user-id'];
  console.log(userId);
  const directoryPath = path.join(__dirname, '../uploads',userId);

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).send({
        message: "Unable to scan files!",
        error: err.message,
      });
    }
    // let fileList = files.map(file => {
    //   return {
    //     name: file,
    //     url: `${req.protocol}://${req.get('host')}/uploads/${file}`
    //   };
    // });
    res.send(files);
  });
};

const deleteFile = (req, res) => {
  const userId = req.params.userId;
  const fileName = req.params.fileName;
  
  const filePath = path.join('uploads', userId, fileName);
  console.log(filePath);
  fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
          return res.status(404).json({ message: "File not found" });
      }

      fs.unlink(filePath, (err) => {
          if (err) {
              return res.status(500).json({ message: "Unable to delete the file", error: err });
          }
          res.status(200).json({ message: "File deleted successfully" });
      });
  });
};

// Function to download a file
const downloadFile = (req, res) => {
  const userId = req.params.userId;
  const fileName = req.params.fileName;
 
  const filePath = path.join(__dirname, '..', 'uploads', userId, fileName);
  console.log(filePath);
  fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
          return res.status(404).send('File not found');
      }

      // Set the headers to inform the browser about the type of content
      // This will prompt a download dialog in the browser
      res.download(filePath, fileName, (err) => {
          if (err) {
              res.status(500).send('Could not download the file');
          }
      });
  });
};

module.exports = {
  uploadFile,
  listFiles,
  deleteFile,
  downloadFile
};
