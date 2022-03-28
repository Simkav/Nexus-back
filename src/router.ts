import { Router } from 'express'
import { AuthRouter } from './Auth/auth.controller'

const mainRouter = Router()

mainRouter.use('/auth', AuthRouter)

export default mainRouter
