import { Request, Response, NextFunction, Router } from 'express'
import validationMw from '../middlewares/validaton.mv'
import { CreateUserDto, CredentialsUserDto } from '../User/user.interface'
import AuthService from './auth.service'
class AuthController {
  private authService: AuthService
  constructor () {
    this.authService = new AuthService()
  }
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const token = await this.authService.login(email, password)
      res.send({ token })
    } catch (error) {
      next(error)
    }
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const token = await this.authService.register({ email, password })
      res.send({ token })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

const AuthRouter = Router()
const authController = new AuthController()
AuthRouter.post(
  '/login',
  validationMw(CredentialsUserDto),
  authController.login
)
AuthRouter.post(
  '/register',
  validationMw(CreateUserDto),
  authController.register
)

export default AuthRouter
