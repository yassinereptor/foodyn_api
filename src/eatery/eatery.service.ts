import { UserEntity } from './../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EateryEntity } from './entities/eatery.entity';

@Injectable()
export class EateryService {
    constructor(
        @InjectRepository(EateryEntity)
        private eateriesRepository: Repository<EateryEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
      ) {}

    findAllEateries(): Promise<EateryEntity[]> {
        return this.eateriesRepository.find({relations: ['user', "sections", "sections.tables", "images", "eateryTypes"]});
    }

    findAllEateriesByIds(ids: number[]): Promise<EateryEntity[]> {
    return this.eateriesRepository.find({ where: { id: ids }, relations: ['user', "sections", "sections.tables", "images", "eateryTypes"] });
    }

    async findAllEateriesByUserId(userId: number): Promise<EateryEntity[]> {
        var user = await this.usersRepository.findOne(userId);
        return this.eateriesRepository.find({where: {user}, relations: ['user', "sections", "sections.tables", "images", "eateryTypes"]});
    }

    findOneEateryById(id: number): Promise<EateryEntity> {
    return this.eateriesRepository.findOne(id, {relations: ['user', "sections", "sections.tables", "images", "eateryTypes"]});
    }

    async insertOrUpdateEatery(userId : number, newEatery: EateryEntity): Promise<EateryEntity> {
        var user = await this.usersRepository.findOne(userId, {relations: ["profile"]});
        newEatery.user = user;
        return this.eateriesRepository.save(newEatery);
    }

    async deleteEatery(id: string): Promise<void> {
    await this.eateriesRepository.softDelete(id);
    }

    async recoverEatery(id: string): Promise<void> {
    var eatery = await this.eateriesRepository.findOne(id);
    await this.eateriesRepository.recover(eatery);
    }
}
