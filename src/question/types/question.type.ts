import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { OptionType } from '../../option/types/option.type';
import { SurveyType } from '../../survey/types/survey.type';

@ObjectType('Question')
export class QuestionType {
  @Field(() => ID)
  id: number;

  @Field(() => SurveyType)
  survey: SurveyType;

  @Field()
  questionText: string;

  @Field()
  questionType: string;

  @Field(() => Int, { nullable: true })
  nextQuestionId: number | null;

  @Field(() => [OptionType])
  options: OptionType[];
}
