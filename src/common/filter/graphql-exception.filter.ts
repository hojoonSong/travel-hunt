import { Catch, Logger } from '@nestjs/common';
import {
  GqlExceptionFilter,
  GqlContextType,
  GqlArgumentsHost,
} from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: Error, host: GqlArgumentsHost): void {
    if (host.getType<GqlContextType>() !== 'graphql') {
      return;
    }

    const gqlCtx = host.getArgByIndex(2);
    const response = gqlCtx.res;
    const request = gqlCtx.req;

    let errorResponse;
    if (exception instanceof ApolloError) {
      errorResponse = { ...exception, message: exception.message };
    } else {
      errorResponse = {
        status: 'INTERNAL_SERVER_ERROR',
        message: 'Internal Server Error',
      };
      this.logger.error('Unhandled GraphQL exception', exception.stack);
    }

    const formattedResponse = {
      code: errorResponse.status,
      message: errorResponse.message,
      success: false,
      data: null,
    };

    const log = { url: request.url, formattedResponse, stack: exception.stack };
    this.logger.error(log);

    response.status(500).json(formattedResponse);
  }
}
