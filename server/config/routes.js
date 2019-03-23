import express from 'express'
import { userRoutes } from '../modules/users/user.routes'
import { authRoutes } from '../modules/auth/auth.routes'
import { upload } from '../utils/upload'
import { httpStatus } from '../utils/httpStatus'
const Router = express.Router()

Router.all('/health-check', (req, res) => res.json({ message: 'OK' }))
Router.use('/users', userRoutes)
Router.use('/auth', authRoutes)

Router.post('/fileupload', upload.single('avatar'), (req, res) => {
  if (!req.file) return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Please select file' })
  return res.json({ data: req.file })
})

export { Router }
