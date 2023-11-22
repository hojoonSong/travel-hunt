import { Question } from 'src/question/entity/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionId: number;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;

  @Column()
  optionText: string;

  @Column()
  score: number;

  @ManyToOne(() => Question, (question) => question.options)
  @JoinColumn({ name: 'conditionalNextQuestionId' })
  conditionalNextQuestion: Question | null;
}
