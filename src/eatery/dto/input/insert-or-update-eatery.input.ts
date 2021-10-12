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
import { InsertOrUpdateEateryTypeInput } from './insert-or-update-eatery-type.input';
import { InsertOrUpdateSectionInput } from './insert-or-update-section.input';

@InputType()
export class InsertOrUpdateEateryInput {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field((type) => [InsertOrUpdateSectionInput], { nullable: true })
  sections?: InsertOrUpdateSectionInput[];

  @Field((type) => [InsertOrUpdateEateryTypeInput], { nullable: true })
  eateryTypes?: InsertOrUpdateEateryTypeInput[];

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

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

  @Field((type) => Float, { nullable: true })
  @IsLatitude()
  posLat?: number;

  @Field((type) => Float, { nullable: true })
  @IsLongitude()
  posLng?: number;
}
