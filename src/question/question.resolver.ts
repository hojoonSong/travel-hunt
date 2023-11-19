import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Question } from './entity/question.entity';
import { QuestionService } from './question.service';
import { CreateQuestionInput } from './types/create-question.input';
import { UpdateQuestionInput } from './types/update-question.input';

@Resolver((of) => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation((returns) => Question)
  async createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ): Promise<Question> {
    return this.questionService.createQuestion(createQuestionInput);
  }

  @Mutation((returns) => Question)
  async updateQuestion(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    return this.questionService.updateQuestion(id, updateQuestionInput);
  }

  @Query((returns) => Question, { nullable: true })
  async question(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Question | undefined> {
    return this.questionService.getQuestion(id);
  }

  @Mutation((returns) => Boolean)
  async deleteQuestion(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.questionService.deleteQuestion(id);
    return true;
  }
}
