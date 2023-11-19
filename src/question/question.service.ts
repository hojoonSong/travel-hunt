import { Injectable } from '@nestjs/common';
import { Question } from './entity/question.entity';
import { UpdateQuestionInput } from './types/update-question.input';
import { CreateQuestionInput } from './types/create-question.input';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async createQuestion(
    createQuestionInput: CreateQuestionInput,
  ): Promise<Question> {
    return this.questionRepository.create(createQuestionInput);
  }

  async updateQuestion(
    id: number,
    updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    return this.questionRepository.update(id, updateQuestionInput);
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questionRepository.findOne(id);
  }

  async deleteQuestion(id: number): Promise<void> {
    return this.questionRepository.delete(id);
  }
}