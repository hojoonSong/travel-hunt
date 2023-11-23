import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  async findOne(id: number, relations?: string[]): Promise<Option | undefined> {
    const findOptions = { where: { id } };

    if (relations && relations.length > 0) {
      findOptions['relations'] = relations;
    }
    return this.repository.findOne(findOptions);
  }

  async create(
    createOptionInput: CreateOptionInput,
    questionId: number,
  ): Promise<Option> {
    const optionData = {
      ...createOptionInput,
      questionId,
    };

    const newOption = this.repository.create(optionData);
    return this.repository.save(newOption);
  }

  async update(
    id: number,
    updateData: Partial<UpdateOptionInput>,
  ): Promise<Option> {
    await this.repository.update(id, updateData);
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findOptionsByIds(ids: number[]): Promise<Option[]> {
    return this.repository.find({
      where: { id: In(ids) },
    });
  }
}
