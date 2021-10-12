import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponEntity } from './entities/coupon.entity';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(CouponEntity)
    private couponsRepository: Repository<CouponEntity>,
  ) {}

  findAllCoupons(): Promise<CouponEntity[]> {
    return this.couponsRepository.find({relations: ['memberships']});
  }

  findAllCouponsByIds(ids: number[]): Promise<CouponEntity[]> {
    return this.couponsRepository.find({ where: { id: ids }, relations: ['memberships'] });
  }

  findOneCouponById(id: number): Promise<CouponEntity> {
    return this.couponsRepository.findOne(id, {relations: ['memberships']});
  }

  findOneCouponByCode(code: string): Promise<CouponEntity> {
    return this.couponsRepository.findOne({ where: {code}, relations: ['memberships'] });
  }

  async insertOrUpdateCoupon(newCoupon: CouponEntity): Promise<CouponEntity> {
    return this.couponsRepository.save(newCoupon);
  }

  async deleteCoupon(id: string): Promise<void> {
    await this.couponsRepository.softDelete(id);
  }

  async recoverCoupon(id: string): Promise<void> {
    var coupon = await this.couponsRepository.findOne(id);
    await this.couponsRepository.recover(coupon);
  }
}
