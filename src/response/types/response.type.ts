import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { AnswerType } from '../../answer/types/answer.type';

@ObjectType('Response')
export class ResponseType {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  surveyId: number;

  @Field()
  email: string;

  @Field()
  completionDate: Date;

  @Field(() => [AnswerType])
  answers: AnswerType[];
}
