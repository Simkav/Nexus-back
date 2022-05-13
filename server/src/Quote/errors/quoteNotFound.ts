import CustomError from '../../Errors/customError'

export default class QuoteNotFound extends CustomError {
  constructor () {
    super()
    this.message = 'Quote not found'
  }
}
