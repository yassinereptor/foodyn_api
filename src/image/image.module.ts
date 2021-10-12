import { forwardRef, Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { ImageController } from './image.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';
import { EateryModule } from 'src/eatery/eatery.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => ProfileModule),
    forwardRef(() => EateryModule),
  ],
  providers: [ImageService, ImageResolver],
  exports: [ImageService, TypeOrmModule],
  controllers: [ImageController],
})
export class ImageModule {}
