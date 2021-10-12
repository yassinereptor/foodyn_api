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

@Module({
  imports: [
    TypeOrmModule.forFeature([EateryEntity, SectionEntity, TableEntity, EateryTypeEntity]),
    forwardRef(() => UserModule)
  ],
  providers: [EateryResolver, SectionResolver, TableResolver, EateryTypeResolver, EateryService, SectionService, TableService, EateryTypeService],
  exports: [EateryService, SectionService, TableService, EateryTypeService, TypeOrmModule],
})
export class EateryModule {}
