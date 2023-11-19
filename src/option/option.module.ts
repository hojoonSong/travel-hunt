import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionService } from './option.service';
import { OptionResolver } from './option.resolver';
import { OptionRepository } from './option.repository';
import { Option } from './entity/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  providers: [OptionResolver, OptionService, OptionRepository],
})
export class OptionModule {}
