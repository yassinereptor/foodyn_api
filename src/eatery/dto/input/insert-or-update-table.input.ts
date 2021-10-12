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
export class InsertOrUpdateTableInput {
  @Field((type) => Int, { nullable: true })
  id?: number;
  
  @Field((type) => Int)
  @IsNumber()
  number: number;

  @Field((type) => Int)
  @IsNumber()
  row: number;

  @Field((type) => Int)
  @IsNumber()
  column: number;
}
