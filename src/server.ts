import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { loggerError, loggerInfo } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    // console.log(`Database Connected Successfully`)
    loggerInfo.info(`Database Connected Successfully`)
    app.listen(config.port, () => {
      // console.log(`Application listening on port ${config.port}`)
      loggerInfo.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    // console.log(`Database Connection Failed`, err)
    loggerError.error(`Database Connection Failed`, err)
  }
}

bootstrap()
