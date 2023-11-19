import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { QuestionType } from '../../question/types/question.type';

@ObjectType('Option')
export class OptionType {
  @Field(() => ID)
  id: number;

  @Field(() => QuestionType)
  question: QuestionType;

  @Field()
  optionText: string;

  @Field(() => Int)
  score: number;
}
