import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CouponService } from 'src/coupon/coupon.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { GetMembershipArgs } from './dto/args/get-membership.args';
import { InsertOrUpdateMembershipInput } from './dto/input/insert-or-update-membership.input';
import { MembershipEntity } from './entities/membership.entity';
import { MembershipService } from './membership.service';
import { PlanService } from './plan.service';

@Resolver()
export class MembershipResolver {
    constructor(
        private readonly membershipsService: MembershipService,
        private readonly usersService: UserService,
        private readonly plansService: PlanService,
        private readonly couponsService: CouponService,
        ) { }

    @Query(() => MembershipEntity, { name: 'membership', nullable: true })
    @UseGuards(GqlAuthGuard)
    getMembership(@Args() getMembershipArgs: GetMembershipArgs): Promise<MembershipEntity> {
        return this.membershipsService.findOneMembershipById(getMembershipArgs.id);
    }

    @Query(() => [MembershipEntity], { name: 'memberships', nullable: true })
    @UseGuards(GqlAuthGuard)
    async getMemberships(): Promise<MembershipEntity[]> {
        return this.membershipsService.findAllMemberships();
    }

    @Mutation(() => MembershipEntity)
    @UseGuards(GqlAuthGuard)
    async insertOrUpdateMembership(
        @CurrentUser() user: UserEntity,
        @Args('membership') insertOrUpdateMembershipInput: InsertOrUpdateMembershipInput,
    ): Promise<MembershipEntity> {
        var user = await this.usersService.findOneUserById(user.id);
        var plan = await this.plansService.findOnePlanById(insertOrUpdateMembershipInput.planId);
        var coupon = (insertOrUpdateMembershipInput.couponId != null) ? (await this.couponsService.findOneCouponById(insertOrUpdateMembershipInput.couponId)) : null;
        var today = new Date();
        var endAt = new Date();
        if ((insertOrUpdateMembershipInput.periodId == 0))
            endAt.setMonth(today.getMonth() + 1);
        else
            endAt.setFullYear(today.getFullYear() + 1);
        return this.membershipsService.insertOrUpdateMembership(
            new MembershipEntity(
                user,
                plan,
                coupon,
                today,
                endAt
            ),
        );
    }
}
