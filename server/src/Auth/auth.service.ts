import { CreateUserDto } from '../User/user.interface'
import UserService from '../User/user.service'
import WrongCredentialsError from './errors/wrongCredentialsError'
import JwtService from '../Jwt/jwt.service'
export default class AuthService {
  private userService: UserService
  private jwtService: JwtService
  constructor () {
    this.userService = new UserService()
    this.jwtService = new JwtService()
  }
  login = async (email: string, password: string) => {
    try {
      const findedUser = await this.userService.findUserByEmail(email)
      const isPasswordValid = await findedUser.checkPassword(password)
      if (!isPasswordValid) {
        throw new WrongCredentialsError()
      }
      return this.jwtService.sign({ userId: findedUser._id })
    } catch (error) {
      throw error
    }
  }
  register = async (createUserDto: CreateUserDto) => {
    try {
      const createdUser = await this.userService.createUser(createUserDto)
      return this.jwtService.sign({ userId: createdUser._id })
    } catch (error) {
      throw error
    }
  }
}
