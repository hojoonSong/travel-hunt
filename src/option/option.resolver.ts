import { Args, ID, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
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
    @Args('createOptionInput') createOptionInput: CreateOptionInput,
  ) {
    return this.optionService.createOption(createOptionInput);
  }

  @Mutation(() => OptionType)
  async updateOption(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput,
  ): Promise<Option> {
    return this.optionService.updateOption(id, updateOptionInput);
  }

  @Mutation(() => Boolean)
  async removeOption(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    await this.optionService.deleteOption(id);
    return true;
  }

  @Query(() => OptionType, { nullable: true })
  async option(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Option | undefined> {
    return this.optionService.getOption(id);
  }
}
