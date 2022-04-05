import { NextFunction, Request, Response } from 'express'
import CustomError from './Errors/customError'
const errorHandling = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(400).send({ error: err.message })
  } else {
    console.log(err)
    res.status(400).send({ error: 'Some error' })
  }
}

export default errorHandling
