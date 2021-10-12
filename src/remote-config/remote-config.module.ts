import { Module } from '@nestjs/common';
import { RemoteConfigService } from './remote-config.service';
import { RemoteConfigResolver } from './remote-config.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemoteConfigEntity } from './entities/remote-config.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RemoteConfigEntity]),
  ],
  providers: [RemoteConfigService, RemoteConfigResolver],
  exports: [RemoteConfigService, TypeOrmModule],
})
export class RemoteConfigModule {}
