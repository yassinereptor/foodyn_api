import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetPlansArgs {
  @Field(() => [Int])
  @IsArray()
  ids: number[];
}
