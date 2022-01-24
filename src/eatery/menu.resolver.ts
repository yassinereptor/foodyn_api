import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { MenuEntity } from './entities/menu.entity';
import { MenuService } from './menu.service';

@Resolver()
export class MenuResolver {
    constructor(private readonly menusService: MenuService) { }

    @Query(() => [MenuEntity], { name: 'menus', nullable: true })
    @UseGuards(GqlAuthGuard)
    async getMenus(): Promise<MenuEntity[]> {
        return this.menusService.findAllMenus();
    }
}
