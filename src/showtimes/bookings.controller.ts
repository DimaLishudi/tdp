import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { AddBookingDTO } from './dto/bookings.dto';


@Controller("bookings")
export class BookingController {
  constructor(private readonly service: BookingService) {}
  
  @Post()
  addBooking(@Body() booking: AddBookingDTO) {
    return this.service.add(booking);
  }
}
