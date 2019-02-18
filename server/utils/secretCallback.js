import { userModel } from '../modules/users/user.model'
import { httpStatus } from '../utils/httpStatus'
import { AppError } from '../utils/appError'

export const secretCallback = function (req, payload, done) {
  let sub = payload.sub

  userModel.findById(sub, function (err, user) {
    if (err || !user) {
      return done(new AppError('Invalid user', httpStatus.UNAUTHORIZED))
    }
    return done(null, user.secret)
  })
}
