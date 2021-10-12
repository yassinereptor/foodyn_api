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
} from 'typeorm';
import { Field, Int, Float, ObjectType } from '@nestjs/graphql';
import { IsCurrency, IsDate } from 'class-validator';
import { MembershipEntity } from 'src/membership/entities/membership.entity';
import { PlanStatusEnum } from '../status/plan-status.enum';

@ObjectType('Plan')
@Entity('plans')
export class PlanEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => [MembershipEntity], { nullable: true })
  @OneToMany(() => MembershipEntity, (membership) => membership.plan, {
    nullable: true,
    cascade: true,
  })
  memberships?: MembershipEntity[];

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field()
  @Column()
  monthPrice: string;

  @Field()
  @Column()
  yearPrice: string;

  @Field()
  @Column()
  primaryColor: string;

  @Field()
  @Column()
  accentColor: string;

  @Field()
  @Column()
  textColor: string;

  @Field((type) => Boolean)
  @Column('boolean', { default: false })
  recommended?: boolean;

  @Field((type) => Boolean)
  @Column('boolean', { default: false })
  special?: boolean;

  @Field((type) => Date, { nullable: true })
  @Column({ nullable: true })
  @IsDate()
  endAt?: Date;

  @Field((type) => Int)
  @Column({ default: PlanStatusEnum.ACTIVE })
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

  constructor(
    id,
    title,
    description,
    monthPrice,
    yearPrice,
    primaryColor,
    accentColor,
    textColor,
    recommended,
    special,
    endAt,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.monthPrice = monthPrice;
    this.yearPrice = yearPrice;
    this.primaryColor = primaryColor;
    this.accentColor = accentColor;
    this.textColor = textColor;
    this.recommended = recommended;
    this.special = special;
    this.endAt = endAt;
  }
}
