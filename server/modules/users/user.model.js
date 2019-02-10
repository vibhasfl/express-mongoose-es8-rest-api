import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    secret: { type: String }
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

userSchema.methods.matchPasswords = async function (candidatePassword) {
  let isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

const userModel = mongoose.model('User', userSchema)

export { userModel }
