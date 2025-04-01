import { Module } from '@nestjs/common';
import { ShowtimeController } from './showtimes.controller';
import { ShowtimeService } from './showtimes.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShowtimeEntity } from './entities/showtimes.entity';
import { BookingEntity } from './entities/bookings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShowtimeEntity, BookingEntity])],
  controllers: [ShowtimeController],
  providers: [ShowtimeService],
})

export class ShowtimeModule {}
