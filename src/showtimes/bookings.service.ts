import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { IBookingId } from './interfaces/bookings.interfaces';
import { AddBookingDTO } from './dto/bookings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from './entities/bookings.entity';


@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private repository: Repository<BookingEntity>,
  ) {}

  async add(booking: AddBookingDTO): Promise<IBookingId> {
    try {
      const res = await this.repository.insert(booking);
      return { bookingId : res.generatedMaps[0].id };
    } catch (error) {
      throw new BadRequestException("Non-unique booking");
    }
  }
}
