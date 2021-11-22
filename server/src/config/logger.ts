import * as W from 'winston';

const {
  colorize,
  combine,
  errors,
  json,
  prettyPrint,
  simple,
  splat,
  timestamp,
} = W.format;
const errorsLog = new W.transports.File({
  filename: 'logs/errors.log',
  level: 'error',
});
const combinedLog = new W.transports.File({ filename: 'logs/combined.log' });
const consoleLog = new W.transports.Console({
  format: combine(colorize(), simple()),
});

export const logger = W.createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    errors({ stack: true }),
    splat(),
    json(),
    prettyPrint(),
  ),
  defaultMeta: { service: 'GeoChating server logger' },
  transports: [errorsLog, combinedLog],
});

if (process.env.NODE_ENV !== 'production') logger.add(consoleLog);

const info = (msg: string) =>
  logger.log({
    level: 'info',
    message: msg,
  });

const error = (msg: string) =>
  logger.log({
    level: 'error',
    message: msg,
  });
const log = { info, error };

export default log;
