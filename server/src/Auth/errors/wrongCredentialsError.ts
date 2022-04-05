import CustomError from '../../Errors/customError'

export default class WrongCredentialsError extends CustomError {
  constructor () {
    super()
    this.message = 'Wrong credentials'
  }
}
