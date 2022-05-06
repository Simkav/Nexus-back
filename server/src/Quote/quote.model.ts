import { Schema, model } from 'mongoose'
import { IQuoteDocument } from './quote.interface'

const QuoteSchema = new Schema({
  comment: { type: String, default: '' },
  person: { type: String, default: '' },
  text: { type: String, required: true }
})

const QuoteModel = model<IQuoteDocument>('Quote', QuoteSchema)

export { QuoteSchema, QuoteModel }
