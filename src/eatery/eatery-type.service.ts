import { EateryEntity } from 'src/eatery/entities/eatery.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { EateryTypeEntity } from './entities/eatery-type.entity';

@Injectable()
export class EateryTypeService {
    constructor(
        @InjectRepository(EateryTypeEntity)
        private eateryTypesRepository: Repository<EateryTypeEntity>,
      ) {}

    findAllEateryTypes(): Promise<EateryTypeEntity[]> {
        return this.eateryTypesRepository.find({relations: ["eateries"]});
    }

    findAllEateryTypesByIds(ids: number[]): Promise<EateryTypeEntity[]> {
    return this.eateryTypesRepository.find({ where: { id: ids } });
    }

    findOneEateryTypeById(id: number): Promise<EateryTypeEntity> {
    return this.eateryTypesRepository.findOne(id, );
    }

    async insertOrUpdateEateryType(newEateryType: EateryTypeEntity): Promise<EateryTypeEntity> {
    return this.eateryTypesRepository.save(newEateryType);
    }

    async insertEateryTypesToEatery(eateryTypeIds: number[], eatery: EateryEntity): Promise<EateryTypeEntity[]> {
        var eateryTypes: EateryTypeEntity[] = await this.eateryTypesRepository.find({where: {id: In(eateryTypeIds)}});
        eateryTypes.forEach((e, index) => {
            e.eateries = [eatery];
        });
        return this.eateryTypesRepository.save(eateryTypes);
    }

    async deleteEateryType(id: string): Promise<void> {
    await this.eateryTypesRepository.softDelete(id);
    }

    async recoverEateryType(id: string): Promise<void> {
    var eatery = await this.eateryTypesRepository.findOne(id);
    await this.eateryTypesRepository.recover(eatery);
    }
}
