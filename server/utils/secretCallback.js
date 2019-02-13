import { userModel } from '../modules/users/user.model'

export const secretCallback = function (req, payload, done) {
  let sub = payload.sub

  userModel.findById(sub, function (err, user) {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(new Error('missing_secret'))
    }
    return done(null, user.secret)
  })
}
