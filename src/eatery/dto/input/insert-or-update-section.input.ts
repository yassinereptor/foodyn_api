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
import { InsertOrUpdateTableInput } from './insert-or-update-table.input';

@InputType()
export class InsertOrUpdateSectionInput {
  @Field((type) => Int, { nullable: true })
  id?: number;

  @Field((type) => [InsertOrUpdateTableInput], { nullable: true })
  tables?: InsertOrUpdateTableInput[];

  @Field()
  title: string;

  @Field((type) => Int)
  @IsNumber()
  rows: number;

  @Field((type) => Int)
  @IsNumber()
  columns: number;
}
