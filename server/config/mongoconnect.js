import mongoose from 'mongoose'
import debug from 'debug'

const log = debug('app')

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
  log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
  log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  log('Connection Disconnected')
})

mongoose.connection.on('close', () => {
  log('Connection Closed')
})

mongoose.connection.on('error', error => {
  log('ERROR: ' + error)
})

mongoose.set('debug', process.env.MONGO_DEBUG)

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
