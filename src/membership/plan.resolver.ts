import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetPlanArgs } from './dto/args/get-plan.args';
import { InsertOrUpdatePlanInput } from './dto/input/insert-or-update-plan.input';
import { PlanEntity } from './entities/plan.entity';
import { PlanService } from './plan.service';

@Resolver()
export class PlanResolver {
  constructor(private readonly plansService: PlanService) {}

  @Query(() => PlanEntity, { name: 'plan', nullable: true })
  @UseGuards(GqlAuthGuard)
  getPlan(@Args() getPlanArgs: GetPlanArgs): Promise<PlanEntity> {
    return this.plansService.findOnePlanById(getPlanArgs.id);
  }

  @Query(() => [PlanEntity], { name: 'plans', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getPlans(): Promise<PlanEntity[]> {
    return this.plansService.findAllPlans();
  }

  @Mutation(() => PlanEntity)
  @UseGuards(GqlAuthGuard)
  insertOrUpdatePlan(
    @Args('plan') insertOrUpdatePlanInput: InsertOrUpdatePlanInput,
  ): Promise<PlanEntity> {
    return this.plansService.insertOrUpdatePlan(
      new PlanEntity(
        insertOrUpdatePlanInput.id,
        insertOrUpdatePlanInput.title,
        insertOrUpdatePlanInput.description,
        insertOrUpdatePlanInput.monthPrice,
        insertOrUpdatePlanInput.yearPrice,
        insertOrUpdatePlanInput.primaryColor,
        insertOrUpdatePlanInput.accentColor,
        insertOrUpdatePlanInput.textColor,
        insertOrUpdatePlanInput.recommended,
        insertOrUpdatePlanInput.special,
        insertOrUpdatePlanInput.endAt,
      ),
    );
  }
}
