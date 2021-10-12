import { ObjectType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { PaymentStatusEnum } from '../status/payment-status.enum';
import { PaymentTypeEnum } from '../types/payment-type.enum';

@ObjectType('Payment')
@Entity('payments')
export class PaymentEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  @Column()
  type: PaymentTypeEnum;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  asset?: string;

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
  @Column('boolean', { default: true })
  soon?: boolean;

  @Field((type) => Int)
  @Column({ default: PaymentStatusEnum.ACTIVE })
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
    type,
    title,
    description,
    asset,
    primaryColor,
    accentColor,
    textColor
  ) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.description = description;
    this.asset = asset;
    this.primaryColor = primaryColor;
    this.accentColor = accentColor;
    this.textColor = textColor;
  }
}
