/* eslint-disable no-undef */
// import winston from 'winston'
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, prettyPrint } = format;

// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  // customize timestamp
  const date = new Date(timestamp);
  // const hours = date.getHours()
  // const minutes = date.getMinutes()
  // const seconds = date.getSeconds()

  // return `${timestamp} [${label}] ${level}: ${message}`
  // return `${date.toString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`
  return `${date.toString()} [${label}] ${level}: ${message}`;
});

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   // defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write all logs with importance level of `error` or less to `error.log`
//     // - Write all logs with importance level of `info` or less to `combined.log`
//     //
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// })

const loggerInfo = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Successful!' }),
    timestamp(),
    myFormat,
    prettyPrint() // with pretty print
  ),

  transports: [
    new transports.Console(),
    // new transports.File({
    //   filename: path.join(
    //     process.cwd(),
    //     'logs',
    //     'winston',
    //     'successes',
    //     'uoa-%DATE%-success.log'
    //   ),
    // }),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'uoa-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const loggerError = createLogger({
  level: 'error',
  format: combine(label({ label: 'Unsuccessful!' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    // new transports.File({
    //   filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
    // }),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'uoa-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { loggerInfo, loggerError };
