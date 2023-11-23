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

  @ManyToOne(() => Survey, (survey) => survey.responses)
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @Column()
  surveyId: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: 0 })
  totalScore: number;

  @CreateDateColumn({ type: 'timestamp' })
  completionDate: Date;

  @OneToMany(() => Answer, (answer) => answer.response, {
    cascade: ['remove'],
  })
  answers: Answer[];
}
