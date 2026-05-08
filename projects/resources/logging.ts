import winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';
import { ILogger } from "common";

const loggingWinston = new LoggingWinston();

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    loggingWinston,
  ],
});

export const getLogger = () => logger as ILogger;