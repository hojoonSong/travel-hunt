import { Answer } from 'src/answer/entity/answer.entity';
import { Survey } from 'src/survey/entity/survey.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Survey, (survey) => survey.responses)
  survey: Survey;

  @Column()
  userId: number;

  @CreateDateColumn({ type: 'timestamp' })
  completionDate: Date;

  @OneToMany(() => Answer, (answer) => answer.response)
  answers: Answer[];
}
