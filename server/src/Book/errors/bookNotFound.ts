import CustomError from '../../Errors/customError'

export default class BookNotFound extends CustomError {
  constructor () {
    super()
    this.message = 'Book not found'
  }
}
