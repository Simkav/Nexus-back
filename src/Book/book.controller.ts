import { NextFunction, Response, Request, Router } from 'express'
import parseJwt from '../middlewares/parseJwt.mv'
import validationMw from '../middlewares/validaton.mv'
import UserService from '../User/user.service'
import { CreateBookDto, AddCommentDto } from './book.interface'
import BookService from './book.service'

class BookController {
  private bookService: BookService
  private userService: UserService
  constructor () {
    this.bookService = new BookService()
    this.userService = new UserService()
  }
  createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title } = req.body
      const user = await this.userService.findUserById(req.jwtPayload.userId)
      const createdBook = await this.bookService.createBook(user, { title })
      res.send({ createdBook })
    } catch (error) {
      next(error)
    }
  }
  getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params
      const book = await this.bookService.findBookById(bookId)
      res.send({ book })
    } catch (error) {
      next(error)
    }
  }
  deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params
      const user = await this.userService.findUserById(req.jwtPayload.userId)
      const result = await this.bookService.deleteBookById(user, bookId)
      res.send({ success: result })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  removeCommentFromBookById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { bookId, commentId } = req.params
      const user = await this.userService.findUserById(req.jwtPayload.userId)
      if (user.books.some(book => book._id.toString() === bookId)) {
        const book = await this.bookService.findBookById(bookId)
        const result = await this.bookService.removeCommentFromBookById(
          book,
          commentId
        )
        res.send({ success: result })
      } else {
        next(new Error('You are not allowed to remove comment from this book'))
      }
    } catch (error) {
      next(error)
    }
  }
  addCommentToBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        params: { bookId },
        body: { comment }
      } = req
      const user = await this.userService.findUserById(req.jwtPayload.userId)
      if (user.books.some(book => book._id.toString() === bookId)) {
        const book = await this.bookService.findBookById(bookId)
        const result = await this.bookService.addCommentToBook(book, comment)
        res.send({ success: result })
      } else {
        next(new Error('You are not allowed to add comment to this book'))
      }
    } catch (error) {
      next(error)
    }
  }
  getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.findUserById(req.jwtPayload.userId)
      const { books } = await this.bookService.populateUserBooks(user)
      res.send({ books })
    } catch (error) {
      next(error)
    }
  }
}

const BookRouter = Router()
const bookController = new BookController()
BookRouter.get('/', parseJwt, bookController.getBooks)
BookRouter.get('/:bookId', parseJwt, bookController.getBookById)
BookRouter.post(
  '/',
  validationMw(CreateBookDto),
  parseJwt,
  bookController.createBook
)
BookRouter.delete('/:bookId', parseJwt, bookController.deleteBook)
BookRouter.post(
  '/:bookId/comment',
  validationMw(AddCommentDto),
  parseJwt,
  bookController.addCommentToBook
)
BookRouter.delete(
  '/:bookId/comment/:commentId',
  parseJwt,
  bookController.removeCommentFromBookById
)

export default BookRouter
