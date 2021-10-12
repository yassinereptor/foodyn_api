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
export class InsertOrUpdateEateryTypeInput {
  @Field((type) => Int, { nullable: true })
  id?: number;
}
