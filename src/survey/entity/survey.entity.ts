import { Question } from 'src/question/entity/question.entity';
import { Response } from 'src/response/entity/response.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  creationDate: Date;

  @OneToMany(() => Question, (question) => question.survey)
  questions: Question[];

  @OneToMany(() => Response, (response) => response.survey)
  responses: Response[];
}
