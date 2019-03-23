import multer from 'multer'
import crypto from 'crypto'
import { AppError } from './appError'
import { httpStatus } from './httpStatus'

// Ref : https://www.npmjs.com/package/multer

const storage = multer.diskStorage({
  // Note : You can set your own upload path Ref : https://www.npmjs.com/package/multer#diskstorage
  // destination: function (req, file, cb) {},
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) cb(err)
      cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname.split('.').pop().trim())
    })
  }
})

const limits = { fileSize: parseInt(process.env.FILE_UPLOAD_SIZE_IN_BYTES) || 1000000 }

const fileFilter = function (req, file, cb) {
  if (![ 'image/png', 'image/jpg', 'image/jpeg' ].includes(file.mimetype)) {
    return cb(new AppError('Only jpg,jpeg,png formats are allowed', httpStatus.UNPROCESSABLE_ENTITY))
  }
  cb(null, true)
}

export const upload = multer({ storage, limits, fileFilter })
