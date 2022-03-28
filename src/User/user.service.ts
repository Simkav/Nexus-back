import UserAlreadyExistsError from './errors/userAlreadyExists'
import UserNotFound from './errors/userNotFound'
import { CreateUserDto, IUserModel } from './user.interface'
import { UserModel } from './user.model'
export default class UserService {
  model: IUserModel
  constructor () {
    this.model = UserModel
  }
  createUser = async (userCreateDto: CreateUserDto) => {
    try {
      const createdUser = await this.model.create(userCreateDto)
      return createdUser
    } catch (error) {
      if (error.code === 11000) {
        throw new UserAlreadyExistsError()
      } else {
        throw error
      }
    }
  }
  findUserById = async (id: string) => {
    try {
      const findedUser = await this.model.findById(id)
      if (!findedUser) {
        throw new UserNotFound()
      }
      return findedUser
    } catch (error) {
      throw error
    }
  }
  findUserByEmail = async (email: string) => {
    try {
      const findedUser = await this.model.findOne({ email })
      if (!findedUser) {
        throw new UserNotFound()
      }
      return findedUser
    } catch (error) {
      throw error
    }
  }
}
