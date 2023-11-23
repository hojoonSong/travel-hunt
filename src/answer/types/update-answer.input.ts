import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAnswerInput {
  @Field(() => Int, { nullable: true })
  responseId?: number;

  @Field(() => Int, { nullable: true })
  questionId?: number;

  @Field(() => Int, { nullable: true })
  selectedOptionId?: number;
}
