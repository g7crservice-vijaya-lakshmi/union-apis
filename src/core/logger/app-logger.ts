import { AppConfigService } from '@app/config/config.service';
import { unix_ts_now } from '@app/core/utils/timestamp.utils';
import { Injectable, LoggerService } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import * as path from 'path';  

enum WinstonLogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  HTTP = 'http',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  SILLY = 'silly'
}

@Injectable()
export default class AppLogger implements LoggerService {
  public logger: Logger;
  private readonly loggerChannels = [];
  constructor(_appConfigSvc: AppConfigService) {
    const loggerConfig = _appConfigSvc.get('logger');
    const { combine, timestamp, label, json } = format;
    const { Console, File } = transports;

    const logDirectory = path.join(__dirname, '../../../logs'); 

    const fs = require('fs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    this.loggerChannels.push(new Console());

    this.loggerChannels.push(
      new File({
        filename: path.join(logDirectory, 'combined.log'),
        level: 'info',  
        format: combine(
          label({ label: 'ammp-reporting-api' }),
          timestamp({ format: () => unix_ts_now().toString() }),
          json()
        ),
        maxsize: 10000000, 
        maxFiles: 5, 
      })
    );

    
    this.loggerChannels.push(
      new File({
        filename: path.join(logDirectory, 'errors.log'),
        level: 'error',  
        format: combine(
          label({ label: 'ammp-reporting-api' }),
          timestamp({ format: () => unix_ts_now().toString() }),
          json()
        ),
        maxsize: 10000000,  
        maxFiles: 5, 
      })
    );

    const logFormat = combine(
      label({ label: 'ammp-reporting-api' }),
      timestamp({ format: () => unix_ts_now().toString() }),
      json()
    );

    this.logger = createLogger({
      level: loggerConfig.logLevel || 'info',
      format: logFormat,
      transports: this.loggerChannels,
    });
  }

  log(msg: any, status = 200, sid = '') {
    this.logger.log(WinstonLogLevel.INFO, { msg, status, sid });
  }
  
  error(msg: any, status = 500, sid = '') {
    this.logger.log(WinstonLogLevel.ERROR, { msg, status, sid });
  }
  
  warn(msg: any, route = '', status = 206, sid = '') {
    this.logger.log(WinstonLogLevel.WARN, { msg, route, status, sid });
  }
  
  debug?(msg: any, status = 200, sid = '') {
    this.logger.log(WinstonLogLevel.DEBUG, { msg, status, sid });
  }

  verbose?(msg: any, status = 200, sid = '') {
    this.logger.log(WinstonLogLevel.VERBOSE, { msg, status, sid });
  }
}
