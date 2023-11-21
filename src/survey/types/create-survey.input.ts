import { Field, InputType } from '@nestjs/graphql';
import { CreateQuestionInput } from 'src/question/types/create-question.input';
import { CreateResponseInput } from 'src/response/types/create-response.type';

@InputType()
export class CreateSurveyInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [CreateQuestionInput], { nullable: true })
  questions?: CreateQuestionInput[];

  @Field(() => [CreateResponseInput], { nullable: true })
  responses?: CreateResponseInput[];
}
