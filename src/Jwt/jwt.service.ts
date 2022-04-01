import jwt from 'jsonwebtoken'

export default class JwtService {
  private secret: string
  constructor () {
    this.secret = process.env.JWT_SECRET
  }
  //   TOOD async methods
  sign = (payload: any) => {
    return jwt.sign(payload, this.secret)
  }
  verify = (token: string) => {
    return jwt.verify(token, this.secret)
  }
}
