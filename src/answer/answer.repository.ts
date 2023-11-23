import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entity/answer.entity';
import { CreateAnswerInput } from './types/create-answer.input';
import { UpdateAnswerInput } from './types/update-answer.input';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(Answer)
    private readonly repository: Repository<Answer>,
  ) {}

  async save(answer: Answer): Promise<Answer> {
    return this.repository.save(answer);
  }

  async findOne(id: number): Promise<Answer | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(createAnswerInput: CreateAnswerInput): Promise<Answer> {
    const newAnswer = this.repository.create(createAnswerInput);
    return this.repository.save(newAnswer);
  }

  async update(
    id: number,
    updateAnswerInput: UpdateAnswerInput,
  ): Promise<Answer> {
    await this.repository.update(id, updateAnswerInput);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
