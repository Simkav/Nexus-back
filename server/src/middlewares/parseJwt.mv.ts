import { NextFunction, Response, Request } from 'express'
import AuthorizationHeaderNotProvided from '../Jwt/errors/authorizationHeaderNotProvided'
import jwtService from '../Jwt/jwt.service'
const parseJwt = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new AuthorizationHeaderNotProvided()
    const token = jwtService.parseAuthorizationHeader(authHeader)
    req.jwtPayload = jwtService.verify(token)
    next()
  } catch (error) {
    next(error)
  }
}

export default parseJwt
