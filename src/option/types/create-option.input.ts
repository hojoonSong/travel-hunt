import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOptionInput {
  @Field(() => ID)
  questionId: number;

  @Field()
  optionText: string;

  @Field(() => Int)
  score: number;

  @Field(() => Int, { nullable: true })
  conditionalNextQuestionId?: number | null;
}
