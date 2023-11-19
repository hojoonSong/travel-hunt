import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entity/survey.entity';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { SurveyRepository } from './survey.repositroy';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  providers: [SurveyService, SurveyResolver, SurveyRepository],
})
export class SurveyModule {}
