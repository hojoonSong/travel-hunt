import { AnswerRepository } from './../answer/answer.repository';
import { Injectable } from '@nestjs/common';
import { ResponseRepository } from './response.repository';
import { CreateResponseInput } from './types/create-response.type';
import { Response } from './entity/response.entity';
import { Answer } from 'src/answer/entity/answer.entity';
import { OptionRepository } from 'src/option/option.repository';
import { AnswerType } from 'src/answer/types/answer.type';
import { ResponseType } from './types/response.type';

@Injectable()
export class ResponseService {
  constructor(
    private responseRepository: ResponseRepository,
    private optionRepository: OptionRepository,
    private answerRepository: AnswerRepository,
  ) {}

  async createResponse(
    createResponseInput: CreateResponseInput,
  ): Promise<Response> {
    let totalScore = 0;
    const newResponse =
      await this.responseRepository.create(createResponseInput);

    for (const answerInput of createResponseInput.answers) {
      const answer = new Answer();
      answer.questionId = answerInput.questionId;
      answer.selectedOptionId = answerInput.selectedOptionId;
      answer.response = newResponse;

      const option = await this.optionRepository.findOne(
        answer.selectedOptionId,
      );
      totalScore += option.score;
      await this.answerRepository.save(answer);
    }

    newResponse.totalScore = totalScore;
    const createdResponse = await this.responseRepository.save(newResponse);
    return this.responseRepository.findOne(createdResponse.id, ['answers']);
  }

  async findResponseWithTotalScore(responseId: number): Promise<ResponseType> {
    const response = await this.responseRepository.findOne(responseId, [
      'answers',
      'answers.option',
    ]);
    if (!response) {
      throw new Error('Response not found');
    }

    const optionIds = response.answers.map((a) => a.selectedOptionId);
    const options = await this.optionRepository.findOptionsByIds(optionIds);

    const responseType = new ResponseType();
    responseType.id = response.id;
    responseType.surveyId = response.surveyId;
    responseType.email = response.email;
    responseType.completionDate = response.completionDate;

    responseType.answers = response.answers.map((answer) => {
      const answerType = new AnswerType();
      answerType.id = answer.id;
      answerType.questionId = answer.questionId;
      answerType.selectedOptionId = answer.selectedOptionId;
      return answerType;
    });

    const totalScore = response.answers.reduce((total, answer) => {
      const option = options.find((o) => o.id === answer.selectedOptionId);
      return total + (option ? option.score : 0);
    }, 0);

    response.totalScore = totalScore;
    await this.responseRepository.save(response);

    responseType.totalScore = totalScore;

    return responseType;
  }

  async deleteResponse(id: number): Promise<void> {
    return this.responseRepository.delete(id);
  }
}
