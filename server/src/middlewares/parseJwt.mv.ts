import { NextFunction, Response, Request } from 'express'
import JwtService from '../Jwt/jwt.service'
const jwtService = new JwtService()
// TODO create errors
const parseJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new Error('No authorization header')
    }
    const [Bearer, token] = authHeader.split(' ')
    if (!token) {
      throw new Error('No token')
    }
    if (Bearer && Bearer !== 'Bearer') {
      throw new Error('Schema must be a bearer')
    }
    const payload = jwtService.verify(token)
    if (typeof payload === 'string') {
       next(new Error())
       return
    }
    req.jwtPayload = payload
    next()
  } catch (error) {
    next(error)
  }
}

export default parseJwt
