import { forwardRef, Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipResolver } from './membership.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from './entities/membership.entity';
import { CouponModule } from 'src/coupon/coupon.module';
import { UserModule } from 'src/user/user.module';
import { PlanEntity } from './entities/plan.entity';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { PlanResolver } from './plan.resolver';
import { PlanService } from './plan.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MembershipEntity, PlanEntity, PaymentEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => CouponModule)
  ],
  providers: [MembershipService, PlanService, PaymentService, MembershipResolver, PlanResolver, PaymentResolver],
  exports: [MembershipService, PlanService, PaymentService, TypeOrmModule],
})
export class MembershipModule {}
