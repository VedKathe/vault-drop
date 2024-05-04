const multer = require('multer');
const path = require('path');
const fs = require('fs')
const UniqueId = require("../Models//UniqueIDModel");

//to Create 6 digit unique ID
const generateUniqueId = async () => {
  let uniqueId;
  do {
      uniqueId = Math.floor(100000 + Math.random() * 900000).toString();
  } while (await UniqueId.findOne({ generated_id: uniqueId }));

  await UniqueId.create({ generated_id: uniqueId });
  return uniqueId;
};

//to Seprate Filename
const stripUniqueId = (filename) => {
  return filename.substring(filename.indexOf('_') + 1);
};

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    const userId = req.headers['user-id']; // Assuming user ID is passed in headers
    const userFolder = path.join(__dirname, '..', 'uploads', userId);
  
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }
    cb(null, userFolder);
  },
  filename: async (req, file, cb) => {
    const uniqueId = await generateUniqueId();
    const filename = uniqueId + "_" + file.originalname;
    cb(null, filename);
  }
});
const upload = multer({ storage: storage }).single('file');

//to upload file
const uploadFile = (req, res) => {
    
  upload(req, res, function (err) {
     const files = req.file
     const pin = files.filename.split('_')[0];
    

    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json(err);
    }

    // Everything went fine.
    res.json({message:"Upload Sucessfully ",pin:pin});
  });
};

//to get list of all files of the user
const listFiles = (req, res) => {
  const userId = req.headers['user-id'];
  
  const directoryPath = path.join(__dirname, '../uploads',userId);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).send({
        message: "Unable to scan files!",
        error: err.message,
      });
    }

   const filenamesWithoutPrefix = files.map(stripUniqueId);

    res.send(filenamesWithoutPrefix);
  });
};

//to delete selected file of the user
const deleteFile = (req, res) => {
  const userId = req.params.userId;
  const fileName = req.params.fileName;
  
  const directoryPath = path.join(__dirname, '..', 'uploads', userId);
    const files = fs.readdirSync(directoryPath);

    const fullFileName = files.find(f => stripUniqueId(f) === fileName);

    if (!fullFileName) {
        return res.status(404).json({ message: "File not found" });
    }

    const filePath = path.join(directoryPath, fullFileName);
    const uniqueId = fullFileName.split('_')[0]; // Assuming the ID is before the first underscore

    fs.unlink(filePath, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Unable to delete the file", error: err });
        }

        try {
            await UniqueId.findOneAndDelete({ generated_id: uniqueId });
            res.status(200).json({ message: "File deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Unable to delete the file entry from database", error });
        }
    });
};

// Function to download a file
const downloadFile = (req, res) => {
  const userId = req.params.userId;
  const fileName = req.params.fileName;
  const searchString = req.query.searchString;

  const directoryPath = path.join(__dirname, '..', 'uploads', userId);
  const files = fs.readdirSync(directoryPath);

  const fullFileName = files.find(f => {
    const fileNameWithoutUniqueId = stripUniqueId(f);
    const prefix = f.split('_')[0];
    if(fileNameWithoutUniqueId == fileName && prefix == searchString)
      {
        return true
      }
  });

  if (!fullFileName) {
      return res.status(404).send('File not found');
  }

  const filePath = path.join(__dirname, '..', 'uploads', userId, fullFileName);
  res.download(filePath, fileName, (err) => {
    if (err) {
        res.status(500).send('Could not download the file');
    }
  });
 
};

module.exports = {
  uploadFile,
  listFiles,
  deleteFile,
  downloadFile
};
