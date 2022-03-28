import { isEmail } from 'class-validator'
import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'
import { hash, compare } from 'bcrypt'

const UserSchema = new Schema<IUser, IUserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Invalid email']
  },
  password: { type: String, required: true }
})

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
  next()
})

UserSchema.method('checkPassword', async function (password: string) {
  return await compare(password, this.password)
})

const UserModel = model<IUser, IUserModel>('User', UserSchema)

export { UserModel }
