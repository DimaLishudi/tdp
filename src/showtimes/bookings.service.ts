import { Injectable } from '@nestjs/common';
import { IBookingId } from './interfaces/bookings.interfaces';
import { AddBookingDTO } from './dto/bookings.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';


@Injectable()
export class BookingService {
  constructor(
    @InjectDataSource()
    private datasource: DataSource,
  ) {}

  add(booking: AddBookingDTO): IBookingId {
    return { bookingId : "" }
  }
}
