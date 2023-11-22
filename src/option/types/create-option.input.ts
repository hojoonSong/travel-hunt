import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOptionInput {
  @Field()
  optionText: string;

  @Field(() => Int)
  score: number;

  @Field(() => Int, { nullable: true })
  conditionalNextQuestionId?: number | null;
}
