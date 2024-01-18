import { createLogger, format, transports } from 'winston';
const { combine, printf, errors } = format;
import { dateFormatter } from "./mConstants";

const mFormat = combine(
  printf(({ timestamp, level, message, metadata }) => {
    if(metadata) {
      return `[${dateFormatter.format(timestamp)}] ${level}: ${message}. ${JSON.stringify(metadata)}`;
      } else {
      return `[${dateFormatter.format(timestamp)}] ${level}: ${message}`;
      }
  })
);

const errorFilter = format((info, opts) => {
  return info.level === 'error' ? info : false;
});

export const logger = createLogger({
  levels: {
      "info": 0,
      "warn": 1,
      "error": 2,
      "crit": 3,
    },
  format: mFormat,
  transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/tricky.log', level: 'info', maxFiles: 10, maxsize: 1000000 }),
      new transports.File({ 
        filename: 'logs/tricky_error.log', 
        level: 'error',
        format: combine(errorFilter(), mFormat, errors({ stack: true }))
       })
    ]
  }
)

logger.add(
  new transports.File({ filename: 'logs/tricky.log', level: 'error'})
);

logger.info(`Logger initialized...`);