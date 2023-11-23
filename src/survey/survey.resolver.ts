import { SurveyService } from './survey.service';
import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Survey } from './entity/survey.entity';
import { CreateSurveyInput } from './types/create-survey.input';
import { UpdateSurveyInput } from './types/update.survey.input';
import { SurveyType } from './types/survey.type';

@Resolver('Survey')
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Mutation(() => SurveyType)
  async createSurvey(
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ): Promise<Survey> {
    try {
      return this.surveyService.createSurvey(createSurveyInput);
    } catch (error) {
      throw new Error(`Failed to create survey: ${error.message}`);
    }
  }

  @Mutation(() => SurveyType)
  async updateSurvey(
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ): Promise<Survey> {
    try {
      return this.surveyService.updateSurvey(updateSurveyInput);
    } catch (error) {
      throw new Error(`Failed to update survey: ${error.message}`);
    }
  }

  @Query(() => SurveyType, { nullable: true })
  async survey(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Survey | undefined> {
    try {
      return this.surveyService.getSurvey(id);
    } catch (error) {
      throw new Error(`Failed to fetch survey: ${error.message}`);
    }
  }

  @Mutation(() => Boolean)
  async deleteSurvey(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    try {
      await this.surveyService.deleteSurvey(id);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete survey: ${error.message}`);
    }
  }
}
