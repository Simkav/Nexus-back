import jwt from 'jsonwebtoken'

export default class JwtService {
  private secret: string
  constructor () {
    //   TOOD fix this
    this.secret = process.env.JWT_SECRET || ''
  }
  //   TOOD async methods
  sign = (payload: any) => {
    return jwt.sign(payload, this.secret)
  }
  verify = (token: string) => {
    console.log(process.env.JWT_SECRET)
    return jwt.verify(token, this.secret)
  }
}
