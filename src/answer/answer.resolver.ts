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
    try {
      return this.answerService.createAnswer(createAnswerInput);
    } catch (error) {
      throw new Error(`Failed to create answer: ${error.message}`);
    }
  }

  @Mutation(() => AnswerType)
  async updateAnswer(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
  ): Promise<Answer> {
    try {
      return this.answerService.updateAnswer(id, updateAnswerInput);
    } catch (error) {
      throw new Error(`Failed to update answer: ${error.message}`);
    }
  }

  @Mutation(() => Boolean)
  async removeAnswer(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    try {
      await this.answerService.deleteAnswer(id);
      return true;
    } catch (error) {
      throw new Error(`Failed to remove answer: ${error.message}`);
    }
  }

  @Query(() => AnswerType, { nullable: true })
  async answer(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Answer | undefined> {
    try {
      return this.answerService.getAnswer(id);
    } catch (error) {
      throw new Error(`Failed to fetch answer: ${error.message}`);
    }
  }
}
