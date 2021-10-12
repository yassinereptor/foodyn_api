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

@InputType()
export class InsertOrUpdateCouponInput {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field()
  code: string;

  @Field((type) => Int, { nullable: true })
  quantity?: number;

  @Field((type) => Int, { nullable: true })
  used?: number;

  @Field((type) => Int, { nullable: true })
  reduction?: number;

  @Field((type) => Date, { nullable: true })
  endAt?: Date;

  @Field((type) => Int, { nullable: true })
  status?: number;
}
