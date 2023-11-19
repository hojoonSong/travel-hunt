import { Injectable } from '@nestjs/common';
import { ResponseRepository } from './response.repository';
import { CreateResponseInput } from './types/create-response.type';
import { Response } from './entity/response.entity';
import { UpdateResponseInput } from './types/update-response.type';

@Injectable()
export class ResponseService {
  constructor(private responseRepository: ResponseRepository) {}

  async createResponse(
    createResponseInput: CreateResponseInput,
  ): Promise<Response> {
    return this.responseRepository.create(createResponseInput);
  }

  async getResponse(id: number): Promise<Response | undefined> {
    return this.responseRepository.findOne(id);
  }

  async updateResponse(
    id: number,
    updateResponseInput: UpdateResponseInput,
  ): Promise<Response> {
    return this.responseRepository.update(id, updateResponseInput);
  }

  async deleteResponse(id: number): Promise<void> {
    return this.responseRepository.delete(id);
  }
}
