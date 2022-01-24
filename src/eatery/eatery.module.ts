import { QrPresetEntity } from './entities/qr-preset.entity';
import { QrEntity } from './entities/qr.entity';
import { MenuPresetEntity } from './entities/menu-preset.entity';
import { MenuEntity } from './entities/menu.entity';
import { FoodEntity } from 'src/eatery/entities/food.entity';
import { CategoryEntity } from './entities/category.entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EateryResolver } from './eatery.resolver';
import { EateryService } from './eatery.service';
import { EateryEntity } from './entities/eatery.entity';
import { SectionEntity } from './entities/section.entity';
import { TableEntity } from './entities/table.entity';
import { SectionResolver } from './section.resolver';
import { SectionService } from './section.service';
import { TableResolver } from './table.resolver';
import { TableService } from './table.service';
import { EateryTypeEntity } from './entities/eatery-type.entity';
import { EateryTypeResolver } from './eatery-type.resolver';
import { EateryTypeService } from './eatery-type.service';
import { UserModule } from 'src/user/user.module';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';
import { MenuPresetResolver } from './menu-preset.resolver';
import { MenuPresetService } from './menu-preset.service';
import { MenuResolver } from './menu.resolver';
import { MenuService } from './menu.service';
import { QrPresetResolver } from './qr-preset.resolver';
import { QrPresetService } from './qr-preset.service';
import { QrResolver } from './qr.resolver';
import { QrService } from './qr.service';
import { CategoryIconPackageEntity } from './entities/category-icon-package.entity';
import { CategoryIconPackageResolver } from './category-icon-package.resolver';
import { CategoryIconPackageService } from './category-icon-package.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EateryEntity, SectionEntity, TableEntity, EateryTypeEntity, 
      CategoryEntity, CategoryIconPackageEntity, FoodEntity, MenuEntity, MenuPresetEntity, QrEntity, QrPresetEntity
    ]),
    forwardRef(() => UserModule)
  ],
  providers: [EateryResolver, SectionResolver, TableResolver, EateryTypeResolver, 
    CategoryResolver, CategoryIconPackageResolver, FoodResolver, MenuResolver, MenuPresetResolver, QrResolver, QrPresetResolver,
     EateryService, SectionService, TableService, EateryTypeService,
     CategoryService, CategoryIconPackageService, FoodService, MenuService, MenuPresetService, QrService, QrPresetService],
  exports: [EateryService, SectionService, TableService, EateryTypeService, 
    CategoryService, CategoryIconPackageService, FoodService, MenuService, MenuPresetService, QrService, QrPresetService,
    TypeOrmModule],
})
export class EateryModule { }
