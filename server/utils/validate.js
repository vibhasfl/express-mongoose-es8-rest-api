import Joi from 'joi'
import { httpStatus } from './httpStatus'

export const validate = (schemaname) => {
  return function (req, res, next) {
    const isValid = Joi.validate(req.body, schemaname, { abortEarly: false })
    if (isValid.error === null) return next()
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'ValidationError', data: isValid.error.details })
  }
}
