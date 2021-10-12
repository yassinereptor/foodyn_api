import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Field, Int, Float, ObjectType } from '@nestjs/graphql';
import { IsCurrency, IsDate } from 'class-validator';
import { PlanEntity } from 'src/membership/entities/plan.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { MembershipStatusEnum } from '../status/membership-status.enum';
import { CouponEntity } from 'src/coupon/entities/coupon.entity';

@ObjectType('Membership')
@Entity('memberships')
export class MembershipEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.memberships)
  user?: UserEntity;

  @Field((type) => PlanEntity, { nullable: true })
  @ManyToOne(() => PlanEntity, (plan) => plan.memberships)
  plan?: PlanEntity;

  @Field((type) => CouponEntity, { nullable: true })
  @ManyToOne(() => CouponEntity, (coupon) => coupon.memberships)
  coupon?: CouponEntity;

  @Field((type) => Date)
  @Column()
  @IsDate()
  startAt: Date;

  @Field((type) => Date)
  @Column()
  @IsDate()
  endAt: Date;

  @Field((type) => Int)
  @Column({ default: MembershipStatusEnum.ACTIVE })
  status: number;

  @Field((type) => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(
    user,
    plan,
    coupon,
    startAt,
    endAt
    ) {
      this.user = user,
      this.plan = plan,
      this.coupon = coupon,
      this.startAt = startAt,
      this.endAt = endAt
  }
}
