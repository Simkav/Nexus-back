import { Expose } from 'class-transformer'
import { IsDefined } from 'class-validator'
import { Document, Model } from 'mongoose'
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

export interface IQuoteDocument extends IQuote, Document {}

export interface IQuouteModel extends Model<IQuoteDocument> {}
