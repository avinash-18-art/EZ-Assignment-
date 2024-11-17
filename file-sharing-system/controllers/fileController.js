const File = require('../models/File')
const crypto = require('crypto')

// Upload File
exports.uploadFile = async (req, res) => {
  const {user} = req
  if (user.role !== 'Ops User') return res.status(403).send('Forbidden')

  const fileType = req.file.mimetype
  if (
    ![
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ].includes(fileType)
  ) {
    return res.status(400).send('Invalid file type')
  }

  const encryptedUrl = crypto.randomBytes(16).toString('hex')
  const file = new File({
    file_name: req.file.filename,
    file_type: fileType,
    uploaded_by: user.id,
    encrypted_url: encryptedUrl,
  })

  await file.save()
  res.status(201).send('File uploaded successfully.')
}

// List Files
exports.listFiles = async (req, res) => {
  const files = await File.find({}).populate('uploaded_by', 'username')
  res.json(files)
}

// Download File
exports.downloadFile = async (req, res) => {
  const {file_id} = req.params
  const {user} = req
  if (user.role !== 'Client User') return res.status(403).send('Forbidden')

  const file = await File.findById(file_id)
  if (!file) return res.status(404).send('File not found')

  res.json({
    download_link: `${process.env.BASE_URL}/download/${file.encrypted_url}`,
  })
}
