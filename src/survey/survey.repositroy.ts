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

  async findOne(id: number): Promise<Survey | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
