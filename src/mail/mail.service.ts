import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async sendUserOtp(user: UserEntity, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject:
        this.appConfigService.server.name +
        ' Confirmation OTP Email (DO NOT REPLY)',
      template: './otp',
      context: {
        app: this.appConfigService.server.name,
        email: user.email,
        token,
      },
    });
  }

  async sendUserConfirmation(user: UserEntity, link: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject:
        this.appConfigService.server.name +
        ' Confirmation Email (DO NOT REPLY)',
      template: './confirmation',
      context: {
        app: this.appConfigService.server.name,
        email: user.email,
        link,
      },
    });
    console.log('Email sent to ' + user.email);
  }
}
