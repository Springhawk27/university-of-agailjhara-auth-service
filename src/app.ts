import cors from 'cors'
import express, { Application } from 'express'
// import usersService from './app/modules/users/users.service'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
import { loggerInfo } from './shared/logger'
const app: Application = express()
// const port = 3000
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

loggerInfo.info(app.get('env'))

// Application Routes
app.use('/api/v1/users/', UserRoutes)

// app.get('/', async (req: Request, res: Response) => {
//   res.send('Working Successfully!')
// })

// testing
// eslint-disable-next-line no-unused-vars, no-undef, @typescript-eslint/no-unused-vars
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully!')
//   throw new ApiError(400, 'Error Error Errror')
//   // next('Error Error Errror2')
//   // throw new Error('Error Error Errror')
// })

// global error handler
app.use(globalErrorHandler)

export default app
