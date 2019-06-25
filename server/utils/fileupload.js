import multer from 'multer'
import crypto from 'crypto'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'
import { AppError } from './appError'
import { httpStatus } from './httpStatus'

aws.config.update({ accessKeyId: process.env.AWS_S3_ACCESS_KEY, secretAccessKey: process.env.AWS_S3_SECRET_KEY })
const s3 = new aws.S3()

const diskStorage = multer.diskStorage({
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

const imageFileFilter = function (req, file, cb) {
  if (![ 'image/png', 'image/jpg', 'image/jpeg' ].includes(file.mimetype)) {
    return cb(new AppError('Only jpg,jpeg,png formats are allowed', httpStatus.UNPROCESSABLE_ENTITY))
  }
  cb(null, true)
}

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (req, file, cb) {
    return crypto.randomBytes(16, function (err, raw) {
      if (err) cb(err)
      cb(null, process.env.AWS_S3_FILE_UPLOAD_KEY + raw.toString('hex') + Date.now() + '.' + file.originalname.split('.').pop().trim())
    })
  }
})

export { diskStorage, limits, imageFileFilter, s3Storage }
