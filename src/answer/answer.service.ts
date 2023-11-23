import { Injectable } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { CreateAnswerInput } from './types/create-answer.input';
import { UpdateAnswerInput } from './types/update-answer.input';
import { Answer } from './entity/answer.entity';

@Injectable()
export class AnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async createAnswer(createAnswerInput: CreateAnswerInput): Promise<Answer> {
    return this.answerRepository.create(createAnswerInput);
  }

  async updateAnswer(
    id: number,
    updateAnswerInput: UpdateAnswerInput,
  ): Promise<Answer> {
    return this.answerRepository.update(id, updateAnswerInput);
  }

  async deleteAnswer(id: number): Promise<void> {
    return this.answerRepository.delete(id);
  }

  async getAnswer(id: number): Promise<Answer | undefined> {
    return this.answerRepository.findOne(id);
  }
}
