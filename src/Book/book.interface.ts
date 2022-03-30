import { IsDefined } from 'class-validator'
import { Expose } from 'class-transformer'
import { Types, Document, Model } from 'mongoose'

interface IBook {
  title: string
  owner: Types.ObjectId
  comments: IBookComment[]
}

class CreateBookDto implements Omit<IBook, 'comments' | 'owner'> {
  @Expose()
  @IsDefined()
  title: string
}

interface IBookDocument extends IBook, Document {
  addComment: (comment: string) => Promise<boolean>
  deleteComment: (commentId: string) => Promise<boolean>
}

interface IBookModel extends Model<IBookDocument> {}

interface IBookComment {
  text: string
  _id: Types.ObjectId
}

export { IBook, IBookComment, IBookDocument, IBookModel, CreateBookDto }
