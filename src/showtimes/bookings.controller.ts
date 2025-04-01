import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { AddBookingDTO } from './dto/bookings.dto';


@Controller("showtimes")
export class ShowtimeController {
  constructor(private readonly service: BookingService) {}
  
  @Post()
  addShowtime(@Body() booking: AddBookingDTO) {
    return this.service.add(booking);
  }
}
