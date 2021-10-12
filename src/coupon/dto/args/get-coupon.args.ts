import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetCouponArgs {
  @Field((type) => Int)
  @IsNotEmpty()
  id: number;
}
