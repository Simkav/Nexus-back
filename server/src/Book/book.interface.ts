import { IsDefined, IsString } from 'class-validator'
import { Expose } from 'class-transformer'
import { Types, Document, Model } from 'mongoose'

export interface IBook {
  title: string
  description?: string
  owner: Types.ObjectId // IUserDocument
  comments: IBookComment[]
  quotes: Types.ObjectId[] // IQuoteDocument
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

export interface IBookDocument extends IBook, Document {
  addComment: (comment: string) => Promise<boolean>
  deleteComment: (commentId: string) => Promise<boolean>
}

export interface IBookModel extends Model<IBookDocument> {}

export interface IBookComment {
  text: string
  _id: Types.ObjectId
}
