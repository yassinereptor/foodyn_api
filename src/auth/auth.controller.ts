import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): { token: string } {
    return this.authService.login(req.user as UserEntity);
  }

  @Post('register')
  async register(@Req() req: Request): Promise<{ token: string }> {
    return await this.authService.register(
      req.body.email,
      req.body.password,
      req.body.type,
    );
  }

  @Post('forgetpassword')
  async forgetPassword(@Req() req: Request): Promise<{ success: boolean }> {
    return await this.authService.forgetPassword(req.body.email, req.body.type);
  }

  @Get('confirmation')
  async confirmation(@Req() req: Request): Promise<{ success: boolean }> {
    return await this.authService.confirmation('z');
  }

  @UseGuards(LocalAuthGuard)
  @Get('emailverification')
  async emailverification(@Req() req: Request): Promise<{ success: boolean }> {
    return await this.authService.emailverification(req.body.email);
  }
}
