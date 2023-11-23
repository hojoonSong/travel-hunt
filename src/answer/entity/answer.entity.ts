import { Question } from 'src/question/entity/question.entity';
import { Response } from 'src/response/entity/response.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Response, (response) => response.answers)
  @JoinColumn({ name: 'responseId' })
  response: Response;

  @Column()
  responseId: number;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Column()
  questionId: number;

  @Column()
  selectedOptionId: number;
}
