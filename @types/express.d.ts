declare global {
  namespace Express {
    interface Request {
      jwtPayload: any
    }
  }
}
export {}
