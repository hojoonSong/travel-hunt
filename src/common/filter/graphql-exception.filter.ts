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

    let status = 'INTERNAL_SERVER_ERROR';
    let message = '내부 서버 오류가 발생했습니다.';

    if (exception instanceof ApolloError) {
      status = exception.extensions.code;
      message = exception.message;
    } else if (exception.message) {
      message = exception.message;
      if (
        exception.name === 'QueryFailedError' &&
        message.includes('duplicate key value')
      ) {
        status = 'CONFLICT';
      }
    }

    this.logger.error('Unhandled GraphQL exception', exception.stack);

    // GraphQL 오류 응답 포맷에 맞게 수정
    const errorResponse = {
      message,
      extensions: {
        code: status,
        exception: {
          stacktrace: exception.stack.split('\n'),
        },
      },
    };

    // GraphQL 응답을 구성하고 오류를 반환
    response.status(200).json({ errors: [errorResponse] });
  }
}
