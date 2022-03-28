import CustomError from '../../Errors/customError'

export default class UserAlreadyExistsError extends CustomError {
  constructor () {
    super()
    this.message = 'User already exists'
  }
}
