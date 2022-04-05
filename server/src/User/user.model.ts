import { isEmail } from 'class-validator'
import { Schema, model } from 'mongoose'
import { IUserDocument } from './user.interface'
import { hash, compare } from 'bcrypt'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Invalid email']
  },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
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

const UserModel = model<IUserDocument>('User', UserSchema)

export { UserModel }
