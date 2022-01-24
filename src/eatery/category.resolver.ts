import { TableEntity } from './entities/table.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CategoryEntity } from './entities/category.entity';
import { SectionService } from './section.service';
import { TableService } from './table.service';
import { SectionEntity } from './entities/section.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CategoryService } from './category.service';
import { InsertOrUpdateCategoryInput } from './dto/input/insert-or-update-category.input';
import { GetIdArgs } from './dto/args/get-id.args';

@Resolver()
export class CategoryResolver {
    constructor(
      private readonly categoriesService: CategoryService,
      ) {}

  @Query(() => CategoryEntity, { name: 'category', nullable: true })
  @UseGuards(GqlAuthGuard)
  getCategory(@Args() getCategoryArgs: GetIdArgs): Promise<CategoryEntity> {
    return this.categoriesService.findOneCategoryById(getCategoryArgs.id);
  }

  @Query(() => [CategoryEntity], { name: 'categories', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getCategorys(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAllCategories();
  }

  @Query(() => [CategoryEntity], { name: 'currentCategories', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getCurrentCategorys(
    @CurrentUser() user: UserEntity,
  ): Promise<CategoryEntity[]> {
    return this.categoriesService.findAllCategoriesByUserId(user.id);
  }

  @Mutation(() => CategoryEntity)
  @UseGuards(GqlAuthGuard)
  async insertOrUpdateCategory(
    @CurrentUser() user: UserEntity,
    @Args('category') insertOrUpdateCategoryInput: InsertOrUpdateCategoryInput,
  ): Promise<CategoryEntity> {
    var category: CategoryEntity = await this.categoriesService.insertOrUpdateCategory(
      user.id,
      new CategoryEntity(),
    );
    return category;
  }
}
