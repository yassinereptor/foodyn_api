import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../membership/entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentsRepository: Repository<PaymentEntity>,
  ) {}

  findAllPayments(): Promise<PaymentEntity[]> {
    return this.paymentsRepository.find();
  }

  findAllPaymentsByIds(ids: number[]): Promise<PaymentEntity[]> {
    return this.paymentsRepository.find({ where: { id: ids } });
  }

  findOnePaymentById(id: number): Promise<PaymentEntity> {
    return this.paymentsRepository.findOne(id);
  }

  async insertOrUpdatePayment(
    newPayment: PaymentEntity,
  ): Promise<PaymentEntity> {
    return this.paymentsRepository.save(newPayment);
  }

  async deletePayment(id: string): Promise<void> {
    await this.paymentsRepository.softDelete(id);
  }

  async recoverPayment(id: string): Promise<void> {
    var payment = await this.paymentsRepository.findOne(id);
    await this.paymentsRepository.recover(payment);
  }
}
