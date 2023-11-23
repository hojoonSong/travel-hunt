import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphqlExceptionFilter } from './graphql-exception.filter';

@Module({
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: GraphqlExceptionFilter,
    },
  ],
})
export class ExceptionModule {}
