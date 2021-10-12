import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { AuthHelper } from './auth.helper';
import { AppConfigService } from '../app-config/app-config.service';
import { MailService } from 'src/mail/mail.service';
import { TokenEntity } from 'src/token/entities/token.entity';
import { TokenService } from 'src/token/token.service';
import { TokenStatusEnum } from 'src/token/status/token-status.enum';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserTypeEnum } from 'src/user/types/user-type.enum';
import { TokenTypeEnum } from 'src/token/types/token-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly tokensService: TokenService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly appConfigService: AppConfigService,
    private readonly authHelper: AuthHelper,
  ) {}

  login(user: UserEntity): { token: string } {
    const payload = {
      id: user.id,
      email: user.email,
      type: user.type,
      verified: user.verified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    password: string,
    type: UserTypeEnum,
  ): Promise<{ token: string }> {
    if (await this.usersService.findUserByEmail(email))
      throw new UnauthorizedException();

    const hashedPassword = await this.authHelper.hashPassword(password);
    const user = await this.usersService.insertUser(
      email,
      hashedPassword,
      type,
    );
    const token = uuidv4();
    this.tokensService.insertToken(
      user.id,
      token,
      TokenTypeEnum.CONFIRMATIONEMAIL,
    );
    const link =
      this.appConfigService.server.link + 'auth/confirmation/' + token;
    this.mailService.sendUserConfirmation(user, link);
    const payload = {
      id: user.id,
      email: user.email,
      type: user.type,
      verified: user.verified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async forgetPassword(
    email: string,
    type: UserTypeEnum,
  ): Promise<{ success: boolean }> {
    var user: UserEntity = null;
    var lastToken: TokenEntity = null;
    if (
      (user = await this.usersService.findUserByEmail(email)) == null ||
      user.type != type
    )
      throw new UnauthorizedException();
    lastToken = await this.tokensService.findLastTokenOfType(
      user.id,
      TokenTypeEnum.FORGETPASSWORD,
    );
    if (
      lastToken != null &&
      lastToken.status == TokenStatusEnum.ACTIVE &&
      Date.now() - lastToken.createdAt.getTime() < 10000
    )
      throw new BadRequestException();
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    this.tokensService.insertToken(user.id, token, TokenTypeEnum.FORGETPASSWORD);
    this.mailService.sendUserOtp(user, token);

    return {
      success: true,
    };
  }

  async confirmation(token: string): Promise<{ success: boolean }> {
    var lastToken: TokenEntity = null;
    var user: UserEntity = null;

    if (
      (lastToken = await this.tokensService.findOneTokenByToken(token)) == null
    )
      throw new UnauthorizedException();
    user = lastToken.user;
    if (
      user.verified ||
      lastToken.status == TokenStatusEnum.USED ||
      lastToken.createdAt.getHours() > 24 ||
      lastToken.type != TokenTypeEnum.CONFIRMATIONEMAIL
    )
      throw new BadRequestException();

    lastToken.status = TokenStatusEnum.USED;
    user.verified = true;
    await this.usersService.updateUser(user);
    await this.tokensService.updateToken(lastToken);
    return {
      success: true,
    };
  }

  async otp(token: string): Promise<{ success: boolean }> {
    var lastToken: TokenEntity = null;
    var user: UserEntity = null;

    if (
      (lastToken = await this.tokensService.findOneTokenByToken(token)) == null
    )
      throw new UnauthorizedException();
    user = lastToken.user;
    if (
      user.verified ||
      lastToken.status == TokenStatusEnum.USED ||
      lastToken.createdAt.getHours() > 24 ||
      lastToken.type != TokenTypeEnum.CONFIRMATIONEMAIL
    )
      throw new BadRequestException();

    lastToken.status = TokenStatusEnum.USED;
    user.verified = true;
    await this.usersService.updateUser(user);
    await this.tokensService.updateToken(lastToken);
    return {
      success: true,
    };
  }

  async emailverification(email: string): Promise<{ success: boolean }> {
    var user: UserEntity = null;
    if ((user = await this.usersService.findUserByEmail(email)) == null)
      throw new UnauthorizedException();
    return {
      success: user.verified,
    };
  }
}
