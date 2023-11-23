import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { OptionType } from '../../option/types/option.type';
import { AnswerType } from 'src/answer/types/answer.type';

@ObjectType('Question')
export class QuestionType {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  surveyId: number;

  @Field()
  questionText: string;

  @Field()
  questionType: string;

  @Field(() => Int, { nullable: true })
  nextQuestionId: number | null;

  @Field(() => [OptionType])
  options: OptionType[];

  @Field(() => [AnswerType])
  answers: AnswerType[];
}
