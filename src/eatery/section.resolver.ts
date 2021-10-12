import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { SectionEntity } from './entities/section.entity';
import { SectionService } from './section.service';

@Resolver()
export class SectionResolver {
    constructor(private readonly sectionsService: SectionService) { }

    // @Query(() => SectionEntity, { name: 'eateryType', nullable: true })
    // @UseGuards(GqlAuthGuard)
    // getSection(@Args() getSectionArgs: GetSectionArgs): Promise<SectionEntity> {
    //     return this.eateryTypesService.findOneSectionById(getSectionArgs.id);
    // }

    @Query(() => [SectionEntity], { name: 'sections', nullable: true })
    @UseGuards(GqlAuthGuard)
    async getSections(): Promise<SectionEntity[]> {
        return this.sectionsService.findAllSections();
    }
}
