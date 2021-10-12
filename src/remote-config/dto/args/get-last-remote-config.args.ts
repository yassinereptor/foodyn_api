import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetLastRemoteConfigArgs {
  @Field((type) => Int)
  @IsNotEmpty()
  type: number;
}
