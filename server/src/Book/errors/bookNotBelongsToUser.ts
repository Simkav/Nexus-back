import CustomError from '../../Errors/customError'

export default class BookNotBelongsToUser extends CustomError {
  constructor () {
    super()
    this.message = 'Book not belongs to user'
  }
}
