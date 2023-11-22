import { QuestionRepository } from './../question/question.repository';
import { QuestionService } from './../question/question.service';
import { UpdateSurveyInput } from './types/update.survey.input';
import { CreateSurveyInput } from './types/create-survey.input';
import { Survey } from './entity/survey.entity';
import { SurveyRepository } from './survey.repositroy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SurveyService {
  constructor(
    private surveyRepository: SurveyRepository,
    private questionService: QuestionService,
  ) {}

  async createSurvey(createSurveyInput: CreateSurveyInput): Promise<Survey> {
    const survey = await this.surveyRepository.create(createSurveyInput);
    const savedSurvey = await this.surveyRepository.save(survey);

    if (createSurveyInput.questions && createSurveyInput.questions.length > 0) {
      const questionsWithSurveyId = createSurveyInput.questions.map(
        (question) => ({
          ...question,
          surveyId: savedSurvey.id,
        }),
      );

      await this.questionService.createBulkQuestions(questionsWithSurveyId);
    }

    return this.surveyRepository.findOne(savedSurvey.id, ['questions']);
  }

  async getSurvey(id: number): Promise<Survey | undefined> {
    return this.surveyRepository.findOne(id);
  }

  async updateSurvey(updateSurveyInput: UpdateSurveyInput): Promise<Survey> {
    const { id, questions, deleteQuestionIds, ...otherUpdateData } =
      updateSurveyInput;

    if (Object.keys(otherUpdateData).length > 0) {
      await this.surveyRepository.updateSurvey(id, otherUpdateData);
    }

    // 질문 재배열
    if (questions) {
      await this.questionService.rearrangeQuestions(questions);
    }

    // 질문 삭제
    if (deleteQuestionIds) {
      for (const questionId of deleteQuestionIds) {
        await this.questionService.deleteQuestion(questionId);
      }
    }

    return this.surveyRepository.findOne(id);
  }

  async deleteSurvey(id: number): Promise<void> {
    return this.surveyRepository.delete(id);
  }
}
