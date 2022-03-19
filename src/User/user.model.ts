import { isEmail } from 'class-validator'
import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Invalid email']
  },
  password: { type: String, required: true }
})
//TODO password hash

const UserModel = model<IUser>('User', UserSchema)

export { UserSchema, UserModel }
