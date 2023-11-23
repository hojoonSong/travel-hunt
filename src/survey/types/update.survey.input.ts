import { Field, ID, InputType } from '@nestjs/graphql';
import { UpdateQuestionInput } from 'src/question/types/update-question.input';

@InputType()
export class UpdateSurveyInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [UpdateQuestionInput], { nullable: 'itemsAndList' })
  questions?: UpdateQuestionInput[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  deleteQuestionIds?: number[];
}
