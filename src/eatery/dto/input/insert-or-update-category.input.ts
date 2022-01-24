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
import { InsertOrUpdateSectionInput } from './insert-or-update-section.input';

@InputType()
export class InsertOrUpdateCategoryInput {
  @Field((type) => Int, { nullable: true })
  id?: number;

}
