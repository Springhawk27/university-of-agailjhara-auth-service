import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { loggerError, loggerInfo } from './shared/logger'

process.on('uncaughtException', error => {
  // console.log('Uncaught exception in detected....')
  loggerError.error(error)
  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    // console.log(`Database Connected Successfully`)
    loggerInfo.info(`Database Connected Successfully`)
    server = app.listen(config.port, () => {
      // console.log(`Application listening on port ${config.port}`)
      loggerInfo.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    // console.log(`Database Connection Failed`, err)
    loggerError.error(`Database Connection Failed`, err)
  }

  process.on('unhandledRejection', error => {
    // console.log('unhandled Rejection is detected, we are closing our server')
    if (server) {
      server.close(() => {
        loggerError.error(error)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

// console.log(x)

process.on('SIGTERM', () => {
  loggerInfo.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
