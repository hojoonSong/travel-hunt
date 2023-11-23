import { OptionService } from './../option/option.service';
import { Injectable } from '@nestjs/common';
import { Question } from './entity/question.entity';
import { UpdateQuestionInput } from './types/update-question.input';
import { CreateQuestionInput } from './types/create-question.input';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private optionService: OptionService,
  ) {}

  async createQuestions(
    createQuestionInputs: CreateQuestionInput[],
  ): Promise<Question[]> {
    return this.questionRepository.createQuestionsWithOptions(
      createQuestionInputs,
    );
  }

  async updateQuestion(
    updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    // 질문 업데이트
    await this.questionRepository.updateQuestion(updateQuestionInput);

    // 옵션 추가
    if (updateQuestionInput.newOptions) {
      for (const optionInput of updateQuestionInput.newOptions) {
        await this.optionService.createOption(
          optionInput,
          updateQuestionInput.id,
        );
      }
    }
    // 옵션 삭제
    if (updateQuestionInput.deleteOptionIds) {
      for (const optionId of updateQuestionInput.deleteOptionIds) {
        await this.optionService.deleteOption(optionId);
      }
    }

    // 업데이트된 질문 반환
    return this.questionRepository.findOne(updateQuestionInput.id, ['options']);
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questionRepository.findOne(id, ['options']);
  }

  async deleteQuestion(id: number): Promise<void> {
    return this.questionRepository.delete(id);
  }

  async rearrangeQuestions(
    updateInputs: UpdateQuestionInput[],
  ): Promise<Question[]> {
    return this.questionRepository.rearrangeQuestions(updateInputs);
  }
}
