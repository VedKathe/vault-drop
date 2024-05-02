const router = require('express').Router()
const {uploadFile} = require('../Controllers/FileController')

router.post('/upload', uploadFile)
// router.post('/delete', Login)
// router.post('/',userVerification)

module.exports = router