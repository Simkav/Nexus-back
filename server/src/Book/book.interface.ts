import { IsDefined, IsString } from 'class-validator'
import { Expose } from 'class-transformer'
import { Types, Document, Model } from 'mongoose'
import { IQuoteDocument } from '../Quote/quote.interface'
import { IUserDocument } from '../User/user.interface'

export interface IBook {
  title: string
  description?: string
  owner: Types.ObjectId // IUserDocument
  comments: IBookComment[]
  quotes: Types.ObjectId[] // IQuoteDocument
}
export interface IPopulatedBookDocument extends Omit<IBookDocument, 'quotes'> {
  quotes: IQuoteDocument[]
}

export interface IPopulatedUserDocument extends Omit<IUserDocument, 'books'> {
  books: IBookDocument[]
}

export class CreateBookDto implements Pick<IBook, 'title' | 'description'> {
  @Expose()
  @IsDefined()
  title: string
  @Expose()
  description?: string
}

export class UpdateBookDto
  implements Partial<Pick<IBook, 'title' | 'description'>> {
  @Expose()
  title?: string
  @Expose()
  description?: string
}

export class AddCommentDto {
  @Expose()
  @IsDefined()
  @IsString()
  comment: string
}

export class UpdateCommentDto extends AddCommentDto {}

export interface IBookDocument extends IBook, Document {
  addComment: (comment: string) => Promise<boolean>
  deleteComment: (commentId: string) => Promise<boolean>
  updateComment: (commentId: string, newComment: string) => Promise<boolean>
}

export interface IBookService {
  createBook(
    owner: IUserDocument,
    createBookDto: CreateBookDto
  ): Promise<IBookDocument>
  findBookById(id: string): Promise<IBookDocument>
  updateBook(
    book: IBookDocument,
    updateBookDto: UpdateBookDto
  ): Promise<boolean>
  populateUserBooks(user: IUserDocument): Promise<IPopulatedUserDocument>
  deleteBookById(user: IUserDocument, id: string): Promise<boolean>
  addCommentToBook(book: IBookDocument, comment: string): Promise<boolean>
  removeCommentFromBookById(book: IBookDocument, id: string): Promise<boolean>
  updateComment(
    book: IBookDocument,
    id: string,
    newComment: string
  ): Promise<boolean>
  checkIsBookBelongsToUserId(book: IBookDocument, userId: string): void
}

export interface IBookModel extends Model<IBookDocument> {}

export interface IBookComment {
  text: string
  _id: Types.ObjectId
}
