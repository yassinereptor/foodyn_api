import { RuleEntity } from './entities/rule.entity';
import { GroupEntity } from './entities/group.entity';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config/app-config.module';
import { ImageModule } from '../image/image.module';
import { MailModule } from '../mail/mail.module';
import { RecordModule } from '../record/record.module';
import { TokenModule } from '../token/token.module';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { RuleResolver } from './rule.resolver';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { RuleService } from './rule.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, GroupEntity, RuleEntity]),
    forwardRef(() => TokenModule),
    forwardRef(() => RecordModule),
    forwardRef(() => ImageModule),
    MailModule,
    AppConfigModule,
  ],
  providers: [UserResolver, UserService, GroupResolver, GroupService, RuleResolver, RuleService],
  exports: [UserService, GroupService, RuleService, TypeOrmModule],
})
export class UserModule {}
