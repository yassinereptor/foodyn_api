import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'apollo-server-core/node_modules/graphql-tools';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPrompt(): string {
    return this.appService.getPrompt();
  }
}
