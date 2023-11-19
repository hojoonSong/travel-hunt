import { Survey } from './entity/survey.entity';
import { SurveyRepository } from './survey.repositroy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SurveyService {
  constructor(private surveyRepository: SurveyRepository) {}

  async createSurvey(surveyData: Survey): Promise<Survey> {
    return this.surveyRepository.save(surveyData);
  }

  async getSurvey(id: number): Promise<Survey> {
    return this.surveyRepository.findOne(id);
  }
}
