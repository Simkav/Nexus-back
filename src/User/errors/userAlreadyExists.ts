export default class UserAlreadyExistsError extends Error {
  constructor () {
    super()
    this.message = 'User already exists'
  }
}
