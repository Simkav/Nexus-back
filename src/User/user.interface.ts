import { Model } from 'mongoose'
import { Expose } from 'class-transformer'
import { IsDefined, IsEmail } from 'class-validator'
interface IUser {
  email: string
  password: string
}

interface IInstanceMethods {
  checkPassword: (password: string) => Promise<boolean>
}

interface IUserModel extends Model<IUser, {}, IInstanceMethods> {}

class CreateUserDto implements IUser {
  @Expose()
  @IsDefined()
  @IsEmail()
  email: string
  @IsDefined()
  @Expose()
  password: string
}

export { CreateUserDto, IUser, IInstanceMethods, IUserModel }
