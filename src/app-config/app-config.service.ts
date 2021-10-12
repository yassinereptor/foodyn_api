import { MailerOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import ServerConfigInterface from './interfaces/server-config.interface';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get server(): ServerConfigInterface {
    return this.configService.get<ServerConfigInterface>('server');
  }
  get database(): MysqlConnectionOptions {
    return this.configService.get<MysqlConnectionOptions>('database');
  }
  get mail(): MailerOptions {
    return this.configService.get<MailerOptions>('mail');
  }
}
