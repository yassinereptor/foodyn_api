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
export class InsertOrUpdateProfileInput {
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  id?: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @Field({ nullable: true })
  @IsString()
  adresse?: string;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  dialCode?: number;

  @Field({ nullable: true })
  @IsPhoneNumber()
  phoneNumber?: string;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  country?: number;

  @Field({ nullable: true })
  @IsString()
  city?: string;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  zipCode?: number;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  gender?: number;

  @Field((type) => Float, { nullable: true })
  @IsLatitude()
  posLat?: number;

  @Field((type) => Float, { nullable: true })
  @IsLongitude()
  posLng?: number;
}
