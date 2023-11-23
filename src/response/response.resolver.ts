import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ResponseService } from './response.service';
import { ResponseType } from './types/response.type';
import { CreateResponseInput } from './types/create-response.type';
import { UpdateResponseInput } from './types/update-response.type';
import { Response } from './entity/response.entity';

@Resolver(() => Response)
export class ResponseResolver {
  constructor(private readonly responseService: ResponseService) {}

  @Mutation(() => ResponseType)
  async createResponse(
    @Args('createResponseInput') createResponseInput: CreateResponseInput,
  ): Promise<Response> {
    return this.responseService.createResponse(createResponseInput);
  }

  @Mutation(() => ResponseType)
  async updateResponse(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateResponseInput') updateResponseInput: UpdateResponseInput,
  ): Promise<Response> {
    return this.responseService.updateResponse(id, updateResponseInput);
  }

  @Query(() => ResponseType, { nullable: true })
  async response(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Response | undefined> {
    return this.responseService.getResponse(id);
  }

  @Mutation(() => Boolean)
  async deleteResponse(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.responseService.deleteResponse(id);
    return true;
  }
}
