import UserAlreadyExistsError from '../User/errors/userAlreadyExists'
import { CreateUserDto } from '../User/user.interface'
import UserService from '../User/user.service'
import WrongCredentialsError from './errors/wrongCredentialsError'

export default class AuthService {
  userService: UserService
  constructor () {
    this.userService = new UserService()
  }
  login = async (email: string, password: string) => {
    try {
      const findedUser = await this.userService.findUserByEmail(email)
      const isPasswordValid = await findedUser.checkPassword(password)
      if (!isPasswordValid) {
        throw new WrongCredentialsError()
      }
      return findedUser
    } catch (error) {
      throw error
    }
  }
  register = async (createUserDto: CreateUserDto) => {
    try {
      await this.userService.createUser(createUserDto)
    } catch (error) {

    }
  }
}
