import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from './entities/food.entity';

@Injectable()
export class FoodService {
    constructor(
        @InjectRepository(FoodEntity)
        private foodsRepository: Repository<FoodEntity>,
      ) {}

    findAllFoods(): Promise<FoodEntity[]> {
        return this.foodsRepository.find({relations: []});
    }

    findAllFoodsByIds(ids: number[]): Promise<FoodEntity[]> {
    return this.foodsRepository.find({ where: { id: ids }, relations: [] });
    }

    findOneFoodById(id: number): Promise<FoodEntity> {
    return this.foodsRepository.findOne(id, {relations: []});
    }

    async insertOrUpdateFood(newFood: FoodEntity): Promise<FoodEntity> {
    return this.foodsRepository.save(newFood);
    }

    async deleteFood(id: string): Promise<void> {
    await this.foodsRepository.softDelete(id);
    }

    async recoverFood(id: string): Promise<void> {
    var food = await this.foodsRepository.findOne(id);
    await this.foodsRepository.recover(food);
    }
}
