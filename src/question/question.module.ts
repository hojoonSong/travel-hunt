import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question.entity';
import { QuestionRepository } from './question.repository';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionResolver, QuestionService, QuestionRepository],
})
export class QuestionModule {}
