import { userModel } from '../users/user.model'
import { httpStatus } from '../../utils/httpStatus'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const auth = {}

auth.login = async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email })

  if (!user) return res.status(httpStatus.UNAUTHORIZED).json({ message: 'User does not exists' })

  let isMatch = await user.matchPasswords(req.body.password)

  if (!isMatch) return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid username/password' })

  let randomSecret = crypto.randomBytes(32).toString('hex')

  await userModel.updateOne({ _id: user._id }, { $set: { secret: randomSecret } })

  let token = jwt.sign({ sub: user._id }, randomSecret, { expiresIn: '1h' })

  const { password, __v, secret, ...exposedUser } = user.toObject()

  return res.json({ data: { token, user: exposedUser } })
}

auth.profile = async (req, res) => {
  let user = await userModel.findOne({ _id: req.user.sub })

  const { password, __v, secret, ...exposedUser } = user.toObject()

  return res.json({ data: { user: exposedUser } })
}

export { auth }
