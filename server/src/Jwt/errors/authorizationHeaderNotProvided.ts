import CustomError from '../../Errors/customError'

export default class AuthorizationHeaderNotProvided extends CustomError {
  constructor () {
    super()
    this.message = 'Authorization header is missing'
  }
}
