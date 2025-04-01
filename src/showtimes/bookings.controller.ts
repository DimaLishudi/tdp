import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { AddBookingDTO } from './dto/bookings.dto';
import { IBooking } from './interfaces/bookings.interfaces';


@Controller("showtimes")
export class ShowtimeController {
  constructor(private readonly service: BookingService) {}
  
  @Post()
  addShowtime(@Body() showtime: AddBookingDTO): IBooking {
    return this.service.add(showtime);
  }
}
