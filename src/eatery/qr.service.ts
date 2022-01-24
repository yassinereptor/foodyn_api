import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrEntity } from './entities/qr.entity';

@Injectable()
export class QrService {
    constructor(
        @InjectRepository(QrEntity)
        private qrsRepository: Repository<QrEntity>,
      ) {}

    findAllQrs(): Promise<QrEntity[]> {
        return this.qrsRepository.find({relations: []});
    }

    findAllQrsByIds(ids: number[]): Promise<QrEntity[]> {
    return this.qrsRepository.find({ where: { id: ids }, relations: [] });
    }

    findOneQrById(id: number): Promise<QrEntity> {
    return this.qrsRepository.findOne(id, {relations: []});
    }

    async insertOrUpdateQr(newQr: QrEntity): Promise<QrEntity> {
    return this.qrsRepository.save(newQr);
    }

    async deleteQr(id: string): Promise<void> {
    await this.qrsRepository.softDelete(id);
    }

    async recoverQr(id: string): Promise<void> {
    var qr = await this.qrsRepository.findOne(id);
    await this.qrsRepository.recover(qr);
    }
}
