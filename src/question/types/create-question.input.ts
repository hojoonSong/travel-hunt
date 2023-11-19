import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { OptionType } from 'src/option/types/option.type';

@InputType()
export class CreateQuestionInput {
  @Field(() => ID)
  surveyId: number;

  @Field()
  questionText: string;

  @Field()
  questionType: string;

  @Field(() => [OptionType])
  options: OptionType[];

  @Field({ nullable: true })
  isMandatory?: boolean;

  @Field(() => ID)
  questionId: number;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field(() => ID, { nullable: true })
  conditionFieldId?: number;

  @Field({ nullable: true })
  conditionValue?: string;
}
