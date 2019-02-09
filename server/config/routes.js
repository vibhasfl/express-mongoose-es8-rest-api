import express from 'express'
import { userRoutes } from '../modules/users/user.routes'
const Router = express.Router()

Router.get('/health-check', (req, res) => res.send('OK'))
Router.use('/users', userRoutes)

export { Router }
