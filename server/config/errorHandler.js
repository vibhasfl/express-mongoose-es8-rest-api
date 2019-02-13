import { httpStatus } from '../utils/httpStatus'
import debug from 'debug'
import { AppError } from '../utils/appError'

const log = debug('app')

// Global error handler
// Note : calling next(err) will call this error handler if no other handler id defined.You can handle custom error over here

const errorHandler = (err, req, res, next) => {
  log(err)

  if (err instanceof AppError) return res.status(err.status).json({ message: err.message, stack: process.env.APP_ENVIROMENT === 'dev' ? err.stack : '' })

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: process.env.APP_ENVIROMENT === 'dev' ? err.message : 'Oops !! Something went wrong' })
}

export { errorHandler }
