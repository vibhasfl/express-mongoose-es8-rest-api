import express from 'express'
import { Router } from './config/routes'
import { connectMongo } from './config/mongoconnect'
import { errorHandler } from './config/errorHandler'
import bodyParser from 'body-parser'
import { httpStatus } from './utils/httpStatus'
const app = express()

app.use(bodyParser.json())
app.use('/api', Router)

// Handle 404
app.use(function (req, res, next) {
  return res.status(httpStatus.NOT_FOUND).send('Resource not found')
})

app.use(errorHandler)

connectMongo()

export { app }
