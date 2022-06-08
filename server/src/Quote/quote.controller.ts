import { NextFunction, Response, Request, Router } from 'express'
import bookService, { BookService } from '../Book/book.service'
import parseJwt from '../middlewares/parseJwt.mv'
import validationMw from '../middlewares/validaton.mv'
import { CreateQuoteDto } from './quote.interface'
import quoteService, { QuoteService } from './quote.service'

class QuoteController {
  private quoteService: QuoteService
  private bookService: BookService
  constructor () {
    this.bookService = bookService
    this.quoteService = quoteService
  }
  addQuote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        params: { bookId },
        body
      } = req
      const book = await this.bookService.findBookById(bookId)
      this.bookService.checkIsBookBelongsToUserId(book, req.jwtPayload.userId)
      const quote = await this.quoteService.addQuote(body, book)
      res.send({ quote })
    } catch (error) {
      next(error)
    }
  }
  getQuotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        params: { bookId }
      } = req
      const book = await this.bookService.findBookById(bookId)
      this.bookService.checkIsBookBelongsToUserId(book, req.jwtPayload.userId)
      const { quotes } = await this.quoteService.populateBookQuotes(book)
      res.send({ quotes })
    } catch (error) {
      next(error)
    }
  }
  deleteQuote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        params: { bookId, quoteId }
      } = req
      const quote = await this.quoteService.findQuoteById(quoteId)
      const book = await this.bookService.findBookById(bookId)
      this.bookService.checkIsBookBelongsToUserId(book, req.jwtPayload.userId)
      const result = await this.quoteService.deleteQuote(book, quote)
      res.send({ success: result })
    } catch (error) {
      next(error)
    }
  }
  updateQuote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        params: { bookId, quoteId },
        body
      } = req
      const quote = await this.quoteService.findQuoteById(quoteId)
      const book = await this.bookService.findBookById(bookId)
      this.bookService.checkIsBookBelongsToUserId(book, req.jwtPayload.userId)
      const result = await this.quoteService.editQuote(quote, body)
      res.send({ success: result })
    } catch (error) {
      next(error)
    }
  }
}

const QuoteRouter = Router()
const quoteController = new QuoteController()
QuoteRouter.route('/:bookId/quote')
  .post(validationMw(CreateQuoteDto), parseJwt, quoteController.addQuote)
  .get(parseJwt, quoteController.getQuotes)
QuoteRouter.route('/:bookId/quote/:quoteId')
  .delete(parseJwt, quoteController.deleteQuote)
  .post(validationMw(UpdateQuoteDto), parseJwt, quoteController.updateQuote)

export default QuoteRouter
