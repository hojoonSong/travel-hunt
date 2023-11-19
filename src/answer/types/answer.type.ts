import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { QuestionType } from '../../question/types/question.type';
import { ResponseType } from '../../response/types/response.type';

@ObjectType('Answer')
export class AnswerType {
  @Field(() => ID)
  id: number;

  @Field(() => ResponseType)
  response: ResponseType;

  @Field(() => QuestionType)
  question: QuestionType;

  @Field(() => Int)
  selectedOptionId: number;
}
