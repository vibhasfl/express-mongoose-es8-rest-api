import express from 'express'
import { asyncWrapper } from '../../utils/asyncWrapper'
import { validate } from '../../utils/validate'
import { auth } from './auth.controller'
import { login } from './auth.validations'

const authRoutes = express.Router()

authRoutes.post('/login', validate(login), asyncWrapper(auth.login))
authRoutes.get('/profile', asyncWrapper(auth.profile))

export { authRoutes }
