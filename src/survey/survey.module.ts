import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entity/survey.entity';
import { SurveyService } from './survey.service';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  providers: [SurveyService],
  controllers: [],
})
export class SurveyModule {}
