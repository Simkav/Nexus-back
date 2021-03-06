import UserAlreadyExistsError from './errors/userAlreadyExists'
import UserNotFound from './errors/userNotFound'
import { CreateUserDto, IUserModel, IUserService } from './user.interface'
import { UserModel } from './user.model'
class UserService implements IUserService {
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

const userService = new UserService()
export default userService
