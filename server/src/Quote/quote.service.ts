import { IBookDocument, IPopulatedBookDocument } from './../Book/book.interface'
import QuoteNotFound from './errors/quoteNotFound'
import {
  IQuouteModel,
  CreateQuoteDto,
  IQuoteDocument,
  UpdateQuoteDto
} from './quote.interface'
import { QuoteModel } from './quote.model'
export default class QuoteService {
  private model: IQuouteModel
  constructor () {
    this.model = QuoteModel
  }
  addQuote = async (createQuoteDto: CreateQuoteDto, book: IBookDocument) => {
    try {
      const quote = new this.model(createQuoteDto)
      await quote.save()
      book.quotes.push(quote._id)
      await book.save()
      return quote
    } catch (error) {
      throw error
    }
  }
  populateBookQuotes = async (
    book: IBookDocument
  ): Promise<IPopulatedBookDocument> => {
    try {
      const populatedBook = await book.populate<{ quotes: IQuoteDocument[] }>(
        'quotes'
      )
      return populatedBook
    } catch (error) {
      throw error
    }
  }
  findQuoteById = async (id: string): Promise<IQuoteDocument> => {
    try {
      const quote = await this.model.findById(id)
      if (!quote) throw new QuoteNotFound()
      return quote
    } catch (error) {
      throw error
    }
  }
  deleteQuote = async (book: IBookDocument, quote: IQuoteDocument) => {
    try {
      book.quotes = book.quotes.filter(
        q => q._id.toString() !== quote._id.toString()
      )
      await quote.remove()
      await book.save()
      return true
    } catch (error) {
      throw error
    }
  }
  editQuote = async (quote: IQuoteDocument, updateQuoteDto: UpdateQuoteDto) => {
    try {
      const { modifiedCount } = await quote.update(updateQuoteDto)
      return Boolean(modifiedCount)
    } catch (error) {
      throw error
    }
  }
}
