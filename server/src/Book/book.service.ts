import { IUserDocument } from '../User/user.interface'
import {
  CreateBookDto,
  UpdateBookDto,
  IBookDocument,
  IBookModel
} from './book.interface'
import BookNotBelongsToUser from './errors/bookNotBelongsToUser'
import BookNotFound from './errors/bookNotFound'
import { BookModel } from './book.model'
import { Types } from 'mongoose'
export default class BookService {
  private model: IBookModel
  constructor () {
    this.model = BookModel
  }
  createBook = async (owner: IUserDocument, createBookDto: CreateBookDto) => {
    try {
      const book = new this.model({
        ...createBookDto,
        owner: owner._id
      })
      await book.save()
      owner.books.push(book._id)
      await owner.save()
      return book
    } catch (error) {
      throw error
    }
  }
  findBookById = async (id: string) => {
    try {
      const book = await this.model.findById(id)
      if (!book) throw new BookNotFound()
      return book
    } catch (error) {
      throw error
    }
  }
  updateBook = async (book: IBookDocument, updateBookDto: UpdateBookDto) => {
    try {
      const { modifiedCount } = await book.update(updateBookDto)
      return Boolean(modifiedCount)
    } catch (error) {
      throw error
    }
  }
  populateUserBooks = async (user: IUserDocument) => {
    try {
      const populatedUser = await user.populate<{ books: IBookDocument[] }>(
        'books'
      )
      return populatedUser
    } catch (error) {
      throw error
    }
  }
  deleteBookById = async (user: IUserDocument, id: string) => {
    try {
      const bookId = new Types.ObjectId(id)
      if (!user.books.includes(bookId)) throw new BookNotFound()
      await this.model.findByIdAndDelete(id)
      user.books = user.books.filter(book => book !== bookId)
      await user.save()
      return true
    } catch (error) {
      throw error
    }
  }
  addCommentToBook = async (book: IBookDocument, comment: string) => {
    try {
      return await book.addComment(comment)
    } catch (error) {
      throw error
    }
  }
  removeCommentFromBookById = async (book: IBookDocument, id: string) => {
    try {
      return await book.deleteComment(id)
    } catch (error) {
      throw error
    }
  }
  checkIsBookBelongsToUserId = (book: IBookDocument, userId: string) => {
    if (book.owner.toString() !== userId) throw new BookNotBelongsToUser()
  }
}
