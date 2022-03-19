import { NextFunction, Request, Response } from 'express'
import UserAlreadyExistsError from './User/errors/userAlreadyExists'
const errorHandling = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UserAlreadyExistsError) {
    res.status(400).send({ error: err.message })
  } else {
    res.status(400).send({ error: 'Some error' })
  }
}

export default errorHandling
