import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateAnswerInput } from 'src/answer/types/create-answer.input';

@InputType()
export class CreateResponseInput {
  @Field(() => ID, { nullable: true })
  surveyId?: number;

  @Field()
  email: string;

  @Field(() => [CreateAnswerInput])
  answers: CreateAnswerInput[];
}
