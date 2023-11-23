import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Question } from './entity/question.entity';
import { QuestionService } from './question.service';
import { CreateQuestionInput } from './types/create-question.input';
import { UpdateQuestionInput } from './types/update-question.input';
import { QuestionType } from './types/question.type';

@Resolver('Question')
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => [QuestionType])
  async createQuestions(
    @Args('createQuestionInputs', { type: () => [CreateQuestionInput] })
    createQuestionInputs: CreateQuestionInput[],
  ): Promise<Question[]> {
    try {
      return this.questionService.createQuestions(createQuestionInputs);
    } catch (error) {
      throw new Error(`Failed to create questions: ${error.message}`);
    }
  }

  @Mutation(() => QuestionType)
  async updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    try {
      return this.questionService.updateQuestion(updateQuestionInput);
    } catch (error) {
      throw new Error(`Failed to update question: ${error.message}`);
    }
  }

  @Query(() => QuestionType, { nullable: true })
  async question(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Question | undefined> {
    try {
      return this.questionService.getQuestion(id);
    } catch (error) {
      throw new Error(`Failed to fetch question: ${error.message}`);
    }
  }

  @Mutation(() => Boolean)
  async deleteQuestion(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    try {
      await this.questionService.deleteQuestion(id);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete question: ${error.message}`);
    }
  }

  @Mutation(() => [QuestionType])
  async rearrangeQuestions(
    @Args('updateInputs', { type: () => [UpdateQuestionInput] })
    updateInputs: UpdateQuestionInput[],
  ): Promise<Question[]> {
    try {
      return this.questionService.rearrangeQuestions(updateInputs);
    } catch (error) {
      throw new Error(`Failed to rearrange questions: ${error.message}`);
    }
  }
}
