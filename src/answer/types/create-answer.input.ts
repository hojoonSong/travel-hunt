import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => Int, { nullable: true })
  responseId?: number;

  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  selectedOptionId: number;
}
