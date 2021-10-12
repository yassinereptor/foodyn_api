import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AuthHelper } from '../auth.helper';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly authHelper: AuthHelper,
  ) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(
    request: any,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.authHelper.validate(
      email,
      password,
      request.body.type,
    );

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
