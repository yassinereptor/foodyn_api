import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoteConfigEntity } from './entities/remote-config.entity';

@Injectable()
export class RemoteConfigService {
    constructor(
        @InjectRepository(RemoteConfigEntity)
        private remoteConfigsRepository: Repository<RemoteConfigEntity>,
      ) {}
    
      findAllRemoteConfigsByIds(ids: number[]): Promise<RemoteConfigEntity[]> {
        return this.remoteConfigsRepository.find({
          where: { id: ids },
        });
      }
    
      findOneRemoteConfigById(id: number): Promise<RemoteConfigEntity> {
        return this.remoteConfigsRepository.findOne(id, {
        });
      }
    
      findLastRemoteConfig(type: number): Promise<RemoteConfigEntity> {
        return this.remoteConfigsRepository.findOne({where: {type}, order: { id: 'DESC' }});
      }
    
      insertRemoteConfig(
          type: number
      ): Promise<RemoteConfigEntity> {
        const newRemoteConfig = this.remoteConfigsRepository.create({type });
        return this.remoteConfigsRepository.save(newRemoteConfig);
      }
    
      async deleteRemoteConfig(id: string): Promise<void> {
        await this.remoteConfigsRepository.softDelete(id);
      }
    
      async recoverRemoteConfig(id: string): Promise<void> {
        var remoteConfig = await this.remoteConfigsRepository.findOne(id);
        await this.remoteConfigsRepository.recover(remoteConfig);
      }
}
