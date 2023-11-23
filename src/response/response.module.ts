import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from './response.service';
import { ResponseResolver } from './response.resolver';
import { ResponseRepository } from './response.repository';
import { Response } from './entity/response.entity';
import { AnswerModule } from 'src/answer/answer.module';
import { OptionModule } from 'src/option/option.module';

@Module({
  imports: [TypeOrmModule.forFeature([Response]), AnswerModule, OptionModule],
  providers: [ResponseService, ResponseResolver, ResponseRepository],
  exports: [ResponseRepository],
})
export class ResponseModule {}
