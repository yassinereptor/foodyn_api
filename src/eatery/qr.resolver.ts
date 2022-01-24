import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { QrEntity } from './entities/qr.entity';
import { QrService } from './qr.service';

@Resolver()
export class QrResolver {
    constructor(private readonly qrsService: QrService) { }

    @Query(() => [QrEntity], { name: 'qrs', nullable: true })
    @UseGuards(GqlAuthGuard)
    async getQrs(): Promise<QrEntity[]> {
        return this.qrsService.findAllQrs();
    }
}
