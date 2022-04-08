import { IsDefined, IsString } from 'class-validator'
import { Expose } from 'class-transformer'
import { Types, Document, Model } from 'mongoose'

export interface IBook {
  title: string
  description?: string
  owner: Types.ObjectId
  comments: IBookComment[]
}

export class CreateBookDto implements Omit<IBook, 'comments' | 'owner'> {
  @Expose()
  @IsDefined()
  title: string
  @Expose()
  description?: string
}

export class UpdateBookDto
  implements Partial<Omit<IBook, 'comment' | 'owner'>> {
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
