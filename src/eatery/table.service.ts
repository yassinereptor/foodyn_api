import { SectionEntity } from './entities/section.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from './entities/table.entity';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(TableEntity)
        private tablesRepository: Repository<TableEntity>,
      ) {}

    findAllTables(): Promise<TableEntity[]> {
        return this.tablesRepository.find({relations: ['section']});
    }

    findAllTablesByIds(ids: number[]): Promise<TableEntity[]> {
    return this.tablesRepository.find({ where: { id: ids }, relations: ['section'] });
    }

    findOneTableById(id: number): Promise<TableEntity> {
    return this.tablesRepository.findOne(id, {relations: ['section']});
    }

    async insertOrUpdateTable(newTable: TableEntity): Promise<TableEntity> {
    return this.tablesRepository.save(newTable);
    }

    async insertTablesToSection(tables: TableEntity[], section: SectionEntity): Promise<TableEntity[]> {
        tables.forEach((e) => {
            e.section = section;
        });
        return this.tablesRepository.save(tables);
    }

    async deleteTable(id: string): Promise<void> {
    await this.tablesRepository.softDelete(id);
    }

    async recoverTable(id: string): Promise<void> {
    var table = await this.tablesRepository.findOne(id);
    await this.tablesRepository.recover(table);
    }
}
