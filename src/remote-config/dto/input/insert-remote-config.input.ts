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
export class InsertRemoteConfigInput {
  @Field((type) => Int, { nullable: true })
  @IsNumber()
  id?: number;

  @Field((type) => Int, {nullable: true})
  type?: number;
}
