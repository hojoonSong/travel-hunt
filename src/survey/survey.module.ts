import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entity/survey.entity';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { SurveyRepository } from './survey.repositroy';
import { QuestionModule } from 'src/question/question.module';
import { ResponseModule } from 'src/response/response.module';

@Module({
  imports: [TypeOrmModule.forFeature([Survey]), QuestionModule, ResponseModule],
  providers: [SurveyService, SurveyResolver, SurveyRepository],
})
export class SurveyModule {}
