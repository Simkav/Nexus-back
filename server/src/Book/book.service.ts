import { IUserDocument } from '../User/user.interface'
import {
  CreateBookDto,
  UpdateBookDto,
  IBookDocument,
  IBookModel
} from './book.interface'
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
      if (!book) {
        throw new Error('Book not found')
      }
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
      const objectIdBookd = new Types.ObjectId(id)
      const books = await user.books.filter(book => book._id.toString() !== id)
      if (books.length === user.books.length) {
      }
      if (user.books.includes(objectIdBookd)) {
        await this.model.findByIdAndDelete(id)
        user.books = user.books.filter(bookId => bookId !== objectIdBookd)
        await user.save()
      } else {
        throw new Error('Book not found')
      }
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
  isBookBelongsToUserId = (book: IBookDocument, userId: string) => {
    if (book.owner.toString() !== userId)
    // TODO custom error
      throw new Error('Book not belongs to user')
  }
}
