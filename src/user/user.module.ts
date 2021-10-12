import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config/app-config.module';
import { ImageModule } from '../image/image.module';
import { MailModule } from '../mail/mail.module';
import { ProfileModule } from '../profile/profile.module';
import { RecordModule } from '../record/record.module';
import { TokenModule } from '../token/token.module';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => TokenModule),
    forwardRef(() => ProfileModule),
    forwardRef(() => RecordModule),
    forwardRef(() => ImageModule),
    MailModule,
    AppConfigModule,
  ],
  providers: [UserResolver, UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
