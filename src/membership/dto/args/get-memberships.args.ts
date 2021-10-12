import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetMembershipsArgs {
  @Field(() => [Int])
  @IsArray()
  ids: number[];
}
