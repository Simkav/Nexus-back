import { isEmail } from 'class-validator'
import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import { hash } from 'bcrypt'

const UserSchema = new Schema<IUser>({
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

const UserModel = model<IUser>('User', UserSchema)

export { UserSchema, UserModel }
