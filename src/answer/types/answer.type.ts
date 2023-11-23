import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType('Answer')
export class AnswerType {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  responseId: number;

  @Field(() => ID)
  questionId: number;

  @Field(() => Int)
  selectedOptionId: number;
}
