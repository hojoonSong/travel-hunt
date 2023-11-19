import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ResponseService } from './response.service';
import { ResponseType } from './types/response.type';
import { CreateResponseInput } from './types/create-response.type';
import { UpdateResponseInput } from './types/update-response.type';
import { Response } from './entity/response.entity';

@Resolver((of) => Response)
export class ResponseResolver {
  constructor(private readonly responseService: ResponseService) {}

  @Mutation((returns) => ResponseType)
  async createResolver(
    @Args('createResponseInput') createResponseInput: CreateResponseInput,
  ): Promise<Response> {
    return this.responseService.createResponse(createResponseInput);
  }

  @Mutation((returns) => ResponseType)
  async updateResponse(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateResponseInput') updateResponseInput: UpdateResponseInput,
  ): Promise<Response> {
    return this.responseService.updateResponse(id, updateResponseInput);
  }

  @Query((returns) => ResponseType, { nullable: true })
  async response(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Response | undefined> {
    return this.responseService.getResponse(id);
  }

  @Mutation((returns) => Boolean)
  async deleteResponse(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.responseService.deleteResponse(id);
    return true;
  }
}
