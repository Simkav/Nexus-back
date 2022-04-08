import { IUserDocument } from '../User/user.interface'
import {
  CreateBookDto,
  UpdateBookDto,
  IBookDocument,
  IBookModel
} from './book.interface'
import { BookModel } from './book.model'
export default class BookService {
  private model: IBookModel
  constructor () {
    this.model = BookModel
  }
  createBook = async (owner: IUserDocument, createBookDto: CreateBookDto) => {
    try {
      const book = new this.model({
        title: createBookDto.title,
        owner: owner._id
      })
      await book.save()
      owner.books.push(book)
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
      const populatedUser = await user.populate('books')
      return populatedUser
    } catch (error) {
      throw error
    }
  }
  deleteBookById = async (user: IUserDocument, id: string) => {
    try {
      const books = await user.books.filter(book => book._id.toString() !== id)
      if (books.length === user.books.length) {
        throw new Error('Book not found')
      }
      await this.model.findByIdAndDelete(id)
      user.books = books
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
}
