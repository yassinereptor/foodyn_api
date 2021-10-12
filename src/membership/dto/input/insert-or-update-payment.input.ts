import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { PaymentTypeEnum } from 'src/membership/types/payment-type.enum';
const BigInt = require('graphql-bigint');

@InputType()
export class InsertOrUpdatePaymentInput {
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  id?: number;

  @Field((type) => Int)
  @IsNumber()
  type?: PaymentTypeEnum;

  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsUrl()
  asset: string;

  @Field()
  primaryColor: string;

  @Field()
  accentColor: string;

  @Field()
  textColor: string;

  @Field((type) => Boolean, { nullable: true })
  soon?: boolean;
}
