import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { CreateOptionInput } from 'src/option/types/create-option.input';

@InputType()
export class UpdateQuestionInput {
  @Field(() => ID)
  id: number;

  @Field(() => ID, { nullable: true })
  surveyId?: number;

  @Field({ nullable: true })
  isDeleted?: boolean;

  @Field({ nullable: true })
  questionText?: string;

  @Field({ nullable: true })
  questionType: string;

  @Field(() => ID, { nullable: true })
  previousQuestionId?: number;

  @Field(() => ID, { nullable: true })
  nextQuestionId?: number;

  @Field(() => [CreateOptionInput], { nullable: 'itemsAndList' })
  options?: CreateOptionInput[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  deleteOptionIds?: number[];

  @Field(() => [CreateOptionInput], { nullable: 'itemsAndList' })
  newOptions?: CreateOptionInput[];
}
