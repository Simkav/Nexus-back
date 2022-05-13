import { CreateUserDto } from '../User/user.interface'
import userService, { UserService } from '../User/user.service'
import WrongCredentialsError from './errors/wrongCredentialsError'
import jwtService, { JwtService } from '../Jwt/jwt.service'
export class AuthService {
  private userService: UserService
  private jwtService: JwtService
  constructor () {
    this.userService = userService
    this.jwtService = jwtService
  }
  login = async (email: string, password: string) => {
    try {
      const findedUser = await this.userService.findUserByEmail(email)
      const isPasswordValid = await findedUser.checkPassword(password)
      if (!isPasswordValid) {
        throw new WrongCredentialsError()
      }
      const { password: _, ...user } = findedUser.toObject()
      return { user, token: this.jwtService.sign({ userId: findedUser._id }) }
    } catch (error) {
      throw error
    }
  }
  register = async (createUserDto: CreateUserDto) => {
    try {
      const createdUser = await this.userService.createUser(createUserDto)
      const { password, ...user } = createdUser.toObject()
      return { user, token: this.jwtService.sign({ userId: createdUser._id }) }
    } catch (error) {
      throw error
    }
  }
  getInfo = async (userId: string) => {
    try {
      const findedUser = await this.userService.findUserById(userId)
      const { password, ...user } = findedUser.toObject()
      return user
    } catch (error) {
      throw error
    }
  }
}

const authService = new AuthService()
export default authService