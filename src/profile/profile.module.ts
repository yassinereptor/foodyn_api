import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService, TypeOrmModule],
})
export class ProfileModule {}
