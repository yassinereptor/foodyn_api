import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class ResendConfirmationEmailInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
