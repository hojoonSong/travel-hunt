import { Survey } from 'src/survey/entity/survey.entity';
import { Option } from 'src/option/entity/option.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Answer } from 'src/answer/entity/answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @Column()
  surveyId: number;

  @Column()
  questionText: string;

  @Column()
  questionType: string;

  @Column({ nullable: true })
  previousQuestionId: number | null;

  @Column({ nullable: true })
  nextQuestionId: number | null;

  @OneToMany(() => Option, (option) => option.question, {
    cascade: ['remove'],
  })
  options: Option[];

  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: ['remove'],
  })
  answers: Answer[];
}
