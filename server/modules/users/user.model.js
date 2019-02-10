import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  let user = this
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  let hashedpassword = await bcrypt.hash(user.password, 10)

  user.password = hashedpassword

  next()
})

const userModel = mongoose.model('User', userSchema)

export { userModel }
