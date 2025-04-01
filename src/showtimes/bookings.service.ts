import { Injectable } from '@nestjs/common';
import { Booking, BookingId } from './interfaces/bookings.interfaces';


@Injectable()
export class BookingService {
  add(booking: Booking): BookingId {
    return { "bookingId" : "" }
  }
}
