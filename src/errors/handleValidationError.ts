import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  // eslint-disable-next-line no-unused-vars
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  // const statusCode = 400
  // return{

  // }
}

export default handleValidationError
