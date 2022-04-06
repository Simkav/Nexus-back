import { Schema, model, Types } from 'mongoose'
import { IBookDocument } from './book.interface'

const BookSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  comments: [{ text: { type: String }, _id: { type: Schema.Types.ObjectId } }]
})
//TODO add methods to work with comments
BookSchema.method('addComment', async function (comment: string) {
  const book: IBookDocument = this
  const res = await book.update({
    $push: { comments: { text: comment, _id: new Types.ObjectId() } }
  })
  return Boolean(res.modifiedCount)
})

BookSchema.method('deleteComment', async function (commentId: string) {
  const book: IBookDocument = this
  const res = await book.update({
    $pull: { comments: { _id: commentId } }
  })
  return Boolean(res.modifiedCount)
})

const BookModel = model<IBookDocument>('Book', BookSchema)

export { BookSchema, BookModel }
