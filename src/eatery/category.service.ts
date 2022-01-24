import { UserEntity } from '../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoriesRepository: Repository<CategoryEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
      ) {}

    findAllCategories(): Promise<CategoryEntity[]> {
        return this.categoriesRepository.find({relations: ['user']});
    }

    findAllCategoriesByIds(ids: number[]): Promise<CategoryEntity[]> {
    return this.categoriesRepository.find({ where: { id: ids }, relations: ['user'] });
    }

    async findAllCategoriesByUserId(userId: number): Promise<CategoryEntity[]> {
        var user = await this.usersRepository.findOne(userId);
        return this.categoriesRepository.find({where: {user}, relations: ['user']});
    }

    findOneCategoryById(id: number): Promise<CategoryEntity> {
    return this.categoriesRepository.findOne(id, {relations: ['user']});
    }

    async insertOrUpdateCategory(userId : number, newCategory: CategoryEntity): Promise<CategoryEntity> {
        var user = await this.usersRepository.findOne(userId);
        newCategory.user = user;
        return this.categoriesRepository.save(newCategory);
    }

    async deleteCategory(id: string): Promise<void> {
    await this.categoriesRepository.softDelete(id);
    }

    async recoverCategory(id: string): Promise<void> {
    var category = await this.categoriesRepository.findOne(id);
    await this.categoriesRepository.recover(category);
    }
}
