import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateVerifiedUserInput {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
