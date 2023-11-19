import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entity/question.entity';
import { OptionResolver } from 'src/option/option.resolver';
import { OptionService } from 'src/option/option.service';
import { QuestionRepository } from './question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [OptionResolver, OptionService, QuestionRepository],
})
export class QuestionModule {}
