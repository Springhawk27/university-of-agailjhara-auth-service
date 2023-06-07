/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import ApiError from '../../errors/ApiErrors'
import handleValidationError from '../../errors/handleValidationError'
import { IGenericErrorMessage } from '../../interfaces/error'
import { loggerError } from '../../shared/logger'

// if the error is the first parameter then this is a error path pattern hence - ErrorRequestHandler
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // res.status(400).json({ err: err })
  // next()

  config.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log('globalErrorHandler', error)
    : loggerError.error('globalErrorHandler', error)

  let statusCode = 500
  let message = 'Something Went Wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
