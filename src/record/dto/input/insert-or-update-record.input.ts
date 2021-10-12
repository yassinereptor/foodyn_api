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
export class InsertOrUpdateRecordInput {
  @Field({ nullable: true })
  @IsString()
  status?: string;

  @Field({ nullable: true })
  @IsString()
  country?: string;

  @Field({ nullable: true })
  @IsString()
  countryCode?: string;

  @Field({ nullable: true })
  @IsString()
  region?: string;

  @Field({ nullable: true })
  @IsString()
  regionName?: string;

  @Field({ nullable: true })
  @IsString()
  city?: string;

  @Field({ nullable: true })
  @IsString()
  zip?: string;

  @Field((type) => Float, { nullable: true })
  @IsLatitude()
  lat?: number;

  @Field((type) => Float, { nullable: true })
  @IsLongitude()
  lon?: number;

  @Field({ nullable: true })
  @IsString()
  timezone?: string;

  @Field({ nullable: true })
  @IsString()
  isp?: string;

  @Field({ nullable: true })
  @IsString()
  org?: string;

  @Field({ nullable: true })
  @IsString()
  operator?: string;

  @Field({ nullable: true })
  @IsString()
  query?: string;
}
