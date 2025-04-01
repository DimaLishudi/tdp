import { Module } from '@nestjs/common';
import { MovieController } from './movies.controller';
import { MovieService } from './movies.service';
import { MovieEntity } from './movies.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [MovieService],
})

export class MovieModule {}
