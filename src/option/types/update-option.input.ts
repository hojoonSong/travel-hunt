import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOptionInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  optionText?: string;

  @Field(() => Int, { nullable: true })
  score?: number;
}
