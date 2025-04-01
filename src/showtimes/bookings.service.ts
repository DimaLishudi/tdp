import { Injectable } from '@nestjs/common';
import { IBooking, IBookingId } from './interfaces/bookings.interfaces';
import { AddBookingDTO } from './dto/bookings.dto';


@Injectable()
export class BookingService {
  add(booking: AddBookingDTO): IBookingId {
    return { "bookingId" : "" }
  }
}
