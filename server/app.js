import express from 'express'
import { Router } from './config/routes'
import { connectMongo } from './config/mongoconnect'
import { errorHandler } from './config/errorHandler'
import bodyParser from 'body-parser'
import jwt from 'express-jwt'
import helmet from 'helmet'
import { httpStatus } from './utils/httpStatus'
import { AppError } from './utils/appError'
import { secretCallback } from './utils/secretCallback'
const app = express()

app.use(bodyParser.json())
app.use(helmet())
app.use(jwt({ secret: secretCallback }).unless({ path: [ '/api/health-check', '/api/users', '/api/auth/login' ], requestProperty: 'auth' }))
app.use('/api', Router)

// Handle 404
app.use(function (req, res, next) {
  throw new AppError('Resource not found', httpStatus.NOT_FOUND)
})

connectMongo()

app.use(errorHandler)

export { app }
