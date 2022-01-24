import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { title } from 'process';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetRuleArgs } from './dto/args/get-rule.args';
import { RuleEntity } from './entities/rule.entity';
import { RuleService } from './rule.service';

@Resolver()
export class RuleResolver {
  constructor(private readonly rulesService: RuleService) {}

  @Query(() => RuleEntity, { name: 'rule', nullable: true })
  @UseGuards(GqlAuthGuard)
  getRule(@Args() getRuleArgs: GetRuleArgs): Promise<RuleEntity> {
    return this.rulesService.findOneRuleById(getRuleArgs.id);
  }

  @Query(() => [RuleEntity], { name: 'rules', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getRules(): Promise<RuleEntity[]> {
    return this.rulesService.findAllRules();
  }

  @Mutation(() => RuleEntity)
  @UseGuards(GqlAuthGuard)
  insertOrUpdateRule(
    @Args('title') title: string,
  ): Promise<RuleEntity> {
    return this.rulesService.insertOrUpdateRule(
      new RuleEntity(
        title
      )
    );
  }
}
