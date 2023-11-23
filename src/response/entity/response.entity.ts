import { Answer } from 'src/answer/entity/answer.entity';
import { Survey } from 'src/survey/entity/survey.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @Column()
  surveyId: number;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  completionDate: Date;

  @OneToMany(() => Answer, (answer) => answer.responseId, {
    cascade: ['remove'],
  })
  answers: Answer[];

  @Column({ default: 0 })
  totalScore: number;
}
