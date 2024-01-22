import { createLogger, format, transports, Logger } from 'winston';
const { combine, printf, errors } = format;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short'
})

const mFormat = combine(
  printf(({ timestamp, level, message, metadata }) => {
    if (metadata) {
      return `[${dateFormatter.format(timestamp)}] ${level}: ${message}. ${JSON.stringify(metadata)}`;
    } else {
      return `[${dateFormatter.format(timestamp)}] ${level}: ${message}`;
    }
  })
)

const logger: Logger = createLogger({
  // levels: {
  //   "info": 0,
  //   "warn": 1,
  //   "error": 2,
  //   "crit": 3,
  // },
  format: mFormat,
  transports: [
    new transports.Console(),
    new transports.File(
      { filename: 'logs/tricky.log', level: 'info', maxFiles: 10, maxsize: 1000000 }
    ),
    new transports.File(
      { filename: 'logs/tricky_error.log', level: 'error', maxFiles: 2, maxsize: 500000}
    )
  ]
});

// logger.add(
//   new transports.File({
//     filename: 'logs/tricky.log',
//     level: 'error',
//     format: combine(mFormat, errors({ stack: true }))
//   })
// );
  
logger.info(`Logger initialized...`);

export default logger;