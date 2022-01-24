import { TableEntity } from './entities/table.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { SectionService } from './section.service';
import { TableService } from './table.service';
import { SectionEntity } from './entities/section.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { GetIdArgs } from './dto/args/get-id.args';
import { CategoryIconPackageEntity } from './entities/category-icon-package.entity';
import { CategoryIconPackageService } from './category-icon-package.service';
import { InsertOrUpdateCategoryIconPackageInput } from './dto/input/insert-or-update-category-icon-package.input';

@Resolver()
export class CategoryIconPackageResolver {
    constructor(
      private readonly categoryIconPackageService: CategoryIconPackageService,
      ) {}

  @Query(() => CategoryIconPackageEntity, { name: 'categoryIconPackage', nullable: true })
  @UseGuards(GqlAuthGuard)
  getCategoryIconPackage(@Args() getCategoryIconPackageArgs: GetIdArgs): Promise<CategoryIconPackageEntity> {
    return this.categoryIconPackageService.findOneCategoryIconPackageById(getCategoryIconPackageArgs.id);
  }

  @Query(() => [CategoryIconPackageEntity], { name: 'categoryIconPackage', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getCategoryIconPackages(): Promise<CategoryIconPackageEntity[]> {
    return this.categoryIconPackageService.findAllCategories();
  }

  @Query(() => [CategoryIconPackageEntity], { name: 'currentCategories', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getCurrentCategoryIconPackages(
    @CurrentUser() user: UserEntity,
  ): Promise<CategoryIconPackageEntity[]> {
    return this.categoryIconPackageService.findAllCategoriesByUserId(user.id);
  }

  @Mutation(() => CategoryIconPackageEntity)
  @UseGuards(GqlAuthGuard)
  async insertOrUpdateCategoryIconPackage(
    @CurrentUser() user: UserEntity,
    @Args('categoryIconPackage') insertOrUpdateCategoryIconPackageInput: InsertOrUpdateCategoryIconPackageInput,
  ): Promise<CategoryIconPackageEntity> {
    var categoryIconPackage: CategoryIconPackageEntity = await this.categoryIconPackageService.insertOrUpdateCategoryIconPackage(
      new CategoryIconPackageEntity(),
    );
    return categoryIconPackage;
  }
}
