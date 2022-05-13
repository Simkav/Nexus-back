import CustomError from '../../Errors/customError'

export default class TokenNotProvided extends CustomError {
  constructor () {
    super()
    this.message = 'Token is missing'
  }
}
