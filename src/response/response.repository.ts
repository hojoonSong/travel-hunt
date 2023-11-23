import { AnswerRepository } from './../answer/answer.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './entity/response.entity';
import { CreateResponseInput } from './types/create-response.type';
import { UpdateResponseInput } from './types/update-response.type';

@Injectable()
export class ResponseRepository {
  constructor(
    @InjectRepository(Response)
    private readonly repository: Repository<Response>,
    private answerRepository: AnswerRepository,
  ) {}

  async save(response: Response): Promise<Response> {
    return this.repository.save(response);
  }

  async findOne(
    id: number,
    relations?: string[],
  ): Promise<Response | undefined> {
    const findOptions = { where: { id } };

    if (relations && relations.length > 0) {
      findOptions['relations'] = relations;
    }
    return this.repository.findOne(findOptions);
  }

  async create(createResponseInput: CreateResponseInput): Promise<Response> {
    const newResponse = this.repository.create(createResponseInput);
    return this.repository.save(newResponse);
  }

  async update(
    id: number,
    updateResponseInput: UpdateResponseInput,
  ): Promise<Response> {
    await this.repository.update(id, updateResponseInput);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const response = await this.repository.findOne({
      where: { id },
      relations: ['answers'],
    });

    if (!response) {
      throw new Error('Response not found');
    }

    if (response.answers) {
      for (const answer of response.answers) {
        await this.answerRepository.delete(answer.id);
      }
    }

    await this.repository.remove(response);
  }
}
