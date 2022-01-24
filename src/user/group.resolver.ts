import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { title } from 'process';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetGroupArgs } from './dto/args/get-group.args';
import { GroupEntity } from './entities/group.entity';
import { GroupService } from './group.service';

@Resolver()
export class GroupResolver {
  constructor(private readonly groupsService: GroupService) {}

  @Query(() => GroupEntity, { name: 'group', nullable: true })
  @UseGuards(GqlAuthGuard)
  getGroup(@Args() getGroupArgs: GetGroupArgs): Promise<GroupEntity> {
    return this.groupsService.findOneGroupById(getGroupArgs.id);
  }

  @Query(() => [GroupEntity], { name: 'groups', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getGroups(): Promise<GroupEntity[]> {
    return this.groupsService.findAllGroups();
  }

  @Mutation(() => GroupEntity)
  @UseGuards(GqlAuthGuard)
  insertOrUpdateGroup(
    @Args('title') title: string,
  ): Promise<GroupEntity> {
    return this.groupsService.insertOrUpdateGroup(
      new GroupEntity(
        title
      )
    );
  }
}
