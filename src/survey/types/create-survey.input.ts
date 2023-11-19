import { Field, InputType } from '@nestjs/graphql';
import { CreateQuestionInput } from 'src/question/types/create-question.input';

@InputType()
export class CreateSurveyInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [CreateQuestionInput])
  questions: CreateQuestionInput[];
}
