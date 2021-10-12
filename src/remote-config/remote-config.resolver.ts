import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUserArgs } from 'src/user/dto/args/get-user.args';
import { GetLastRemoteConfigArgs } from './dto/args/get-last-remote-config.args';
import { InsertRemoteConfigInput } from './dto/input/insert-remote-config.input';
import { RemoteConfigEntity } from './entities/remote-config.entity';
import { RemoteConfigService } from './remote-config.service';

@Resolver()
export class RemoteConfigResolver {
    constructor(
        private readonly remoteConfigService: RemoteConfigService,
    ) { }

    @Query(() => RemoteConfigEntity, { name: 'lastRemoteConfig', nullable: true })
    // @UseGuards(GqlAuthGuard)
    getLastRemoteConfig(
        @Args() getLastRemoteConfigArgs: GetLastRemoteConfigArgs
    ): Promise<RemoteConfigEntity> {
        return this.remoteConfigService.findLastRemoteConfig(getLastRemoteConfigArgs.type);
    }

    @Mutation(() => RemoteConfigEntity)
    @UseGuards(GqlAuthGuard)
    insertRemoteConfig(
        @Args('remoteConfig') insertRemoteConfigInput: InsertRemoteConfigInput,
    ): Promise<RemoteConfigEntity> {
        return this.remoteConfigService.insertRemoteConfig(
            insertRemoteConfigInput.type,
        );
    }
}
