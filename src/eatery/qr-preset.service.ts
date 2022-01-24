import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrPresetEntity } from './entities/qr-preset.entity';

@Injectable()
export class QrPresetService {
    constructor(
        @InjectRepository(QrPresetEntity)
        private qrPresetsRepository: Repository<QrPresetEntity>,
      ) {}

    findAllQrPresets(): Promise<QrPresetEntity[]> {
        return this.qrPresetsRepository.find({relations: []});
    }

    findAllQrPresetsByIds(ids: number[]): Promise<QrPresetEntity[]> {
    return this.qrPresetsRepository.find({ where: { id: ids }, relations: [] });
    }

    findOneQrPresetById(id: number): Promise<QrPresetEntity> {
    return this.qrPresetsRepository.findOne(id, {relations: []});
    }

    async insertOrUpdateQrPreset(newQrPreset: QrPresetEntity): Promise<QrPresetEntity> {
    return this.qrPresetsRepository.save(newQrPreset);
    }

    async deleteQrPreset(id: string): Promise<void> {
    await this.qrPresetsRepository.softDelete(id);
    }

    async recoverQrPreset(id: string): Promise<void> {
    var qrPreset = await this.qrPresetsRepository.findOne(id);
    await this.qrPresetsRepository.recover(qrPreset);
    }
}
