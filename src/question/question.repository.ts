import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Question } from './entity/question.entity';
import { CreateQuestionInput } from './types/create-question.input';
import { UpdateQuestionInput } from './types/update-question.input';
import { OptionRepository } from 'src/option/option.repository';
import { CreateOptionInput } from 'src/option/types/create-option.input';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>,
    private optionRepository: OptionRepository,
  ) {}

  async save(question: Question): Promise<Question> {
    return this.repository.save(question);
  }

  async findOne(
    id: number,
    relations?: string[],
  ): Promise<Question | undefined> {
    const findOptions = { where: { id } };

    if (relations && relations.length > 0) {
      findOptions['relations'] = relations;
    }
    return this.repository.findOne(findOptions);
  }

  async create(createQuestionInput: CreateQuestionInput): Promise<Question> {
    const newQuestion = this.repository.create(createQuestionInput);
    return this.repository.save(newQuestion);
  }

  async updateQuestion(
    updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { id, previousQuestionId, nextQuestionId, ...otherUpdates } =
        updateQuestionInput;

      // 현재 질문 찾기
      const questionToUpdate = await queryRunner.manager.findOne(Question, {
        where: { id },
      });
      if (!questionToUpdate) {
        throw new Error('Question not found');
      }

      // 새로운 이전 및 다음 질문 찾기
      const [newPreviousQuestion, newNextQuestion] = await Promise.all([
        previousQuestionId
          ? queryRunner.manager.findOne(Question, {
              where: { id: previousQuestionId },
            })
          : null,
        nextQuestionId
          ? queryRunner.manager.findOne(Question, {
              where: { id: nextQuestionId },
            })
          : null,
      ]);

      // 기존의 이전 및 다음 질문 찾기
      const [currentPreviousQuestion, currentNextQuestion] = await Promise.all([
        queryRunner.manager.findOne(Question, {
          where: { nextQuestionId: id },
        }),
        queryRunner.manager.findOne(Question, {
          where: { previousQuestionId: id },
        }),
      ]);

      // 기존 연결 해제
      if (
        currentPreviousQuestion &&
        currentPreviousQuestion.id !== previousQuestionId
      ) {
        currentPreviousQuestion.nextQuestionId = null;
        await queryRunner.manager.save(currentPreviousQuestion);
      }
      if (currentNextQuestion && currentNextQuestion.id !== nextQuestionId) {
        currentNextQuestion.previousQuestionId = null;
        await queryRunner.manager.save(currentNextQuestion);
      }

      // 새로운 연결 처리
      if (newPreviousQuestion) {
        newPreviousQuestion.nextQuestionId = id;
        await queryRunner.manager.save(newPreviousQuestion);
      }
      if (newNextQuestion) {
        questionToUpdate.nextQuestionId = newNextQuestion.id;
      } else {
        questionToUpdate.nextQuestionId = null;
      }

      // 현재 질문 업데이트
      Object.assign(questionToUpdate, otherUpdates);
      await queryRunner.manager.save(questionToUpdate);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
      return questionToUpdate;
    } catch (err) {
      // 오류 발생 시 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 연결 해제
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<void> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 삭제할 질문과 관련 데이터 가져오기
      const questionToDelete = await queryRunner.manager.findOne(Question, {
        where: { id },
        relations: ['nextQuestion'],
      });

      if (!questionToDelete) {
        throw new Error('Question not found');
      }

      // 이전 질문 찾기
      const previousQuestion = await queryRunner.manager.findOne(Question, {
        where: { nextQuestionId: id },
      });

      if (previousQuestion) {
        // 이전 질문의 nextQuestionId 업데이트
        previousQuestion.nextQuestionId = questionToDelete.nextQuestionId;
        await queryRunner.manager.save(previousQuestion);
      }

      // 질문 삭제
      await queryRunner.manager.remove(questionToDelete);

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
    } catch (err) {
      // 오류 발생 시 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 연결 해제
      await queryRunner.release();
    }
  }

  async createQuestionsWithOptions(
    createQuestionInputs: CreateQuestionInput[],
  ): Promise<Question[]> {
    const mainQueryRunner =
      this.repository.manager.connection.createQueryRunner();
    await mainQueryRunner.connect();
    await mainQueryRunner.startTransaction();

    try {
      let previousQuestionId: number | null = null;
      const createdQuestions: {
        id: number;
        options: CreateOptionInput[];
        surveyId: number;
      }[] = [];

      for (let i = 0; i < createQuestionInputs.length; i++) {
        const questionInput = createQuestionInputs[i];

        // 새 질문 생성
        const newQuestion = this.repository.create({
          ...questionInput,
          previousQuestionId: previousQuestionId,
        });
        const savedQuestion = await mainQueryRunner.manager.save(newQuestion);

        // 이전 질문의 nextQuestionId 업데이트
        if (previousQuestionId !== null) {
          await mainQueryRunner.manager.update(Question, previousQuestionId, {
            nextQuestionId: savedQuestion.id,
          });
        }

        // 다음 질문을 위해 현재 질문의 ID 저장
        previousQuestionId = savedQuestion.id;

        // 생성된 질문 정보 저장
        createdQuestions.push({
          id: savedQuestion.id,
          options: questionInput.options,
          surveyId: questionInput.surveyId,
        });
      }

      // 마지막 질문의 nextQuestionId를 null로 설정
      if (previousQuestionId !== null) {
        await mainQueryRunner.manager.update(Question, previousQuestionId, {
          nextQuestionId: null,
        });
      }

      await mainQueryRunner.commitTransaction();

      // 옵션 트랜잭션 처리
      for (const { id: questionId, options } of createdQuestions) {
        if (options && options.length > 0) {
          const optionQueryRunner =
            this.repository.manager.connection.createQueryRunner();
          await optionQueryRunner.connect();
          await optionQueryRunner.startTransaction();
          try {
            for (const optionInput of options) {
              await this.optionRepository.create(optionInput, questionId);
            }
            await optionQueryRunner.commitTransaction();
          } catch (err) {
            await optionQueryRunner.rollbackTransaction();
            throw err;
          } finally {
            await optionQueryRunner.release();
          }
        }
      }

      // 최종 결과 반환
      return await this.repository.find({
        where: { id: In(createdQuestions.map((q) => q.id)) },
        relations: ['options'],
      });
    } catch (err) {
      await mainQueryRunner.rollbackTransaction();
      throw err;
    } finally {
      await mainQueryRunner.release();
    }
  }

  async rearrangeQuestions(
    updateInputs: UpdateQuestionInput[],
  ): Promise<Question[]> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const updatedQuestions: Question[] = [];

      for (const input of updateInputs) {
        const { id, previousQuestionId, nextQuestionId, ...otherUpdates } =
          input;

        // 현재 질문 찾기
        const questionToUpdate = await queryRunner.manager.findOne(Question, {
          where: { id },
        });
        if (!questionToUpdate) {
          throw new Error(`Question not found with ID: ${id}`);
        }

        // 새로운 이전 및 다음 질문 찾기
        const [newPreviousQuestion, newNextQuestion] = await Promise.all([
          previousQuestionId
            ? queryRunner.manager.findOne(Question, {
                where: { id: previousQuestionId },
              })
            : null,
          nextQuestionId
            ? queryRunner.manager.findOne(Question, {
                where: { id: nextQuestionId },
              })
            : null,
        ]);

        // 기존의 이전 및 다음 질문 찾기
        const [currentPreviousQuestion, currentNextQuestion] =
          await Promise.all([
            queryRunner.manager.findOne(Question, {
              where: { nextQuestionId: id },
            }),
            queryRunner.manager.findOne(Question, {
              where: { previousQuestionId: id },
            }),
          ]);

        // 기존 연결 해제
        if (
          currentPreviousQuestion &&
          currentPreviousQuestion.id !== previousQuestionId
        ) {
          currentPreviousQuestion.nextQuestionId = null;
          await queryRunner.manager.save(currentPreviousQuestion);
        }
        if (currentNextQuestion && currentNextQuestion.id !== nextQuestionId) {
          currentNextQuestion.previousQuestionId = null;
          await queryRunner.manager.save(currentNextQuestion);
        }

        // 새로운 연결 처리
        if (newPreviousQuestion) {
          newPreviousQuestion.nextQuestionId = id;
          await queryRunner.manager.save(newPreviousQuestion);
        }
        if (newNextQuestion) {
          questionToUpdate.nextQuestionId = newNextQuestion.id;
        } else {
          questionToUpdate.nextQuestionId = null;
        }

        // 현재 질문 업데이트
        Object.assign(questionToUpdate, otherUpdates);
        await queryRunner.manager.save(questionToUpdate);
        updatedQuestions.push(questionToUpdate);
      }

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
      return updatedQuestions;
    } catch (err) {
      // 오류 발생 시 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 연결 해제
      await queryRunner.release();
    }
  }
}
