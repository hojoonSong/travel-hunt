import { Question } from 'src/question/entity/question.entity';
import { Response } from 'src/response/entity/response.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Response, (response) => response.answers)
  response: Response;

  @ManyToOne(() => Question)
  question: Question;

  @Column()
  selectedOptionId: number;
}
