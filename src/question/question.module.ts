import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question.entity';
import { QuestionRepository } from './question.repository';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { OptionModule } from 'src/option/option.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), OptionModule],
  providers: [QuestionResolver, QuestionService, QuestionRepository],
  exports: [QuestionService, QuestionRepository],
})
export class QuestionModule {}
