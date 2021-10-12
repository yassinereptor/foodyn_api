import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TokenEntity } from './entities/token.entity';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [TokenService],
  exports: [TokenService, TypeOrmModule],
})
export class TokenModule {}
