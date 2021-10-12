import { forwardRef, Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordResolver } from './record.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEntity } from './entities/record.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecordEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [RecordResolver, RecordService],
  exports: [RecordService, TypeOrmModule],
})
export class RecordModule {}
