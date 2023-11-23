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
    return this.optionService.createOption(createOptionInput, questionId);
  }

  @Mutation(() => OptionType)
  async updateOption(
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput,
  ): Promise<Option> {
    const { id, ...updateData } = updateOptionInput;
    return this.optionService.updateOption(id, updateData);
  }

  @Mutation(() => Boolean)
  async deleteOption(
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
