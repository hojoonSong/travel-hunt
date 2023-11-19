import { Field, InputType } from '@nestjs/graphql';
import { UpdateAnswerInput } from 'src/answer/types/update-answer.input';

@InputType()
export class UpdateResponseInput {
  @Field({ nullable: true })
  email?: string;

  @Field(() => [UpdateAnswerInput], { nullable: true })
  answers?: UpdateAnswerInput[];
}
