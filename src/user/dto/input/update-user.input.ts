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
export class UpdateUserInput {
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  id?: number;

  @Field({ nullable: true })
  @IsString()
  fullname?: string;

  @Field({ nullable: true })
  @IsString()
  username?: string;

  @Field({ nullable: true })
  @IsString()
  adresse?: string;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  dialCode?: number;

  @Field({ nullable: true })
  @IsPhoneNumber()
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsNumber()
  country?: string;

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
