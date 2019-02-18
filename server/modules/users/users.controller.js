import { userModel } from './user.model'
import { httpStatus } from '../../utils/httpStatus'
const users = {}

users.index = async (req, res) => {
  let users = await userModel.find({}, { password: 0, __v: 0 })
  return res.json({ data: { users } })
}

users.create = async (req, res) => {
  let data = await userModel.create(req.body)
  let { password, __v, ...user } = data.toObject()
  return res.status(httpStatus.CREATED).json({ data: { user } })
}

users.update = async (req, res) => {
  let user = await userModel.findById(req.params.id)
  if (!user) return res.status(httpStatus.BAD_REQUEST).json({ message: 'User not found' })
  Object.assign(user, req.body)
  await user.save()
  return res.json({ message: 'Record updated' })
}

export { users }
