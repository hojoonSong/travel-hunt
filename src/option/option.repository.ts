import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entity/option.entity';
import { UpdateOptionInput } from './types/update-option.input';
import { CreateOptionInput } from './types/create-option.input';

@Injectable()
export class OptionRepository {
  constructor(
    @InjectRepository(Option)
    private readonly repository: Repository<Option>,
  ) {}

  async save(option: Option): Promise<Option> {
    return this.repository.save(option);
  }

  async findOne(id: number): Promise<Option | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(createOptionInput: CreateOptionInput): Promise<Option> {
    const newOption = this.repository.create(createOptionInput);
    return this.repository.save(newOption);
  }

  async update(
    id: number,
    updateOptionInput: UpdateOptionInput,
  ): Promise<Option> {
    await this.repository.update(id, updateOptionInput);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
