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
  ) {}

  async save(response: Response): Promise<Response> {
    return this.repository.save(response);
  }

  async findOne(id: number): Promise<Response | undefined> {
    return this.repository.findOne({
      where: { id },
    });
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
    await this.repository.delete(id);
  }
}
