import * as winston from 'winston'

import { MongoDBTransportInstance } from "winston-mongodb";

const { MongoDB }: { MongoDB: MongoDBTransportInstance } = require("winston-mongodb");
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)



const transports = new MongoDB({
  // level: 'info', // or info insted of error
  db:'mongodb+srv://Rawy:Rawy@cluster0.xwfxy.mongodb.net/shop?retryWrites=true&w=majority',
  options: {useUnifiedTopology: true }
});
// const transports = [
//   new winston.transports.Console(),
//   new winston.transports.File({
//     filename: 'logs/error.log',
//     level: 'error',
//   }),
//   new winston.transports.File({ filename: 'logs/all.log' }),
// ]

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  defaultMeta: { service: 'user-service' },
  transports,
})

export default Logger