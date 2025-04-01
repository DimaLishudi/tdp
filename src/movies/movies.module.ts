import { Module } from '@nestjs/common';
import { MovieController } from './movies.controller';
import { MovieService } from './movies.service';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [MovieService],
})

export class MovieModule {}
