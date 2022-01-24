import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { QrPresetEntity } from './entities/qr-preset.entity';
import { QrPresetService } from './qr-preset.service';

@Resolver()
export class QrPresetResolver {
    constructor(private readonly qrPresetsService: QrPresetService) { }

    @Query(() => [QrPresetEntity], { name: 'qrPresets', nullable: true })
    @UseGuards(GqlAuthGuard)
    async getQrPresets(): Promise<QrPresetEntity[]> {
        return this.qrPresetsService.findAllQrPresets();
    }
}
