import { Schema } from 'mongoose'
export default interface IQuote {
  person: string
  text: string
  comment: string
  book: Schema.Types.ObjectId
}
