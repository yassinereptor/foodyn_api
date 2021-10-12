import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserTypeEnum } from 'src/user/types/user-type.enum';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly usersService: UserService,
    private readonly appConfigService: AppConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(
    email: string,
    password: string,
    type: UserTypeEnum,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user || user.type != type) return null;

    const passwordIsValid = await this.comparePassword(password, user.password);
    return passwordIsValid ? user : null;
  }

  async verify(token: string): Promise<UserEntity> {
    const decoded = this.jwtService.verify(token, {
      secret: this.appConfigService.server.jwt_secret,
    });

    const user = await this.usersService.findUserByEmail(decoded.email);

    if (!user) throw new Error('Unable to get the user from decoded token.');
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword(
    password: string,
    passwordToCompare: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, passwordToCompare);
    return isMatch;
  }
}
