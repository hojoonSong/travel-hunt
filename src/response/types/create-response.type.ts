import { Field, InputType } from '@nestjs/graphql';
import { CreateAnswerInput } from 'src/answer/types/create-answer.input';

@InputType()
export class CreateResponseInput {
  @Field()
  email: string;

  @Field()
  surveyId: number;

  @Field(() => [CreateAnswerInput])
  answers: CreateAnswerInput[];
}
