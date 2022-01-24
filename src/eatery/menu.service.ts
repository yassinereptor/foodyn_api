import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from './entities/menu.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(MenuEntity)
        private menusRepository: Repository<MenuEntity>,
      ) {}

    findAllMenus(): Promise<MenuEntity[]> {
        return this.menusRepository.find({relations: []});
    }

    findAllMenusByIds(ids: number[]): Promise<MenuEntity[]> {
    return this.menusRepository.find({ where: { id: ids }, relations: [] });
    }

    findOneMenuById(id: number): Promise<MenuEntity> {
    return this.menusRepository.findOne(id, {relations: []});
    }

    async insertOrUpdateMenu(newMenu: MenuEntity): Promise<MenuEntity> {
    return this.menusRepository.save(newMenu);
    }

    async deleteMenu(id: string): Promise<void> {
    await this.menusRepository.softDelete(id);
    }

    async recoverMenu(id: string): Promise<void> {
    var menu = await this.menusRepository.findOne(id);
    await this.menusRepository.recover(menu);
    }
}
