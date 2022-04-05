import { Schema, model } from 'mongoose'
import IQuote from './quote.interface'

const QuoteSchema = new Schema<IQuote>({
  comment: { type: String },
  person: { type: String },
  text: { type: String },
  book: { type: Schema.Types.ObjectId, ref: 'Book' }
})

const QuoteModel = model<IQuote>('Quote', QuoteSchema)

export { QuoteSchema, QuoteModel }
