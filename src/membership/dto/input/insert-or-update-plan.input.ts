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
} from 'class-validator';
const BigInt = require('graphql-bigint');

@InputType()
export class InsertOrUpdatePlanInput {
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  id?: number;

  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field()
  @IsNumber()
  monthPrice: string;

  @Field()
  @IsNumber()
  yearPrice: string;

  @Field()
  primaryColor: string;

  @Field()
  accentColor: string;

  @Field()
  textColor: string;

  @Field((type) => Boolean, { nullable: true })
  recommended?: boolean;

  @Field((type) => Boolean, { nullable: true })
  special?: boolean;

  @Field((type) => Date, { nullable: true })
  @IsDate()
  endAt?: Date;
}
