import { EateryEntity } from 'src/eatery/entities/eatery.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RuleEntity } from './entities/rule.entity';

@Injectable()
export class RuleService {
    constructor(
        @InjectRepository(RuleEntity)
        private rulesRepository: Repository<RuleEntity>,
      ) {}

    findAllRules(): Promise<RuleEntity[]> {
        return this.rulesRepository.find({relations: ["eateries"]});
    }

    findAllRulesByIds(ids: number[]): Promise<RuleEntity[]> {
    return this.rulesRepository.find({ where: { id: ids } });
    }

    findOneRuleById(id: number): Promise<RuleEntity> {
    return this.rulesRepository.findOne(id, );
    }

    async insertOrUpdateRule(newRule: RuleEntity): Promise<RuleEntity> {
    return this.rulesRepository.save(newRule);
    }

    async deleteRule(id: string): Promise<void> {
    await this.rulesRepository.softDelete(id);
    }

    async recoverRule(id: string): Promise<void> {
    var eatery = await this.rulesRepository.findOne(id);
    await this.rulesRepository.recover(eatery);
    }
}
