const express = require('express')
const {
  uploadFile,
  listFiles,
  downloadFile,
} = require('../controllers/fileController')
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('multer')

const router = express.Router()
const upload = multer({dest: 'uploads/'})

router.post(
  '/upload',
  authMiddleware('Ops User'),
  upload.single('file'),
  uploadFile,
)
router.get('/list-files', authMiddleware('Client User'), listFiles)
router.get('/download/:file_id', authMiddleware('Client User'), downloadFile)

module.exports = router
