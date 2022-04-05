import { Router } from 'express'
import AuthRouter from './Auth/auth.controller'
import BookRouter from './Book/book.controller'

const mainRouter = Router()

mainRouter.use('/auth', AuthRouter)
mainRouter.use('/book', BookRouter)

export default mainRouter
