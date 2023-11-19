import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { UpdateOptionInput } from 'src/option/types/update-option.input';

@InputType()
export class UpdateQuestionInput {
  @Field(() => ID)
  questionId: number;

  @Field({ nullable: true })
  questionText?: string;

  @Field(() => [UpdateOptionInput], { nullable: 'itemsAndList' })
  options?: UpdateOptionInput[];

  @Field({ nullable: true })
  isMandatory?: boolean;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field(() => ID, { nullable: true })
  conditionFieldId?: number;

  @Field({ nullable: true })
  conditionValue?: string;
}
