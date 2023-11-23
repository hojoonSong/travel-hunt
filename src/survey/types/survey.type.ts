import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { QuestionType } from '../../question/types/question.type';
import { ResponseType } from '../../response/types/response.type';

@ObjectType('Survey')
export class SurveyType {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  creationDate: Date;

  @Field(() => [QuestionType])
  questions: QuestionType[];

  @Field(() => [ResponseType])
  responses: ResponseType[];
}
