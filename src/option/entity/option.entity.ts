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

  @ManyToOne(() => Question, (question) => question.options)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Column()
  questionId: number;

  @Column()
  optionText: string;

  @Column()
  score: number;

  @ManyToOne(() => Question, (question) => question.options, { nullable: true })
  @JoinColumn({ name: 'conditionalNextQuestionId' })
  conditionalQuestion: Question | null;

  @Column({ nullable: true })
  conditionalNextQuestionId: number | null;
}
