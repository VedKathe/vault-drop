const express = require('express');
const uploadController = require('../Controllers/FileController');

const router = express.Router();

router.post('/upload', uploadController.uploadFile);
router.delete('/delete/:userId/:fileName', uploadController.deleteFile);
router.get('/', uploadController.listFiles);
router.get('/download/:userId/:fileName', uploadController.downloadFile);

module.exports = router;
