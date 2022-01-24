import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { MenuPresetEntity } from './entities/menu-preset.entity';
import { MenuPresetService } from './menu-preset.service';

@Resolver()
export class MenuPresetResolver {
    constructor(private readonly menuPresetsService: MenuPresetService) { }

    @Query(() => [MenuPresetEntity], { name: 'menuPresets', nullable: true })
    @UseGuards(GqlAuthGuard)
    async getMenuPresets(): Promise<MenuPresetEntity[]> {
        return this.menuPresetsService.findAllMenuPresets();
    }
}
