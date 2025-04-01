import { Module } from '@nestjs/common';
import { ShowtimeController } from './showtimes.controller';
import { ShowtimeService } from './showtimes.service';

@Module({
  imports: [],
  controllers: [ShowtimeController],
  providers: [ShowtimeService],
})

export class ShowtimeModule {}
