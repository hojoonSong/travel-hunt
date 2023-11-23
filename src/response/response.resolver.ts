import { Response } from 'src/response/entity/response.entity';
import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ResponseService } from './response.service';
import { ResponseType } from './types/response.type';
import { CreateResponseInput } from './types/create-response.type';

@Resolver(() => Response)
export class ResponseResolver {
  constructor(private readonly responseService: ResponseService) {}

  @Mutation(() => ResponseType)
  async createResponse(
    @Args('createResponseInput') createResponseInput: CreateResponseInput,
  ): Promise<Response> {
    return this.responseService.createResponse(createResponseInput);
  }

  @Query(() => ResponseType, { nullable: true })
  async Response(
    @Args('id', { type: () => Int }) responseId: number,
  ): Promise<ResponseType | undefined> {
    return this.responseService.findResponseWithTotalScore(responseId);
  }

  @Mutation(() => Boolean)
  async deleteResponse(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.responseService.deleteResponse(id);
    return true;
  }
}
