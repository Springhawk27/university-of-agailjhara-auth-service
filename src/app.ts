import cors from 'cors'
import express, { Application, Request, Response } from 'express'
// import usersService from './app/modules/users/users.service'
import usersRouter from './app/modules/users/users.route'
import logger from './shared/logger'
const app: Application = express()
// const port = 3000
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// eslint-disable-next-line no-console
logger.info(app.get('env'))

// Application Routes
app.use('/api/v1/users/', usersRouter)

// testing
app.get('/', async (req: Request, res: Response) => {
  // await usersService.createUser({
  //   id: '999',
  //   password: '1234',
  //   role: 'student',
  // })
  res.send('Working Successfully!')
})

export default app
