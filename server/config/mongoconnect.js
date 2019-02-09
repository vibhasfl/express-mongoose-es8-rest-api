import mongoose from 'mongoose'

export const connectMongo = async () => {
  let connectionuri =
    process.env.MONGO_USERNAME || process.env.MONGO_PASSWORD
      ? `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`
      : `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`

  await mongoose.connect(connectionuri, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).catch((err) => {
    throw new Error('Error while connection to mongoDb')
  })

  mongoose.set('debug', process.env.MONGO_DEBUG)
}
