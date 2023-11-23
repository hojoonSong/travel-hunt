import { OptionService } from './../option/option.service';
import { Injectable } from '@nestjs/common';
import { ResponseRepository } from './response.repository';
import { CreateResponseInput } from './types/create-response.type';
import { Response } from './entity/response.entity';
import { UpdateResponseInput } from './types/update-response.type';
import { Answer } from 'src/answer/entity/answer.entity';

@Injectable()
export class ResponseService {
  constructor(
    private responseRepository: ResponseRepository,
    private optionService: OptionService,
  ) {}

  async createResponse(
    createResponseInput: CreateResponseInput,
  ): Promise<Response> {
    let totalScore = 0;
    const newResponse = this.responseRepository.create(createResponseInput);

    // 각 Answer의 Score 계산
    for (const answerInput of createResponseInput.answers) {
      const answer = new Answer(); // Answer 객체 생성
      answer.questionId = answerInput.questionId;
      answer.selectedOptionId = answerInput.selectedOptionId;
      answer.response = newResponse;

      // 여기에서 해당 Option의 score를 찾아서 totalScore에 더합니다.
      const option = await this.optionService.findOne(answer.selectedOptionId);
      // totalScore += option.score;

      // Answer 저장 로직 필요
      // 예: await this.answerRepository.save(answer);
    }

    // 총점 설정 및 Response 저장
    newResponse.totalScore = totalScore;
    return this.responseRepository.save(newResponse);
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
