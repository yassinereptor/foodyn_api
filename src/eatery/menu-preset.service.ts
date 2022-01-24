import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuPresetEntity } from './entities/menu-preset.entity';

@Injectable()
export class MenuPresetService {
    constructor(
        @InjectRepository(MenuPresetEntity)
        private menuPresetsRepository: Repository<MenuPresetEntity>,
      ) {}

    findAllMenuPresets(): Promise<MenuPresetEntity[]> {
        return this.menuPresetsRepository.find({relations: []});
    }

    findAllMenuPresetsByIds(ids: number[]): Promise<MenuPresetEntity[]> {
    return this.menuPresetsRepository.find({ where: { id: ids }, relations: [] });
    }

    findOneMenuPresetById(id: number): Promise<MenuPresetEntity> {
    return this.menuPresetsRepository.findOne(id, {relations: []});
    }

    async insertOrUpdateMenuPreset(newMenuPreset: MenuPresetEntity): Promise<MenuPresetEntity> {
    return this.menuPresetsRepository.save(newMenuPreset);
    }

    async deleteMenuPreset(id: string): Promise<void> {
    await this.menuPresetsRepository.softDelete(id);
    }

    async recoverMenuPreset(id: string): Promise<void> {
    var menuPreset = await this.menuPresetsRepository.findOne(id);
    await this.menuPresetsRepository.recover(menuPreset);
    }
}
