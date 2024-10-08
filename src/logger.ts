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
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  },
  format: mFormat,
  transports: [
    new transports.Console({ level: 'debug' }),
    new transports.File(
      { filename: 'logs/tricky.log', level: 'info', maxFiles: 10, maxsize: 1000000 }
    ),
    new transports.File(
      { filename: 'logs/tricky_error.log', level: 'error', maxFiles: 2, maxsize: 500000 }
    )
  ]
});
  
logger.info(`Logger initialized...`);

export default logger;