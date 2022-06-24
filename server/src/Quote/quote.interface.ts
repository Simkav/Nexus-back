import { Expose } from 'class-transformer'
import { IsDefined } from 'class-validator'
import { Document, Model } from 'mongoose'
import { IBookDocument, IPopulatedBookDocument } from '../Book/book.interface'
export interface IQuote {
  person: string
  text: string
  comment: string
}

export class CreateQuoteDto
  implements Pick<IQuote, 'person' | 'text' | 'comment'> {
  @Expose()
  person: string
  @Expose()
  @IsDefined()
  text: string
  @Expose()
  comment: string
}

export class UpdateQuoteDto
  implements Partial<Pick<IQuote, 'person' | 'text' | 'comment'>> {
  @Expose()
  person: string
  @Expose()
  text: string
  @Expose()
  comment: string
}

export interface IQuoteService {
  addQuote(createQuoteDto: CreateQuoteDto, book: IBookDocument): Promise<any>
  populateBookQuotes(book: IBookDocument): Promise<IPopulatedBookDocument>
  findQuoteById(id: string): Promise<IQuoteDocument>
  deleteQuote(book: IBookDocument, quote: IQuoteDocument): Promise<boolean>
  editQuote(
    quote: IQuoteDocument,
    updateQuoteDto: UpdateQuoteDto
  ): Promise<boolean>
}

export interface IQuoteDocument extends IQuote, Document {}

export interface IQuouteModel extends Model<IQuoteDocument> {}
