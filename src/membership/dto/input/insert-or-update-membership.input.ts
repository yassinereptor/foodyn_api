import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

@InputType()
export class InsertOrUpdateMembershipInput {
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  planId?: number;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  periodId?: number;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  couponId?: number;
}
