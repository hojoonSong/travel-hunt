import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOptionInput {
  @Field(() => ID)
  id: number;

  @Field(() => ID, { nullable: true })
  questionId?: number;

  @Field({ nullable: true })
  optionText?: string;

  @Field(() => Int, { nullable: true })
  score?: number;

  @Field(() => Int, { nullable: true })
  conditionalNextQuestionId?: number | null;
}
