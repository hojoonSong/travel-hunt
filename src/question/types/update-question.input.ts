import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { OptionType } from 'src/option/types/option.type';

@InputType()
export class UpdateQuestionInput {
  @Field(() => ID)
  questionId: number;

  @Field({ nullable: true })
  questionText?: string;

  @Field(() => [OptionType], { nullable: 'itemsAndList' })
  options?: OptionType[];

  @Field({ nullable: true })
  isMandatory?: boolean;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field(() => ID, { nullable: true })
  conditionFieldId?: number;

  @Field({ nullable: true })
  conditionValue?: string;
}
