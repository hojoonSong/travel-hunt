import { Field, ID, InputType } from '@nestjs/graphql';
import { UpdateOptionInput } from 'src/option/types/update-option.input';

@InputType()
export class UpdateQuestionInput {
  @Field(() => ID)
  questionId: number;

  @Field({ nullable: true })
  questionText?: string;

  @Field(() => [UpdateOptionInput], { nullable: 'itemsAndList' })
  options?: UpdateOptionInput[];
}
