import { NextFunction, Request, Response } from 'express'
import { validate } from 'class-validator'
import { instanceToPlain, plainToInstance } from 'class-transformer'

const validationMw = (dtoClass: any) =>
  function (req: Request, res: Response, next: NextFunction) {
    const output: any = plainToInstance(dtoClass, req.body, {
      strategy: 'excludeAll'
    })
    validate(output, { skipMissingProperties: true }).then(errors => {
      if (errors.length) {
        console.log(errors)
        const errorTexts = new Array()
        for (const { constraints } of errors) {
          errorTexts.push(constraints)
        }
        res.status(400).send(errorTexts)
        return
      } else {
        req.body = instanceToPlain(output, { strategy: 'excludeAll' })
        next()
      }
    })
  }

export default validationMw
