import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetRecordArgs {
  @Field((type) => Int)
  @IsNotEmpty()
  id: number;
}
