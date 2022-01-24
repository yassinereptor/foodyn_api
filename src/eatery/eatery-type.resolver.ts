import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { title } from 'process';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetIdArgs } from './dto/args/get-id.args';
import { InsertOrUpdateEateryTypeInput } from './dto/input/insert-or-update-eatery-type.input';
import { EateryTypeService } from './eatery-type.service';
import { EateryTypeEntity } from './entities/eatery-type.entity';

@Resolver()
export class EateryTypeResolver {
  constructor(private readonly eateryTypesService: EateryTypeService) {}

  @Query(() => EateryTypeEntity, { name: 'eateryType', nullable: true })
  @UseGuards(GqlAuthGuard)
  getEateryType(@Args() getEateryTypeArgs: GetIdArgs): Promise<EateryTypeEntity> {
    return this.eateryTypesService.findOneEateryTypeById(getEateryTypeArgs.id);
  }

  @Query(() => [EateryTypeEntity], { name: 'eateryTypes', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getEateryTypes(): Promise<EateryTypeEntity[]> {
    return this.eateryTypesService.findAllEateryTypes();
  }

  @Mutation(() => EateryTypeEntity)
  @UseGuards(GqlAuthGuard)
  insertOrUpdateEateryType(
    @Args('title') title: string,
  ): Promise<EateryTypeEntity> {
    return this.eateryTypesService.insertOrUpdateEateryType(
      new EateryTypeEntity(
        title
      )
    );
  }
}
