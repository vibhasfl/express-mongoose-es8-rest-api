import express from 'express'
import { Router } from './config/routes'
import { connectMongo } from './config/mongoconnect'
import bodyParser from 'body-parser'
const app = express()

app.use(bodyParser.json())
app.use('/api', Router)

connectMongo()

export { app }
