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

  async createQuestion(
    createQuestionInput: CreateQuestionInput,
  ): Promise<Question> {
    const question = await this.questionRepository.create(createQuestionInput);
    const savedQuestion = await this.questionRepository.save(question);

    if (createQuestionInput.options && createQuestionInput.options.length > 0) {
      for (const optionInput of createQuestionInput.options) {
        await this.optionService.createOption(optionInput, savedQuestion.id);
      }
    }
    return this.questionRepository.findOne(savedQuestion.id, ['options']);
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
    return this.questionRepository.findOne(updateQuestionInput.id);
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questionRepository.findOne(id);
  }

  async deleteQuestion(id: number): Promise<void> {
    return this.questionRepository.delete(id);
  }

  async createBulkQuestions(
    createQuestionInputs: CreateQuestionInput[],
  ): Promise<Question[]> {
    return this.questionRepository.createQuestionsWithOptions(
      createQuestionInputs,
    );
  }

  async rearrangeQuestions(
    updateInputs: UpdateQuestionInput[],
  ): Promise<Question[]> {
    return this.questionRepository.rearrangeQuestions(updateInputs);
  }
}
