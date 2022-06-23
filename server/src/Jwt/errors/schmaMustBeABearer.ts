import CustomError from '../../Errors/customError'

export default class SchemaMustBeABearer extends CustomError {
  constructor () {
    super()
    this.message = 'Schema must be a bearer'
  }
}
