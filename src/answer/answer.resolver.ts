import { Args, ID, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AnswerType } from './types/answer.type';
import { AnswerService } from './answer.service';
import { CreateAnswerInput } from './types/create-answer.input';
import { UpdateAnswerInput } from './types/update-answer.input';
import { Answer } from './entity/answer.entity';

@Resolver(() => AnswerType)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => AnswerType)
  async createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
  ) {
    return this.answerService.createAnswer(createAnswerInput);
  } 

  @Mutation(() => AnswerType)
  async updateAnswer(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
  ): Promise<Answer> {
    return this.answerService.updateAnswer(id, updateAnswerInput);
  }

  @Mutation(() => Boolean)
  async removeAnswer(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    await this.answerService.deleteAnswer(id);
    return true;
  }

  @Query(() => AnswerType, { nullable: true })
  async answer(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Answer | undefined> {
    return this.answerService.getAnswer(id);
  }
}
