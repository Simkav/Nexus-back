import jwt from 'jsonwebtoken'
import SchemaMustBeABearer from './errors/schmaMustBeABearer'
import TokenNotProvided from './errors/tokenNotProvided'

export class JwtService {
  private secret: string
  private jwt: typeof jwt
  constructor () {
    this.jwt = jwt
    this.secret = process.env.JWT_SECRET
  }
  //   TOOD async methods
  sign = (payload: any) => {
    return this.jwt.sign(payload, this.secret)
  }
  verify = (token: string) => {
    const payload = this.jwt.verify(token, this.secret)
    if (typeof payload === 'string') throw new Error()
    return payload
  }
  parseAuthorizationHeader = (authorizationHeader: string) => {
    const [Bearer, token] = authorizationHeader.split(' ')
    if (!token) {
      throw new TokenNotProvided()
    }
    if (Bearer && Bearer !== 'Bearer') {
      throw new SchemaMustBeABearer()
    }
    return token
  }
}

const jwtService = new JwtService()
export default jwtService
