import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SectionEntity } from './entities/section.entity';

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(SectionEntity)
        private sectionsRepository: Repository<SectionEntity>,
      ) {}

    findAllSections(): Promise<SectionEntity[]> {
        return this.sectionsRepository.find({relations: ['eatery', 'tables']});
    }

    findAllSectionsByIds(ids: number[]): Promise<SectionEntity[]> {
    return this.sectionsRepository.find({ where: { id: ids }, relations: ['eatery', 'tables'] });
    }

    findOneSectionById(id: number): Promise<SectionEntity> {
    return this.sectionsRepository.findOne(id, {relations: ['eatery', 'tables']});
    }

    async insertOrUpdateSection(newSection: SectionEntity): Promise<SectionEntity> {
    return this.sectionsRepository.save(newSection);
    }

    async deleteSection(id: string): Promise<void> {
    await this.sectionsRepository.softDelete(id);
    }

    async recoverSection(id: string): Promise<void> {
    var section = await this.sectionsRepository.findOne(id);
    await this.sectionsRepository.recover(section);
    }
}
