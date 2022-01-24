import { UserEntity } from '../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryIconPackageEntity } from './entities/category-icon-package.entity';

@Injectable()
export class CategoryIconPackageService {
    constructor(
        @InjectRepository(CategoryIconPackageEntity)
        private categoryIconPackageRepository: Repository<CategoryIconPackageEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
      ) {}

    findAllCategories(): Promise<CategoryIconPackageEntity[]> {
        return this.categoryIconPackageRepository.find({relations: []});
    }

    findAllCategoriesByIds(ids: number[]): Promise<CategoryIconPackageEntity[]> {
    return this.categoryIconPackageRepository.find({ where: { id: ids }, relations: [] });
    }

    async findAllCategoriesByUserId(userId: number): Promise<CategoryIconPackageEntity[]> {
        var user = await this.usersRepository.findOne(userId);
        return this.categoryIconPackageRepository.find({where: {user}, relations: []});
    }

    findOneCategoryIconPackageById(id: number): Promise<CategoryIconPackageEntity> {
    return this.categoryIconPackageRepository.findOne(id, {relations: []});
    }

    async insertOrUpdateCategoryIconPackage(newCategoryIconPackage: CategoryIconPackageEntity): Promise<CategoryIconPackageEntity> {
        return this.categoryIconPackageRepository.save(newCategoryIconPackage);
    }

    async deleteCategoryIconPackage(id: string): Promise<void> {
    await this.categoryIconPackageRepository.softDelete(id);
    }

    async recoverCategoryIconPackage(id: string): Promise<void> {
    var categoryIconPackage = await this.categoryIconPackageRepository.findOne(id);
    await this.categoryIconPackageRepository.recover(categoryIconPackage);
    }
}
