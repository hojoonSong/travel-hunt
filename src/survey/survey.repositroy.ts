import { UpdateSurveyInput } from './types/update.survey.input';
import { CreateSurveyInput } from './types/create-survey.input';
import { Repository } from 'typeorm';
import { Survey } from './entity/survey.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SurveyRepository {
  constructor(
    @InjectRepository(Survey)
    private readonly repository: Repository<Survey>,
  ) {}

  async save(survey: Survey): Promise<Survey> {
    return this.repository.save(survey);
  }

  async findOne(id: number, relations?: string[]): Promise<Survey | undefined> {
    const findOptions = { where: { id } };

    if (relations && relations.length > 0) {
      findOptions['relations'] = relations;
    }
    return this.repository.findOne(findOptions);
  }

  async create(createSurveyInput: CreateSurveyInput): Promise<Survey> {
    const newSurvey = this.repository.create(createSurveyInput);
    return this.repository.save(newSurvey);
  }

  async update(
    id: number,
    updateSurveyInput: UpdateSurveyInput,
  ): Promise<Survey> {
    await this.repository.update(id, updateSurveyInput);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
