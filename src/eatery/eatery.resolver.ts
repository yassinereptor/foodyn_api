import { TableEntity } from './entities/table.entity';
import { EateryTypeEntity } from './entities/eatery-type.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetEateryArgs } from './dto/args/get-eatery.args';
import { InsertOrUpdateEateryInput } from './dto/input/insert-or-update-eatery.input';
import { EateryService } from './eatery.service';
import { EateryEntity } from './entities/eatery.entity';
import { EateryTypeService } from './eatery-type.service';
import { SectionService } from './section.service';
import { TableService } from './table.service';
import { SectionEntity } from './entities/section.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Resolver()
export class EateryResolver {
    constructor(
      private readonly eateriesService: EateryService,
      private readonly eateryTypesService: EateryTypeService,
      private readonly sectionService: SectionService,
      private readonly tableService: TableService,
      ) {}

  @Query(() => EateryEntity, { name: 'eatery', nullable: true })
  @UseGuards(GqlAuthGuard)
  getEatery(@Args() getEateryArgs: GetEateryArgs): Promise<EateryEntity> {
    return this.eateriesService.findOneEateryById(getEateryArgs.id);
  }

  @Query(() => [EateryEntity], { name: 'eateries', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getEaterys(): Promise<EateryEntity[]> {
    return this.eateriesService.findAllEateries();
  }

  @Query(() => [EateryEntity], { name: 'currentEateries', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getCurrentEaterys(
    @CurrentUser() user: UserEntity,
  ): Promise<EateryEntity[]> {
    return this.eateriesService.findAllEateriesByUserId(user.id);
  }

  @Mutation(() => EateryEntity)
  @UseGuards(GqlAuthGuard)
  async insertOrUpdateEatery(
    @CurrentUser() user: UserEntity,
    @Args('eatery') insertOrUpdateEateryInput: InsertOrUpdateEateryInput,
  ): Promise<EateryEntity> {
    var eatery: EateryEntity = await this.eateriesService.insertOrUpdateEatery(
      user.id,
      new EateryEntity(
        insertOrUpdateEateryInput.id,
        insertOrUpdateEateryInput.title,
        insertOrUpdateEateryInput.description,
        insertOrUpdateEateryInput.adresse,
        insertOrUpdateEateryInput.dialCode,
        insertOrUpdateEateryInput.phoneNumber,
        insertOrUpdateEateryInput.country,
        insertOrUpdateEateryInput.city,
        insertOrUpdateEateryInput.zipCode,
        insertOrUpdateEateryInput.posLat,
        insertOrUpdateEateryInput.posLng,
      ),
    );
    if (insertOrUpdateEateryInput.eateryTypes && insertOrUpdateEateryInput.eateryTypes.length > 0)
      await this.eateryTypesService.insertEateryTypesToEatery(insertOrUpdateEateryInput.eateryTypes.map(e => e.id), eatery);
    if (insertOrUpdateEateryInput.sections && insertOrUpdateEateryInput.sections.length > 0) {
      insertOrUpdateEateryInput.sections.forEach(async (e) => {
        var section = await this.sectionService.insertOrUpdateSection(new SectionEntity(
          e.id, 
          eatery,
          e.title,
          e.rows,
          e.columns
        ));
        console.log(e);
        if (e.tables && e.tables.length > 0)
          await this.tableService.insertTablesToSection(e.tables.map(e => new TableEntity(
            e.id,
            e.number,
            e.row,
            e.column,
          )), section);
      });
    }
    return eatery;
  }
}
