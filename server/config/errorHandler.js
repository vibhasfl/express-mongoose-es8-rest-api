import { httpStatus } from '../utils/httpStatus'

const errorHandler = (err, req, res, next) => {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: process.env.APP_ENVIROMENT === 'dev' ? err.message : 'Oops !! Something went wrong' })
}

export { errorHandler }
