import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from './response.service';
import { ResponseResolver } from './response.resolver';
import { ResponseRepository } from './response.repository';
import { Response } from './entity/response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  providers: [ResponseService, ResponseResolver, ResponseRepository],
})
export class ResponseModule {}
