import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entity/question.entity';
import { CreateQuestionInput } from './types/create-question.input';
import { UpdateQuestionInput } from './types/update-question.input';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>,
  ) {}

  async save(question: Question): Promise<Question> {
    return this.repository.save(question);
  }

  async findOne(id: number): Promise<Question | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(createQuestionInput: CreateQuestionInput): Promise<Question> {
    const newQuestion = this.repository.create(createQuestionInput);
    return this.repository.save(newQuestion);
  }

  async update(
    id: number,
    updateQuestionInput: UpdateQuestionInput
  ): Promise<Question> {
    await this.repository.update(id, updateQuestionInput);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
