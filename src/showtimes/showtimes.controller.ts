import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ShowtimeService } from './showtimes.service';
import { AddShowtimeDTO, UpdateShowtimeDTO } from './dto/showtimes.dto';
// import { Showtime } from './interfaces/showtimes.interfaces';


@Controller("showtimes")
export class ShowtimeController {
  constructor(private readonly service: ShowtimeService) {}

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    return this.service.getById(id);
  }

  @Post()
  addShowtime(@Body() showtime: AddShowtimeDTO) {
    return this.service.create(showtime);
  }
  
  @Post("update/:id")
  updateShowtime(@Param("id", ParseIntPipe) id: number,
                 @Body() showtime: UpdateShowtimeDTO): void {
    this.service.update(id, showtime);
  }

  @Delete(":id")
  deleteShowtime(@Param("id", ParseIntPipe) id: number): void {
    this.service.delete(id);
  }
}
