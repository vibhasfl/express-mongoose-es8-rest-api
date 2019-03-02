import mongoose from 'mongoose'
import debug from 'debug'

const log = debug('app')

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
  log('MongoDB Connection Established')
})

mongoose.connection.on('reconnected', () => {
  log('MongoDB Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  log('MongoDB Connection Disconnected')
})

mongoose.connection.on('close', () => {
  log('MongoDB Connection Closed')
})

mongoose.connection.on('error', (error) => {
  log('MongoDB ERROR: ' + error)
  process.exit(1)
})

if (process.env.APP_ENVIROMENT !== 'test') mongoose.set('debug', process.env.MONGO_DEBUG)

const connectMongo = async () => {
  let connectionuri =
    process.env.MONGO_USERNAME || process.env.MONGO_PASSWORD
      ? `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`
      : `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`

  await mongoose.connect(connectionuri, {
    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}

export { connectMongo }
