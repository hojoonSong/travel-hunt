import { Injectable } from '@nestjs/common';
import { OptionRepository } from './option.repository';
import { CreateOptionInput } from './types/create-option.input';
import { UpdateOptionInput } from './types/update-option.input';
import { Option } from './entity/option.entity';

@Injectable()
export class OptionService {
  constructor(private readonly optionRepository: OptionRepository) {}

  async createOption(createOptionInput: CreateOptionInput): Promise<Option> {
    return this.optionRepository.create(createOptionInput);
  }

  async updateOption(
    id: number,
    updateData: Partial<UpdateOptionInput>,
  ): Promise<Option> {
    await this.optionRepository.update(id, updateData);
    return this.optionRepository.findOne(id);
  }

  async deleteOption(id: number): Promise<void> {
    return this.optionRepository.delete(id);
  }

  async getOption(id: number): Promise<Option | undefined> {
    return this.optionRepository.findOne(id);
  }
}
