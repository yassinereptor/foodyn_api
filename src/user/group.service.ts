import { EateryEntity } from 'src/eatery/entities/eatery.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GroupEntity } from './entities/group.entity';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(GroupEntity)
        private groupsRepository: Repository<GroupEntity>,
      ) {}

    findAllGroups(): Promise<GroupEntity[]> {
        return this.groupsRepository.find({relations: ["eateries"]});
    }

    findAllGroupsByIds(ids: number[]): Promise<GroupEntity[]> {
    return this.groupsRepository.find({ where: { id: ids } });
    }

    findOneGroupById(id: number): Promise<GroupEntity> {
    return this.groupsRepository.findOne(id, );
    }

    async insertOrUpdateGroup(newGroup: GroupEntity): Promise<GroupEntity> {
    return this.groupsRepository.save(newGroup);
    }

    async deleteGroup(id: string): Promise<void> {
    await this.groupsRepository.softDelete(id);
    }

    async recoverGroup(id: string): Promise<void> {
    var eatery = await this.groupsRepository.findOne(id);
    await this.groupsRepository.recover(eatery);
    }
}
