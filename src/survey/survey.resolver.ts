import { SurveyService } from './survey.service';
import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Survey } from './entity/survey.entity';
import { CreateSurveyInput } from './types/create-survey.input';
import { UpdateSurveyInput } from './types/update.survey.input';
import { SurveyType } from './types/survey.type';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Mutation((returns) => SurveyType)
  async createSurvey(
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ): Promise<Survey> {
    return this.surveyService.createSurvey(createSurveyInput);
  }

  @Mutation((returns) => SurveyType)
  async updateSurvey(
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ): Promise<Survey> {
    return this.surveyService.updateSurvey(updateSurveyInput);
  }

  @Query((returns) => SurveyType, { nullable: true })
  async survey(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Survey | undefined> {
    return this.surveyService.getSurvey(id);
  }

  @Mutation((returns) => Boolean)
  async deleteSurvey(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.surveyService.deleteSurvey(id);
    return true;
  }
}
