import { Request, Response, NextFunction, Router } from 'express'
import parseJwt from '../middlewares/parseJwt.mv'
import validationMw from '../middlewares/validaton.mv'
import { CreateUserDto, CredentialsUserDto } from '../User/user.interface'
import authService, { AuthService } from './auth.service'
class AuthController {
  private authService: AuthService
  constructor () {
    this.authService = authService
  }
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const result = await this.authService.login(email, password)
      res.send(result)
    } catch (error) {
      next(error)
    }
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const result = await this.authService.register({ email, password })
      res.send(result)
    } catch (error) {
      next(error)
    }
  }
  getInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.getInfo(req.jwtPayload.userId)
      res.send(result)
    } catch (error) {
      next(error)
    }
  }
}

const AuthRouter = Router()
const authController = new AuthController()
AuthRouter.get('/me', parseJwt, authController.getInfo)
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
