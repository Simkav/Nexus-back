import CustomError from '../../Errors/customError'

export default class UserNotFound extends CustomError {
  constructor () {
    super()
    this.message = 'User not found'
  }
}
