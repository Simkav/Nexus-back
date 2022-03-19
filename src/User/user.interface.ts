import { Model } from 'mongoose'
import { Expose } from 'class-transformer'
import { IsDefined, IsEmail } from 'class-validator'
interface IUser {
  email: string
  password: string
}

interface InstanceMethods {
  checkPassword: (password: string) => Promise<boolean>
}

interface IUserModel extends Model<IUser, {}, InstanceMethods> {}

class CreateUserDto implements IUser {
  @Expose()
  @IsDefined()
  @IsEmail()
  email: string
  @IsDefined()
  @Expose()
  password: string
}

export { CreateUserDto, IUser, InstanceMethods, IUserModel }
