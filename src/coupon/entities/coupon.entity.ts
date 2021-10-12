import { CouponStatusEnum } from '../status/coupon-status.enum';
import { ObjectType, Int, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { MembershipEntity } from 'src/membership/entities/membership.entity';

@ObjectType('Coupon')
@Entity('coupons')
export class CouponEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => [MembershipEntity], { nullable: true })
  @OneToMany(() => MembershipEntity, (membership) => membership.coupon, {
    nullable: true,
    cascade: true,
  })
  memberships?: MembershipEntity[];

  @Field()
  @Column()
  code: string;

  @Field((type) => Int)
  @Column({ default: 0 })
  quantity: number;

  @Field((type) => Int)
  @Column({ default: 0 })
  used: number;

  @Field((type) => Int)
  @Column({ default: 0 })
  reduction: number;

  @Field((type) => Date, { nullable: true })
  @Column({ nullable: true })
  endAt?: Date;

  @Field((type) => Int)
  @Column({ default: CouponStatusEnum.ACTIVE })
  status?: number;

  @Field((type) => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(id, code, quantity, used, reduction, endAt) {
    this.id = id;
    this.code = code;
    this.quantity = quantity;
    this.used = used;
    this.reduction = reduction;
    this.endAt = endAt;
  }
}
