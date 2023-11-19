import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { SurveyType } from '../../survey/types/survey.type';
import { AnswerType } from '../../answer/types/answer.type';

@ObjectType('Response')
export class ResponseType {
  @Field(() => ID)
  id: number;

  @Field(() => SurveyType)
  survey: SurveyType;

  @Field()
  email: string;

  @Field()
  completionDate: Date;

  @Field(() => [AnswerType])
  answers: AnswerType[];
}
