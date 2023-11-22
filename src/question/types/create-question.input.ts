import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { CreateOptionInput } from 'src/option/types/create-option.input';

@InputType()
export class CreateQuestionInput {
  @Field(() => ID, { nullable: true })
  surveyId?: number;

  @Field()
  questionText: string;

  @Field()
  questionType: string;

  @Field(() => ID, { nullable: true })
  previousQuestionId?: number;

  @Field(() => [CreateOptionInput], { nullable: true })
  options: CreateOptionInput[];
}
