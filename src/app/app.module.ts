import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';
import { AuthModule } from 'src/auth/auth.module';
import { CouponModule } from 'src/coupon/coupon.module';
import { ImageModule } from 'src/image/image.module';
import { MailModule } from 'src/mail/mail.module';
import { MembershipModule } from 'src/membership/membership.module';
import { RecordModule } from 'src/record/record.module';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { EateryModule } from 'src/eatery/eatery.module';
import { RemoteConfigModule } from 'src/remote-config/remote-config.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'public'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) =>
        appConfigService.database,
      inject: [AppConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      cors: {
        origin: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
        credentials: true,
      },
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: join(__dirname, '..', '..', '..', 'upload'),
      }),
    }),
    UserModule,
    AuthModule,
    MailModule,
    AppConfigModule,
    TokenModule,
    RecordModule,
    ImageModule,
    MembershipModule,
    CouponModule,
    EateryModule,
    RemoteConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
