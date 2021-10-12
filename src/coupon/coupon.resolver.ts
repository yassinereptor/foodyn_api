import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CouponService } from './coupon.service';
import { GetCouponArgs } from './dto/args/get-coupon.args';
import { InsertOrUpdateCouponInput } from './dto/input/insert-or-update-coupon.input';
import { CouponEntity } from './entities/coupon.entity';

@Resolver()
export class CouponResolver {
  constructor(private readonly couponsService: CouponService) {}

  @Query(() => CouponEntity, { name: 'coupon', nullable: true })
  @UseGuards(GqlAuthGuard)
  getCoupon(@Args() getCouponArgs: GetCouponArgs): Promise<CouponEntity> {
    return this.couponsService.findOneCouponById(getCouponArgs.id);
  }

  @Query(() => [CouponEntity], { name: 'coupons', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getCoupons(): Promise<CouponEntity[]> {
    return this.couponsService.findAllCoupons();
  }

  @Mutation(() => CouponEntity)
  @UseGuards(GqlAuthGuard)
  insertOrUpdateCoupon(
    @Args('coupon') insertOrUpdateCouponInput: InsertOrUpdateCouponInput,
  ): Promise<CouponEntity> {
    return this.couponsService.insertOrUpdateCoupon(
      new CouponEntity(
        insertOrUpdateCouponInput.id,
        insertOrUpdateCouponInput.code,
        insertOrUpdateCouponInput.quantity,
        insertOrUpdateCouponInput.used,
        insertOrUpdateCouponInput.reduction,
        insertOrUpdateCouponInput.endAt,
      ),
    );
  }

  @Mutation(() => CouponEntity, { nullable: true })
  @UseGuards(GqlAuthGuard)
  checkCouponStatusEnum(@Args('code') code: string): Promise<CouponEntity> {
    return this.couponsService.findOneCouponByCode(code);
  }
}
