import { CreateUserDto, IUserModel } from './user.interface'
import { UserModel } from './user.model'
export default class UserService {
  model: IUserModel
  constructor () {
    this.model = UserModel
  }
  createUser = async (userCreateDto: CreateUserDto) => {
    const createdUser = await this.model.create(userCreateDto)
    return createdUser
  }
  findUserById = async (id: string) => {
    const findedUser = await this.model.findById(id)
    return findedUser
  }
  findUserByEmail = async (email: string) => {
    const findedUser = await this.model.findOne({ email })
    return findedUser
  }
}
