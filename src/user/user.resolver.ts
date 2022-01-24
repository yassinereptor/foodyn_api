import { UpdateManyResponse, Filter } from '@nestjs-query/core';
import {
  FilterType,
  UpdateManyResponseType,
} from '@nestjs-query/query-graphql';
import { Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { type } from 'os';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { ResendConfirmationEmailInput } from './dto/input/resend-confirmation-email.input';
import { UpdateVerifiedUserInput } from './dto/input/update-verified-user.input';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { AppConfigService } from '../app-config/app-config.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ImageEntity } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { MailService } from '../mail/mail.service';
import { RecordEntity } from '../record/entities/record.entity';
import { RecordService } from '../record/record.service';
import { TokenEntity } from '../token/entities/token.entity';
import { TokenService } from '../token/token.service';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { TokenTypeEnum } from 'src/token/types/token-type.enum';
import { UpdateUserInput } from './dto/input/update-user.input';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly usersService: UserService,
    private readonly recordsService: RecordService,
    private readonly tokensService: TokenService,
    private readonly imagesService: ImageService,
    private readonly mailService: MailService,
    private readonly appConfigService: AppConfigService,
  ) {}

  @Query(() => UserEntity, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  getUser(@Args() getUserArgs: GetUserArgs): Promise<UserEntity> {
    return this.usersService.findOneUserById(getUserArgs.id);
  }

  @Query(() => UserEntity, { name: 'currentUser', nullable: true })
  @UseGuards(GqlAuthGuard)
  getCurrentUser(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return this.usersService.findOneUserById(user.id);
  }

  @Query(() => [UserEntity], { name: 'users', nullable: 'items' })
  @UseGuards(GqlAuthGuard)
  getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<UserEntity[]> {
    return this.usersService.findAllUsersByIds(getUsersArgs.ids);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async resendConfirmationEmail(
    @Args('email') email: string,
  ): Promise<Boolean> {
    var user: UserEntity = null;
    if ((user = await this.usersService.findUserByEmail(email)) == null)
      throw new UnauthorizedException();

    const token = uuidv4();
    this.tokensService.insertToken(
      user.id,
      token,
      TokenTypeEnum.CONFIRMATIONEMAIL,
    );
    const link =
      this.appConfigService.server.link + 'auth/confirmation/' + token;
    this.mailService.sendUserConfirmation(user, link);
    return true;
  }

  @Mutation(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async updateVerifiedUser(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<UserEntity> {
    var user = await this.usersService.findOneUserById(id);
    user.verified = true;
    return this.usersService.updateUser(user);
  }

  @Mutation(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @CurrentUser() user: UserEntity,
    @Args('user') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return this.usersService.updateUserById(
      user.id,
      new UserEntity(
        updateUserInput.id,
        updateUserInput.fullname,
        updateUserInput.username,
        updateUserInput.adresse,
        updateUserInput.dialCode,
        updateUserInput.phoneNumber,
        updateUserInput.country,
        updateUserInput.city,
        updateUserInput.gender,
        updateUserInput.posLat,
        updateUserInput.posLng,
      ),
    );
  }

  @ResolveField(() => [RecordEntity])
  records(@Parent() user: UserEntity) {
    return this.recordsService.findAllRecordsByUser(user);
  }

  @ResolveField(() => [TokenEntity])
  tokens(@Parent() user: UserEntity) {
    return this.tokensService.findAllTokensByUser(user);
  }

  @ResolveField(() => [ImageEntity])
  images(@Parent() user: UserEntity) {
    return this.imagesService.findAllImagesByUser(user);
  }
}
