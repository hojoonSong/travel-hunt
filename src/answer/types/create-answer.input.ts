import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => Int)
  responseId: number;

  @Field(() => Int)
  questionId: number;
  
  @Field(() => Int)
  selectedOptionId: number;
}
