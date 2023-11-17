import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/env.validation';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { ExceptionModule } from './common/filter/exception-filter.module';

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
            utilities.format.nestLike('project-name', { prettyPrint: true }),
          ),
        }),
      ],
    }),
    ExceptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
