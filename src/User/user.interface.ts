import { Expose } from 'class-transformer'
import { IsDefined, IsEmail } from 'class-validator'
interface IUser {
  email: string
  password: string
}

class CreateUserDto implements IUser {
  @Expose()
  @IsDefined()
  @IsEmail()
  email: string
  @IsDefined()
  @Expose()
  password: string
}

export { CreateUserDto, IUser }
