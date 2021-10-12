import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { RecordEntity } from './entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity)
    private recordsRepository: Repository<RecordEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAllRecordsByIds(ids: number[]): Promise<RecordEntity[]> {
    return this.recordsRepository.find({
      where: { id: ids },
      relations: ['user'],
    });
  }

  findAllRecordsByUser(user: UserEntity): Promise<RecordEntity[]> {
    return this.recordsRepository.find({
      where: { user: user },
      relations: ['user'],
    });
  }

  findOneRecordById(id: number): Promise<RecordEntity> {
    return this.recordsRepository.findOne(id, { relations: ['user'] });
  }

  async insertOrUpdateRecord(
    userId: number,
    newRecord: RecordEntity,
  ): Promise<RecordEntity> {
    var user = await this.usersRepository.findOne(userId);
    newRecord.user = user;
    return await this.recordsRepository.save(newRecord);
  }

  async deleteRecord(id: string): Promise<void> {
    await this.recordsRepository.softDelete(id);
  }

  async recoverRecord(id: string): Promise<void> {
    var user = await this.recordsRepository.findOne(id);
    await this.recordsRepository.recover(user);
  }
}
