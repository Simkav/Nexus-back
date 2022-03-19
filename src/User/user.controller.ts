import { Request, Response, NextFunction, Router } from 'express'
import validationMw from '../middlewares/validaton.mv'
import { CreateUserDto } from './user.interface'
import userService from './user.service'
import UserAlreadyExistsError from './errors/userAlreadyExists'
class UserController {
  private service: userService
  constructor () {
    this.service = new userService()
  }
  findUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const findedUser = await this.service.findUserById(id)
      res.send({ user: findedUser })
    } catch (error) {
      next(error)
    }
  }
  findUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body
      const findedUser = await this.service.findUserById(email)
      res.send({ user: findedUser })
    } catch (error) {
      next(error)
    }
  }
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const newUser = await this.service.createUser({ email, password })
      res.send({ user: newUser })
    } catch (error) {
      if (error.code === 11000) {
        next(new UserAlreadyExistsError())
      } else {
        next(error)
      }
    }
  }
}

const UserRouter = Router()
const userController = new UserController()
UserRouter.post('/', validationMw(CreateUserDto), userController.createUser)

export { UserRouter }
