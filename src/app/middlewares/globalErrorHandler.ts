/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import config from './../../config'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // res.status(400).json({ err: err })
  // next()

  const statusCode = 500
  const message = 'Something Went Wrong'
  const errorMessages: IGenericErrorMessage[] = []

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
}

export default globalErrorHandler
