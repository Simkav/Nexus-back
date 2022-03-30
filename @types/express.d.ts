declare module Express {
  interface Request {
    // TODO add typing
    jwtPayload: any
  }
}
