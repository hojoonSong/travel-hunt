import { ResponseRepository } from './../response/response.repository';
import { QuestionRepository } from './../question/question.repository';
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
    private questionRepository: QuestionRepository,
    private responseRepository: ResponseRepository,
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

  async updateSurvey(
    id: number,
    updateData: Partial<UpdateSurveyInput>,
  ): Promise<Survey> {
    await this.repository.update(id, updateData);
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const survey = await this.repository.findOne({
      where: { id },
      relations: ['questions', 'responses'],
    });

    if (!survey) {
      throw new Error('Survey not found');
    }

    if (survey.questions) {
      for (const question of survey.questions) {
        await this.questionRepository.delete(question.id);
      }
    }

    if (survey.responses) {
      for (const response of survey.responses) {
        await this.responseRepository.delete(response.id);
      }
    }

    await this.repository.remove(survey);
  }
}
