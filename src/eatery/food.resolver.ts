import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { FoodEntity } from './entities/food.entity';
import { FoodService } from './food.service';

@Resolver()
export class FoodResolver {
    constructor(private readonly foodsService: FoodService) { }

    // @Query(() => FoodEntity, { name: 'eateryType', nullable: true })
    // @UseGuards(GqlAuthGuard)
    // getFood(@Args() getFoodArgs: GetFoodArgs): Promise<FoodEntity> {
    //     return this.eateryTypesService.findOneFoodById(getFoodArgs.id);
    // }

    @Query(() => [FoodEntity], { name: 'foods', nullable: true })
    @UseGuards(GqlAuthGuard)
    async getFoods(): Promise<FoodEntity[]> {
        return this.foodsService.findAllFoods();
    }
}
