import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: 'String',
    required: true
  }
})

UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

UserSchema.method('toJSON', function (this: Document) {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

export const UserModel = mongoose.model('Users', UserSchema)
