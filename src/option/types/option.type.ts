import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType('Option')
export class OptionType {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  questionId: number;

  @Field()
  optionText: string;

  @Field(() => Int)
  score: number;

  @Field(() => Int, { nullable: true })
  conditionalNextQuestionId: number | null;
}
