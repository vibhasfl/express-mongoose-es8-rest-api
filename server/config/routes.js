import express from 'express'
import { userRoutes } from '../modules/users/user.routes'
import { authRoutes } from '../modules/auth/auth.routes'
const Router = express.Router()

Router.all('/health-check', (req, res) => res.json({ message: 'OK' }))
Router.use('/users', userRoutes)
Router.use('/auth', authRoutes)

export { Router }
