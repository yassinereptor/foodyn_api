import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPrompt(): string {
    return 'Server Running!';
  }
}
