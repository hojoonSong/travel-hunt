import { Args, ID, Mutation, Resolver, Query } from '@nestjs/graphql';
import { OptionType } from './types/option.type';
import { OptionService } from './option.service';
import { CreateOptionInput } from './types/create-option.input';
import { UpdateOptionInput } from './types/update-option.input';
import { Option } from './entity/option.entity';

@Resolver(() => OptionType)
export class OptionResolver {
  constructor(private readonly optionService: OptionService) {}

  @Mutation(() => OptionType)
  async createOption(
    @Args('questionId', { type: () => ID }) questionId: number,
    @Args('createOptionInput') createOptionInput: CreateOptionInput,
  ) {
    try {
      return this.optionService.createOption(createOptionInput, questionId);
    } catch (error) {
      throw new Error(`Failed to create option: ${error.message}`);
    }
  }

  @Mutation(() => OptionType)
  async updateOption(
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput,
  ): Promise<Option> {
    const { id, ...updateData } = updateOptionInput;
    try {
      return this.optionService.updateOption(id, updateData);
    } catch (error) {
      throw new Error(`Failed to update option: ${error.message}`);
    }
  }

  @Mutation(() => Boolean)
  async deleteOption(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    try {
      await this.optionService.deleteOption(id);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete option: ${error.message}`);
    }
  }

  @Query(() => OptionType, { nullable: true })
  async option(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Option | undefined> {
    try {
      return this.optionService.getOption(id);
    } catch (error) {
      throw new Error(`Failed to fetch option: ${error.message}`);
    }
  }
}
