import { Model, Types, Document } from 'mongoose'
import { Expose } from 'class-transformer'
import { IsDefined, IsEmail } from 'class-validator'
interface IUser {
  email: string
  password: string
  books: Types.ObjectId[] //IBookDocument
}

interface IUserDocument extends IUser, Document {
  checkPassword: (password: string) => Promise<boolean>
}

interface IUserModel extends Model<IUserDocument> {}

class CreateUserDto implements Omit<IUser, 'books'> {
  @Expose()
  @IsDefined()
  @IsEmail()
  email: string
  @IsDefined()
  @Expose()
  password: string
}

export interface IUserService {
  createUser(userCreateDto: CreateUserDto): Promise<IUserDocument>
  findUserById(id: string): Promise<IUserDocument>
  findUserByEmail(email: string): Promise<IUserDocument>
}

class CredentialsUserDto extends CreateUserDto {}

export { CreateUserDto, IUser, IUserModel, IUserDocument, CredentialsUserDto }
