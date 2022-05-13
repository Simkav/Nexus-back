import { NextFunction, Response, Request, Router } from 'express'
import parseJwt from '../middlewares/parseJwt.mv'
import validationMw from '../middlewares/validaton.mv'
import QuoteRouter from '../Quote/quote.controller'
import userService, { UserService } from '../User/user.service'
import { CreateBookDto, AddCommentDto, UpdateBookDto } from './book.interface'
import bookService, { BookService } from './book.service'

class BookController {
  private bookService: BookService
  private userService: UserService
  constructor () {
    this.bookService = bookService
    this.userService = userService
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
  updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        params: { bookId },
        body
      } = req
      const book = await this.bookService.findBookById(bookId)
      this.bookService.checkIsBookBelongsToUserId(book, req.jwtPayload.userId)
      const result = await this.bookService.updateBook(book, body)
      res.send({ success: result })
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
      const book = await this.bookService.findBookById(bookId)
      this.bookService.checkIsBookBelongsToUserId(book, req.jwtPayload.userId)
      const result = await this.bookService.removeCommentFromBookById(
        book,
        commentId
      )
      res.send({ success: result })
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
      const book = await this.bookService.findBookById(bookId)
      this.bookService.checkIsBookBelongsToUserId(book, req.jwtPayload.userId)
      const result = await this.bookService.addCommentToBook(book, comment)
      res.send({ success: result })
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
BookRouter.route('/')
  .all(parseJwt)
  .get(bookController.getBooks)
  .post(validationMw(CreateBookDto), bookController.createBook)
BookRouter.route('/:bookId')
  .all(parseJwt)
  .get(bookController.getBookById)
  .delete(bookController.deleteBook)
  .patch(validationMw(UpdateBookDto), bookController.updateBook)
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

BookRouter.use(QuoteRouter)

export default BookRouter
