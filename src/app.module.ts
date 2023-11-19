import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/env.validation';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { ExceptionModule } from './common/filter/exception-filter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { OptionModule } from './option/option.module';
import { Option } from './option/entity/option.entity';
import { Answer } from './answer/entity/answer.entity';
import { Question } from './question/entity/question.entity';
import { Response } from './response/entity/response.entity';
import { Survey } from './survey/entity/survey.entity';
import { QuestionModule } from './question/question.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            utilities.format.nestLike('travel-hunt', { prettyPrint: true }),
          ),
        }),
      ],
    }),
    ExceptionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.NODE_ENV !== 'production',
      entities: [Option, Answer, Question, Response, Survey],
      logging: process.env.NODE_ENV !== 'production',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    OptionModule,
    QuestionModule,
    SurveyModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
