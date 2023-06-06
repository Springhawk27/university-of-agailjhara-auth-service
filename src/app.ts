import cors from 'cors'
import express, { Application, Request, Response } from 'express'
// import usersService from './app/modules/users/users.service'
import usersRouter from './app/modules/users/users.route'
import { loggerInfo } from './shared/logger'
const app: Application = express()
// const port = 3000
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

loggerInfo.info(app.get('env'))

// Application Routes
app.use('/api/v1/users/', usersRouter)

// class ApiError extends Error {
//   statusCode: number
//   constructor(statusCode: number, message: string | undefined, stack = '') {
//     super(message)
//     this.statusCode = statusCode
//     if (stack) {
//       this.stack = stack
//     } else {
//       Error.captureStackTrace(this, this.constructor)
//     }
//   }
// }

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully!')
})

// testing
// eslint-disable-next-line no-unused-vars
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // await usersService.createUser({
//   //   id: '999',
//   //   password: '1234',
//   //   role: 'student',
//   // })
//   res.send('Working Successfully!')
//   // throw new ApiError(400, 'Error Error Errror')
//   // next('Error Error Errror2')
//   // throw new Error('Error Error Errror')
// })

// global error handler
// eslint-disable-next-line no-unused-vars
// app.use((err, req: Request, res: Response, next: NextFunction) => {
//   // console.log(err)
//   if (err instanceof Error) {
//     res.status(400).json({ error: err })
//   } else {
//     res.status(500).json({ error: 'something went wrong' })
//   }
// })

export default app
